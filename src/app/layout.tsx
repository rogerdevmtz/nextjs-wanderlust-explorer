import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { SiteBrand } from "@/components/SiteBrand";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/wght-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Wanderlust Explorer", template: "%s · Wanderlust Explorer" },
  description: "Descubre, filtra y guarda experiencias de viaje de Wanderlust Labs.",
  icons: { icon: "/compass.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        <FavoritesProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1}>{children}</main>
        </FavoritesProvider>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-row">
              <SiteBrand />
              <nav aria-label="Navegación del pie">
                <Link href="/">Inicio</Link>
                <Link href="/experiences">Explorar</Link>
                <Link href="/favorites">Favoritos</Link>
                <Link href="/profile">Perfil</Link>
              </nav>
            </div>
            <p>Proyecto de demostración · Wanderlust Labs</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
