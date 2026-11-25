import type { Metadata } from "next";
import { SavedExperiences } from "@/components/SavedExperiences";

export const metadata: Metadata = { title: "Favoritos" };

export default function FavoritesPage() {
  return (
    <div className="container inner-page">
      <header className="page-heading">
        <h1>Mis favoritos</h1>
        <p>Vuelve a las experiencias que has guardado durante esta visita.</p>
      </header>
      <h2 className="sr-only">Experiencias guardadas</h2>
      <SavedExperiences />
    </div>
  );
}
