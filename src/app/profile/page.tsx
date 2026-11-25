import { ArrowRight, Heart, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FavoritesCount, FavoritesPreview } from "@/components/SavedExperiences";

export const metadata: Metadata = { title: "Perfil" };

export default function ProfilePage() {
  return (
    <div className="container inner-page">
      <header className="page-heading">
        <h1>Mi perfil <em>y bitácora</em></h1>
        <p>Perfil de demostración</p>
      </header>
      <div className="profile-grid">
        <section className="profile-panel profile-person" aria-label="Datos del perfil">
          <span className="profile-avatar" aria-hidden="true">AM</span>
          <div><h2>Alex Moreno</h2><p><MapPin aria-hidden="true" size={16} /> Madrid, España</p></div>
        </section>
        <section className="profile-panel profile-summary">
          <span className="empty-icon"><Heart aria-hidden="true" size={20} /></span>
          <h2>Favoritos guardados</h2>
          <FavoritesCount />
          <Link href="/favorites" className="text-button">Ver favoritos <ArrowRight aria-hidden="true" size={17} /></Link>
        </section>
      </div>
      <FavoritesPreview />
    </div>
  );
}
