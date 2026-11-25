"use client";

import { Compass, Heart, House, Map, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio", Icon: House },
  { href: "/experiences", label: "Explorar", Icon: Map },
  { href: "/favorites", label: "Favoritos", Icon: Heart },
  { href: "/profile", label: "Perfil", Icon: UserRound },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="wordmark" aria-label="Wanderlust Explorer, inicio">
          <span className="brand-mark"><Compass aria-hidden="true" size={21} /></span>
          Wanderlust<span className="wordmark-end">Explorer</span>
        </Link>
        <nav className="site-nav" aria-label="Navegación principal">
          {links.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return (
              <Link key={href} href={href} className={active ? "nav-active" : undefined} aria-current={pathname === href ? "page" : active ? "location" : undefined}>
                <Icon aria-hidden="true" size={17} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
