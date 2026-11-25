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
  return saved.length ? <ExperienceGrid experiences={saved} /> : (
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
