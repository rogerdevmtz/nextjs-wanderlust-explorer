import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces";
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
          <div className="container"><strong>Wanderlust Explorer</strong><span>Proyecto de demostración · Wanderlust Labs</span></div>
        </footer>
      </body>
    </html>
  );
}
