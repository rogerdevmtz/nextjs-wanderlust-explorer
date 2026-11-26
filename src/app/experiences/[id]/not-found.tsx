import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function ExperienceNotFound() {
  return (
    <div className="catalog-page not-found-page">
      <PageHero eyebrow="Error 404" title={<>Esta experiencia <em>no existe</em></>}
        description="Puede que el enlace esté incompleto o que la experiencia ya no forme parte del catálogo."
        image="/images/patagonia.webp" imagePosition="center 45%">
        <Link href="/experiences" className="button button-light">Ver todas las experiencias <ArrowRight aria-hidden="true" size={18} /></Link>
      </PageHero>
    </div>
  );
}
