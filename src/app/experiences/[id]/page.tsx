import { ArrowRight, BadgeCheck, Globe, Heart, MapPin, Star, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { ExperienceGallery, type ExperiencePhoto } from "@/components/ExperienceGallery";
import { ExplorerReturnLink, FilteredExplorerReturnLink } from "@/components/ExplorerReturnLink";
import { SaveExperience } from "@/components/SavedExperiences";
import { experiences } from "@/data/experiences";
import { categoryLabels, destinationLabel, priceLabel } from "@/lib/catalog";
import type { Experience } from "@/types/experience";

type Props = { params: Promise<{ id: string }> };

const findExperience = (id: string) => experiences.find((experience) => experience.id === id);

export function generateStaticParams() {
  return experiences.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const experience = findExperience((await params).id);
  return experience ? { title: experience.title, description: experience.description } : {};
}

export default async function ExperiencePage({ params }: Props) {
  const experience = findExperience((await params).id);
  if (!experience) notFound();
  const { id, title, imageUrl, description, destination, category, price, rating } = experience;
  const place = destinationLabel(destination);
  const [city, country] = place.split(", ");
  const words = title.split(" ");
  const accent = words.pop();
  const ratingLabel = rating.toFixed(1).replace(".", ",");
  const photos: [ExperiencePhoto, ...ExperiencePhoto[]] = [
    { src: imageUrl, caption: `Imagen ilustrativa de ${place}` },
  ];
  if (id === "vela-al-atardecer-por-el-adriatico") {
    photos.push(
      { src: "/images/hvar.webp", caption: "Un velero junto al litoral de Hvar" },
      { src: "/images/costa-dalmata-al-amanecer.webp", caption: "La costa dálmata al amanecer" },
    );
  }
  const related: Experience[] = [];
  const shownDestinations = new Set([destination]);
  for (const item of experiences) {
    if (item.category !== category || shownDestinations.has(item.destination)) continue;
    related.push(item);
    shownDestinations.add(item.destination);
    if (related.length === 3) break;
  }

  return (
    <div className="container inner-page">
      <Suspense fallback={<ExplorerReturnLink />}>
        <FilteredExplorerReturnLink />
      </Suspense>
      <article className="detail-layout">
        <header className="detail-heading">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/experiences">Explorar</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/experiences?category=${category.toLowerCase()}`}>{categoryLabels[category]}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <div className="detail-topline">
            <span className="detail-category">{categoryLabels[category]}</span>
            <p className="detail-location"><MapPin aria-hidden="true" size={16} /> {place}</p>
            <span className="detail-rating"><Star aria-hidden="true" size={15} /> <strong>{ratingLabel}</strong> / 5</span>
          </div>
          <h1>{words.join(" ")} <em>{accent}</em></h1>
        </header>
        <ExperienceGallery key={id} photos={photos} />
        <dl className="key-facts">
          <div><span className="stat-icon"><Tag aria-hidden="true" size={19} /></span><dt>Categoría</dt><dd>{categoryLabels[category]}</dd></div>
          <div><span className="stat-icon"><MapPin aria-hidden="true" size={19} /></span><dt>Ciudad</dt><dd>{city}</dd></div>
          <div><span className="stat-icon"><Star aria-hidden="true" size={19} /></span><dt>Valoración</dt><dd>{ratingLabel} / 5</dd></div>
          <div><span className="stat-icon"><Globe aria-hidden="true" size={19} /></span><dt>País</dt><dd>{country}</dd></div>
        </dl>
        <div className="detail-body">
          <div className="detail-main">

            <section className="detail-story" aria-labelledby="about-experience">
              <p className="eyebrow">01 / Descripción</p>
              <h2 id="about-experience">Sobre la <em>experiencia</em></h2>
              <p className="detail-description">{description}</p>
            </section>
          </div>
          <aside className="detail-content" aria-label="Precio, valoración y favoritos">
            <div className="detail-price">
              <div>
                <span className="eyebrow">Precio por persona</span>
                <p><strong>{priceLabel(price)}</strong> <small>/ persona</small></p>
              </div>
              <div className="detail-price-rating">
                <span className="eyebrow">Valoración</span>
                <p><Star aria-hidden="true" size={18} /> <strong>{ratingLabel}</strong> <small>/ 5</small></p>
              </div>
            </div>
            <SaveExperience id={id} title={title} />
            <ul className="detail-assurances">
              <li><Heart aria-hidden="true" size={16} /> Se guarda en tus favoritos durante la visita</li>
              <li><BadgeCheck aria-hidden="true" size={16} /> Datos y precios de demostración</li>
            </ul>
          </aside>
        </div>
      </article>
      {related.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explora más</p>
              <h2 id="related-title">También te puede <em>interesar</em></h2>
            </div>
            <Link href={`/experiences?category=${category.toLowerCase()}`} className="text-button">
              Ver más de {categoryLabels[category].toLowerCase()} <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <ExperienceGrid experiences={related} />
        </section>
      )}
    </div>
  );
}
