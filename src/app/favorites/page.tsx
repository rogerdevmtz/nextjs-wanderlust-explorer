import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { SavedExperiences } from "@/components/SavedExperiences";

export const metadata: Metadata = { title: "Favoritos" };

export default function FavoritesPage() {
  return (
    <div className="container inner-page">
      <header className="page-heading collection-heading">
        <div>
          <h1>Mis <em>favoritos</em></h1>
          <p>Las experiencias que guardes durante esta visita aparecen aquí.</p>
        </div>
        <span className="collection-symbol"><Heart aria-hidden="true" size={39} strokeWidth={1.2} /></span>
      </header>
      <SavedExperiences />
    </div>
  );
}
