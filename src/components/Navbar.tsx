"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/FavoritesProvider";
import { SiteBrand } from "@/components/SiteBrand";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/experiences", label: "Explorar" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/profile", label: "Perfil" },
];

export function Navbar() {
  const pathname = usePathname();
  const { ids } = useFavorites();

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <SiteBrand />
        <nav className="site-nav" aria-label="Navegación principal">
          {links.map(({ href, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return (
              <Link key={href} href={href} className={active ? "nav-active" : undefined} aria-current={pathname === href ? "page" : active ? "location" : undefined}>
                <span>{label}</span>
                {href === "/favorites" && ids.size > 0 && (
                  <span className="nav-count" aria-hidden="true">{ids.size}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="nav-tools">
          <Link href="/experiences#experience-search" className="nav-search" aria-label="Buscar experiencias">
            <Search aria-hidden="true" size={17} />
            <span>Buscar</span>
          </Link>
          <Link href="/profile" className="nav-profile" aria-label="Perfil de Alex Moreno">
            <span>Alex Moreno</span>
            <span className="nav-avatar" aria-hidden="true">AM</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
