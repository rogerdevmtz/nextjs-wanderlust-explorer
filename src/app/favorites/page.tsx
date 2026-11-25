import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FavoritesBadge, SavedExperiences } from "@/components/SavedExperiences";

export const metadata: Metadata = { title: "Favoritos" };

export default function FavoritesPage() {
  return (
    <div className="catalog-page">
      <PageHero eyebrow="Tu colección" title={<>Mis <em>favoritos</em></>}
        description="Las experiencias que guardes durante esta visita aparecen aquí."
        image="/images/hvar-vela.webp" imagePosition="center 55%">
        <FavoritesBadge />
      </PageHero>
      <div className="container catalog-body">
        <SavedExperiences />
      </div>
    </div>
  );
}
