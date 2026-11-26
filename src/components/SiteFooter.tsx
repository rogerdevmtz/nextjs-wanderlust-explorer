import { ArrowUp, ArrowUpRight, Search } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { SiteBrand } from "@/components/SiteBrand";
import { experiences } from "@/data/experiences";
import { categoryLabels, countryLabel } from "@/lib/catalog";
import { countries } from "@/lib/catalog-options";
import { categories } from "@/types/experience";

const pages = [
  { href: "/", label: "Inicio" },
  { href: "/experiences", label: "Explorar" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/profile", label: "Perfil" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <nav className="footer-links" aria-label="Pie de página">
            <div className="footer-col">
              <h2>Navegar</h2>
              {pages.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
            </div>
            <div className="footer-col">
              <h2>Categorías</h2>
              {categories.map((category) => (
                <Link key={category} href={`/experiences?category=${category.toLowerCase()}`}>{categoryLabels[category]}</Link>
              ))}
            </div>
            <div className="footer-col">
              <h2>Destinos</h2>
              {countries.slice(0, 5).map((country) => (
                <Link key={country} href={`/experiences?destination=${encodeURIComponent(country)}`}>{countryLabel(country)}</Link>
              ))}
            </div>
          </nav>
          <div className="footer-search">
            <h2>Encuentra tu experiencia</h2>
            <p>Busca entre {experiences.length} experiencias en {countries.length} países.</p>
            <Form action="/experiences" className="footer-search-form" role="search">
              <Search aria-hidden="true" size={18} />
              <input type="search" name="search" placeholder="Vela, templos, cocina…" aria-label="Buscar experiencias por título" />
              <button type="submit">Buscar <ArrowUpRight aria-hidden="true" size={16} /></button>
            </Form>
            <SiteBrand />
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Wanderlust Explorer</p>
          <a href="#main-content" className="footer-top-link">Volver arriba <ArrowUp aria-hidden="true" size={16} /></a>
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">Wanderlust</p>
    </footer>
  );
}
