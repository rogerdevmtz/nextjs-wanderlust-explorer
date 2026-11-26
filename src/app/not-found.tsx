import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <div className="catalog-page not-found-page">
      <PageHero eyebrow="Error 404" title={<>Esta página <em>no está disponible</em></>}
        description="Puede que el enlace haya cambiado. Todas las experiencias siguen en el explorador."
        image="/images/patagonia.webp" imagePosition="center 45%">
        <Link href="/experiences" className="button button-light">Ir al explorador <ArrowRight aria-hidden="true" size={18} /></Link>
      </PageHero>
    </div>
  );
}
