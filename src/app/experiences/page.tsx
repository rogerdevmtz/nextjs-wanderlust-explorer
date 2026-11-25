import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { Explorer } from "@/components/Explorer";

export const metadata: Metadata = { title: "Explorar experiencias" };

export default async function ExperiencesPage() {
  await connection();

  return (
    <div className="catalog-page">
      <header className="catalog-hero">
        <div className="catalog-image">
          <Image src="/images/iceland.webp" alt="" fill sizes="(max-width: 760px) 78vw, 50vw" preload />
        </div>
        <div className="container page-heading">
          <h1>Explorar <em>experiencias</em></h1>
          <p>Busca por título o combina una categoría con el destino que te interesa.</p>
        </div>
      </header>
      <div className="container catalog-body">
        <Explorer />
      </div>
    </div>
  );
}
