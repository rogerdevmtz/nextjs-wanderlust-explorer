import { ArrowRight, ArrowUpRight, Binoculars, BookOpen, Footprints, Landmark, Leaf, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ExperienceGrid } from "@/components/ExperienceGrid";
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
    <div className="container home-page">
      <section className="hero">
        <Image src="/images/adriatico.webp" alt="" fill sizes="(max-width: 1360px) 100vw, 1280px" preload />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>El mundo, <em>una<br className="hero-break" /> experiencia</em> a la vez.</h1>
          <p>Encuentra experiencias locales y guarda las que te gustaría vivir en tu próximo viaje.</p>
          <Link href="/experiences" className="button hero-action">Explorar experiencias <ArrowRight aria-hidden="true" size={19} /></Link>
        </div>
        <span className="hero-location"><MapPin aria-hidden="true" size={16} /> Costa dálmata, Croacia</span>
      </section>

      <section className="home-section" aria-labelledby="travel-categories">
        <h2 id="travel-categories">Explora por categoría</h2>
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
      </section>

      <section className="home-section featured-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <h2 id="featured-title">Experiencias destacadas</h2>
          <Link href="/experiences" className="text-button">Ver las {experiences.length} experiencias <ArrowRight aria-hidden="true" size={17} /></Link>
        </div>
        <ExperienceGrid experiences={experiences.slice(0, 3)} />
      </section>
      <section className="journal-panel" aria-labelledby="journal-title">
        <span className="empty-icon"><BookOpen aria-hidden="true" size={21} /></span>
        <h2 id="journal-title">Tu <em>bitácora de viaje</em></h2>
        <p>Guarda las experiencias que te interesan y vuelve a ellas durante esta visita.</p>
        <Link href="/favorites" className="button button-light">Ver mis favoritos <ArrowRight aria-hidden="true" size={17} /></Link>
      </section>
    </div>
  );
}
