"use client";

import { Compass, Heart, House, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/FavoritesProvider";
import { SiteBrand } from "@/components/SiteBrand";

const links = [
  { href: "/", label: "Inicio", Icon: House },
  { href: "/experiences", label: "Explorar", Icon: Compass },
  { href: "/favorites", label: "Favoritos", Icon: Heart },
  { href: "/profile", label: "Perfil", Icon: UserRound },
];

export function Navbar() {
  const pathname = usePathname();
  const { ids } = useFavorites();

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <>
    <header className="site-header">
      <div className="container nav-inner">
        <SiteBrand />
        <nav className="site-nav" aria-label="Navegación principal">
          {links.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href} className={active ? "nav-active" : undefined} aria-current={pathname === href ? "page" : active ? "location" : undefined}>
                <Icon className="nav-icon" aria-hidden="true" size={18} />
                <span className="nav-label">{label}</span>
                {href === "/favorites" && ids.size > 0 && (
                  <span className="nav-count" aria-hidden="true">{ids.size}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <span className="nav-progress" aria-hidden="true" />
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
    <nav className="tab-bar" aria-label="Navegación principal en móvil">
      {links.map(({ href, label, Icon }) => {
        const active = isActive(href);
        return (
          <Link key={href} href={href} className={active ? "tab-active" : undefined} aria-current={pathname === href ? "page" : active ? "location" : undefined}>
            <span className="tab-icon">
              <Icon aria-hidden="true" size={20} />
              {href === "/favorites" && ids.size > 0 && <span className="tab-count" aria-label={`${ids.size} guardadas`}>{ids.size}</span>}
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
