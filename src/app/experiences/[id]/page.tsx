import { ArrowLeft, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveExperience } from "@/components/SavedExperiences";
import { experiences } from "@/data/experiences";
import { categoryLabels, destinationLabel, priceLabel } from "@/lib/catalog";

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

  return (
    <div className="container inner-page">
      <Link href="/experiences" className="text-button back-link"><ArrowLeft aria-hidden="true" size={17} /> Volver al explorador</Link>
      <article className="detail-layout">
        <figure className="detail-figure">
          <div className="detail-image">
            <Image src={imageUrl} alt="" fill sizes="(max-width: 850px) 92vw, 48vw" preload />
          </div>
          <figcaption>Imagen ilustrativa de {destinationLabel(destination)}</figcaption>
        </figure>
        <div className="detail-content">
          <span className="detail-category">{categoryLabels[category]}</span>
          <h1>{title}</h1>
          <p className="detail-location"><MapPin aria-hidden="true" size={17} /> {destinationLabel(destination)}</p>
          <p className="detail-description">{description}</p>
          <dl className="detail-facts">
            <div><dt>Precio por persona</dt><dd>{priceLabel(price)}</dd></div>
            <div><dt>Valoración</dt><dd><Star aria-hidden="true" size={20} /> {rating.toFixed(1).replace(".", ",")} <small>/ 5</small></dd></div>
          </dl>
          <SaveExperience id={id} title={title} />
        </div>
      </article>
    </div>
  );
}
