"use client";

import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { FavoriteButton } from "@/components/ExperienceCard";
import { useFavorites } from "@/components/FavoritesProvider";
import { experiences } from "@/data/experiences";

export function SavedExperiences() {
  const { ids } = useFavorites();
  const saved = experiences.filter(({ id }) => ids.has(id));
  return saved.length ? (
    <section aria-labelledby="saved-title">
      <div className="section-heading saved-heading">
        <h2 id="saved-title">{saved.length} {saved.length === 1 ? "experiencia guardada" : "experiencias guardadas"}</h2>
        <Link href="/experiences" className="text-button">Seguir explorando <ArrowRight aria-hidden="true" size={17} /></Link>
      </div>
      <ExperienceGrid experiences={saved} />
    </section>
  ) : (
    <EmptyState icon={<Heart aria-hidden="true" />} title="Aún no tienes favoritos"
      description="Pulsa el corazón de una experiencia para guardarla aquí.">
      <Link href="/experiences" className="button">Explorar experiencias <ArrowRight aria-hidden="true" size={18} /></Link>
    </EmptyState>
  );
}

export function SaveExperience({ id, title }: { id: string; title: string }) {
  const { ids, toggle } = useFavorites();
  return <FavoriteButton title={title} saved={ids.has(id)} onToggle={() => toggle(id)} detailed />;
}

export function FavoritesCount() {
  const { ids } = useFavorites();
  return <strong className="profile-count">{ids.size}</strong>;
}

export function FavoritesPreview() {
  const { ids } = useFavorites();
  const saved = experiences.filter(({ id }) => ids.has(id)).slice(0, 3);
  if (!saved.length) return null;

  return (
    <section className="profile-collection" aria-labelledby="profile-collection-title">
      <h2 id="profile-collection-title">En tu <em>bitácora</em></h2>
      <ExperienceGrid experiences={saved} />
    </section>
  );
}
