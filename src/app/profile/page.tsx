import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FavoritesPreview, ProfileStats } from "@/components/SavedExperiences";

export const metadata: Metadata = { title: "Perfil" };

export default function ProfilePage() {
  return (
    <div className="catalog-page">
      <PageHero eyebrow="Perfil de demostración" title={<>Mi perfil <em>y bitácora</em></>}
        description="Tu resumen de viaje con las experiencias que has guardado en esta visita."
        image="/images/patagonia.webp" imagePosition="center 45%" />
      <div className="container catalog-body">
        <div className="profile-grid">
          <section className="profile-person" aria-label="Datos del perfil">
            <span className="profile-avatar" aria-hidden="true">AM</span>
            <div>
              <p className="eyebrow">Explorador</p>
              <h2>Alex Moreno</h2>
              <p className="profile-place"><MapPin aria-hidden="true" size={16} /> Madrid, España</p>
            </div>
          </section>
          <ProfileStats />
        </div>
        <FavoritesPreview />
      </div>
    </div>
  );
}
