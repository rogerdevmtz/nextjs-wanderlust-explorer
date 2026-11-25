import { ArrowRight, ArrowUpRight, Binoculars, Footprints, Landmark, Leaf, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedRail } from "@/components/FeaturedRail";
import { experiences } from "@/data/experiences";
import { categoryLabels } from "@/lib/catalog";
import { categories } from "@/types/experience";

const categoryIcons = { Adventure: Footprints, Culture: Landmark, Food: Utensils, Wellness: Leaf, Nature: Binoculars };
const categoryDescriptions = {
  Adventure: "Rutas a pie, en bici y sobre el agua",
  Culture: "Templos, talleres e historias locales",
  Food: "Mercados, catas y cocina local",
  Wellness: "Yoga, baños termales y pausas",
  Nature: "Paisajes y vida silvestre",
};

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <Image src="/images/costa-dalmata-al-amanecer.webp" alt="" fill sizes="100vw" preload />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <h1>El mundo, una<br className="hero-break" /> <em>experiencia a la vez.</em></h1>
          <div className="hero-actions">
            <p>Descubre experiencias locales y guarda las que te gustaría vivir en tu próximo viaje.</p>
            <Link href="/experiences" className="button button-light">Explorar experiencias <ArrowRight aria-hidden="true" size={19} /></Link>
          </div>
          <span className="hero-location"><MapPin aria-hidden="true" size={16} /> Costa dálmata, Croacia</span>
        </div>
      </section>

      <section className="container discovery-section" aria-labelledby="travel-categories">
        <div className="editorial-heading">
          <h2 id="travel-categories">Explora <em>por categoría</em></h2>
          <p>Elige qué te apetece hacer y descubre las experiencias de esa categoría.</p>
        </div>
        <div className="discovery-layout">
          <figure className="discovery-photo">
            <Image src="/images/fitz-roy-al-amanecer.webp" alt="" fill sizes="(max-width: 760px) 92vw, 43vw" />
            <figcaption><MapPin aria-hidden="true" size={15} /> El Chaltén, Argentina</figcaption>
          </figure>
          <ul className="category-links">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <li key={category}>
                  <Link href={`/experiences?category=${category.toLowerCase()}`}>
                    <span className="category-icon"><Icon aria-hidden="true" size={20} /></span>
                    <span className="category-copy">
                      <strong>{categoryLabels[category]}</strong>
                      <span>{categoryDescriptions[category]}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="category-arrow" size={16} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-heading">
            <h2 id="featured-title">Experiencias <em>destacadas</em></h2>
            <Link href="/experiences" className="text-button">Ver las {experiences.length} experiencias <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <FeaturedRail experiences={experiences.slice(0, 6)} />
        </div>
      </section>
      <section className="journal-panel" aria-labelledby="journal-title">
        <Image src="/images/adriatico.webp" alt="" fill sizes="100vw" />
        <div className="container journal-inner">
          <div className="journal-copy">
            <h2 id="journal-title">Tu <em>bitácora de viaje</em></h2>
            <p>Guarda las experiencias que te interesan y vuelve a ellas durante esta visita.</p>
            <Link href="/favorites" className="button">Ver mis favoritos <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
