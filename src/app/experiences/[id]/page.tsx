import { ArrowRight, MapPin, Star } from "lucide-react";
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
          <div className="detail-topline">
            <span className="detail-category">{categoryLabels[category]}</span>
            <p className="detail-location"><MapPin aria-hidden="true" size={16} /> {place}</p>
          </div>
          <h1>{title}</h1>
        </header>
        <ExperienceGallery key={id} photos={photos} />
        <div className="detail-body">
          <section className="detail-story" aria-labelledby="about-experience">
            <h2 id="about-experience">Sobre la <em>experiencia</em></h2>
            <p className="detail-description">{description}</p>
          </section>
          <aside className="detail-content" aria-label="Precio, valoración y favoritos">
            <dl className="detail-facts">
              <div><dt>Precio por persona</dt><dd>{priceLabel(price)}</dd></div>
              <div><dt>Valoración</dt><dd><Star aria-hidden="true" size={19} /> {rating.toFixed(1).replace(".", ",")} <small>/ 5</small></dd></div>
            </dl>
            <SaveExperience id={id} title={title} />
          </aside>
        </div>
      </article>
      {related.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <div className="section-heading">
            <h2 id="related-title">Más de <em>{categoryLabels[category].toLowerCase()}</em></h2>
            <Link href={`/experiences?category=${category.toLowerCase()}`} className="text-button">
              Explorar la categoría <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <ExperienceGrid experiences={related} />
        </section>
      )}
    </div>
  );
}
