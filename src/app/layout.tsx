import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ScrollEffects } from "@/components/ScrollEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/wght-italic.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Wanderlust Explorer", template: "%s · Wanderlust Explorer" },
  description: "Descubre, filtra y guarda experiencias de viaje de Wanderlust Labs.",
  icons: { icon: "/compass.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body>
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        <FavoritesProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1}>{children}</main>
        </FavoritesProvider>
        <SiteFooter />
        <ScrollEffects />
      </body>
    </html>
  );
}
