import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="container inner-page">
      <h1 className="sr-only">Página no encontrada</h1>
      <EmptyState icon={<Compass aria-hidden="true" />} title="Esta página no está disponible"
        description="Puedes encontrar todas las experiencias activas en el explorador.">
        <Link href="/experiences" className="button">Ir al explorador <ArrowRight aria-hidden="true" size={18} /></Link>
      </EmptyState>
    </div>
  );
}
