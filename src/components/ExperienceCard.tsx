"use client";

import { memo } from "react";
import { ArrowUpRight, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categoryLabels, destinationLabel, priceLabel } from "@/lib/catalog";
import type { Experience } from "@/types/experience";

export function FavoriteButton({ title, saved, onToggle, detailed = false }: {
  title: string;
  saved: boolean;
  onToggle: () => void;
  detailed?: boolean;
}) {
  return (
    <button type="button" className={detailed ? "button favorite-detail" : "favorite-toggle"}
      aria-label={`Favorito: ${title}`} aria-pressed={saved} onClick={onToggle}>
      <Heart aria-hidden="true" size={19} />
      {detailed && <span>{saved ? "Guardado" : "Guardar experiencia"}</span>}
    </button>
  );
}

export const ExperienceCard = memo(function ExperienceCard({ experience, saved, toggle, detailQuery }: {
  experience: Experience;
  saved: boolean;
  toggle: (id: string) => void;
  detailQuery?: string;
}) {
  const { id, title, description, category, destination, price, rating, imageUrl } = experience;
  const href = `/experiences/${id}${detailQuery ? `?${detailQuery}` : ""}`;
  return (
    <article className="experience-card">
      <div className="card-photo">
        <Image src={imageUrl} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 410px" />
        <span className="category-label">{categoryLabels[category]}</span>
        <FavoriteButton title={title} saved={saved} onToggle={() => toggle(id)} />
      </div>
      <div className="card-content">
        <div className="card-topline">
          <p className="card-location"><MapPin aria-hidden="true" size={14} />{destinationLabel(destination)}</p>
          <span className="card-rating" aria-label={`Valoración: ${rating.toFixed(1).replace(".", ",")} de 5`}>
            <Star aria-hidden="true" size={15} />{rating.toFixed(1).replace(".", ",")}
          </span>
        </div>
        <h3><Link href={href} prefetch={false}>{title}</Link></h3>
        <p className="card-description">{description}</p>
        <div className="card-meta">
          <span className="card-price"><strong>{priceLabel(price)}</strong> <span>/ persona</span></span>
          <span className="card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
          <span className="card-cta" aria-hidden="true">Ver experiencia <ArrowUpRight size={16} /></span>
        </div>
      </div>
    </article>
  );
});
