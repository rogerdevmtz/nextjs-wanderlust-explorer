import type { Metadata } from "next";
import { connection } from "next/server";
import { Explorer } from "@/components/Explorer";
import { PageHero } from "@/components/PageHero";
import { experiences } from "@/data/experiences";
import { countries } from "@/lib/catalog-options";

export const metadata: Metadata = { title: "Explorar experiencias" };

export default async function ExperiencesPage() {
  await connection();

  return (
    <div className="catalog-page">
      <PageHero eyebrow={`Catálogo · ${experiences.length} experiencias en ${countries.length} países`}
        title={<>Explorar <em>experiencias</em></>}
        description="Busca por título o combina una categoría con el destino que te interesa."
        image="/images/iceland.webp" imagePosition="center 60%" />
      <div className="container catalog-body">
        <Explorer />
      </div>
    </div>
  );
}
