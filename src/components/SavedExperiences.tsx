"use client";

import { ArrowRight, Globe, Heart, Layers } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { FavoriteButton } from "@/components/ExperienceCard";
import { useFavorites } from "@/components/FavoritesProvider";
import { experiences } from "@/data/experiences";
import { priceLabel } from "@/lib/catalog";

function useSaved() {
  const { ids } = useFavorites();
  return experiences.filter(({ id }) => ids.has(id));
}

export function SavedExperiences() {
  const saved = useSaved();
  return saved.length ? (
    <section className="saved-section" aria-labelledby="saved-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Tu selección</p>
          <h2 id="saved-title">{saved.length} {saved.length === 1 ? <>experiencia <em>guardada</em></> : <>experiencias <em>guardadas</em></>}</h2>
        </div>
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

export function FavoritesBadge() {
  const { ids } = useFavorites();
  return (
    <div className="hero-stat" aria-live="polite">
      <Heart aria-hidden="true" size={20} />
      <span><strong>{ids.size}</strong> {ids.size === 1 ? "guardada" : "guardadas"}</span>
    </div>
  );
}

export function ProfileStats() {
  const saved = useSaved();
  const categories = new Set(saved.map(({ category }) => category)).size;
  const countries = new Set(saved.map(({ destination }) => destination.split(", ")[1])).size;
  const total = saved.reduce((sum, { price }) => sum + price, 0);
  const stats = [
    { icon: <Heart aria-hidden="true" size={19} />, label: "Favoritos guardados", value: saved.length },
    { icon: <Layers aria-hidden="true" size={19} />, label: "Categorías", value: categories },
    { icon: <Globe aria-hidden="true" size={19} />, label: "Países", value: countries },
  ];
  return (
    <section className="profile-stats" aria-label="Resumen de favoritos">
      <dl>
        {stats.map(({ icon, label, value }) => (
          <div key={label}>
            <span className="stat-icon">{icon}</span>
            <dt>{label}</dt>
            <dd className={label === "Favoritos guardados" ? "profile-count" : undefined}>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="profile-stats-footer">
        <span>{saved.length ? <>Presupuesto orientativo: <strong>{priceLabel(total)}</strong> por persona</> : "Guarda experiencias para ver tu resumen."}</span>
        <Link href="/favorites" className="text-button">Ver favoritos <ArrowRight aria-hidden="true" size={17} /></Link>
      </div>
    </section>
  );
}

export function FavoritesPreview() {
  const saved = useSaved().slice(0, 3);
  if (!saved.length) return null;

  return (
    <section className="profile-collection" aria-labelledby="profile-collection-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Últimas guardadas</p>
          <h2 id="profile-collection-title">En tu <em>bitácora</em></h2>
        </div>
      </div>
      <ExperienceGrid experiences={saved} />
    </section>
  );
}
