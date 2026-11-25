import type { Metadata } from "next";
import { connection } from "next/server";
import { Explorer } from "@/components/Explorer";

export const metadata: Metadata = { title: "Explorar experiencias" };

export default async function ExperiencesPage() {
  await connection();

  return (
    <div className="container inner-page">
      <header className="page-heading">
        <h1>Explorar experiencias</h1>
        <p>Busca por título o combina una categoría con el destino que te interesa.</p>
      </header>
      <Explorer />
    </div>
  );
}
