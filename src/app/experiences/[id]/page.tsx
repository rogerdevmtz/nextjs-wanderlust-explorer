import { ArrowRight, ArrowUpRight, BadgeCheck, Heart, MapPin, Star } from "lucide-react";
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
  const words = title.split(" ");
  const accent = words.pop();
  const ratingLabel = rating.toFixed(1).replace(".", ",");
  const photos: [ExperiencePhoto, ...ExperiencePhoto[]] = [
    { src: imageUrl, caption: `Imagen ilustrativa de ${place}`, alt: title },
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
  const city = destination.split(", ")[0];
  const sameCity = experiences.filter((item) => item.destination === destination && item.id !== id).slice(0, 5);

  return (
    <>
      <article className="detail-page">
        <ExperienceGallery key={id} photos={photos}>
          <Suspense fallback={<ExplorerReturnLink />}>
            <FilteredExplorerReturnLink />
          </Suspense>
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
          </div>
          <h1>{words.join(" ")} <em>{accent}</em></h1>
        </ExperienceGallery>

        <div className="container detail-body">
          <div className="detail-main">
            <p className="detail-lead">{description}</p>
            {sameCity.length > 0 && (
              <section className="detail-index" aria-labelledby="same-city-title">
                <div className="detail-index-heading">
                  <h2 id="same-city-title">Más en {city}</h2>
                  <Link href={`/experiences?destination=${encodeURIComponent(city)}`} className="text-button">
                    Ver todas <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </div>
                <ol>
                  {sameCity.map((item) => (
                    <li key={item.id}>
                      <Link href={`/experiences/${item.id}`}>
                        <span className="detail-index-category">{categoryLabels[item.category]}</span>
                        <span className="detail-index-title">{item.title}</span>
                        <span className="detail-index-price">{priceLabel(item.price)}</span>
                        <ArrowUpRight aria-hidden="true" size={18} />
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
          <aside className="detail-content" aria-label="Precio, valoración y favoritos">
            <div className="detail-price">
              <div>
                <span className="detail-label">Precio por persona</span>
                <p><strong>{priceLabel(price)}</strong></p>
              </div>
              <div className="detail-price-rating">
                <span className="detail-label">Valoración</span>
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
        <div className="detail-mobile-bar">
          <p><strong>{priceLabel(price)}</strong> <small>/ persona</small></p>
          <SaveExperience id={id} title={title} />
        </div>
      </article>
      {related.length > 0 && (
        <section className="container related-section" aria-labelledby="related-title">
          <div className="section-heading">
            <h2 id="related-title">Más de {categoryLabels[category].toLowerCase()} en otros destinos</h2>
            <Link href={`/experiences?category=${category.toLowerCase()}`} className="text-button">
              Ver todas <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <ExperienceGrid experiences={related} />
        </section>
      )}
    </>
  );
}
