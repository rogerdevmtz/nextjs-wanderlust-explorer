"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCatalogFilterQuery } from "@/lib/catalog";

export function ExplorerReturnLink({ href = "/experiences" }: { href?: string }) {
  return (
    <Link href={href} className="text-button back-link">
      <ArrowLeft aria-hidden="true" size={17} /> Volver al explorador
    </Link>
  );
}

export function FilteredExplorerReturnLink() {
  const query = getCatalogFilterQuery(useSearchParams());
  return <ExplorerReturnLink href={query ? `/experiences?${query}` : "/experiences"} />;
}
