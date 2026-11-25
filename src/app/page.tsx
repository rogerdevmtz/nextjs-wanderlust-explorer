import { ArrowRight, ArrowUpRight, Binoculars, Footprints, Landmark, Leaf, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { experiences } from "@/data/experiences";
import { categoryLabels } from "@/lib/catalog";
import { categories } from "@/types/experience";

const categoryIcons = { Adventure: Footprints, Culture: Landmark, Food: Utensils, Wellness: Leaf, Nature: Binoculars };

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <Image src="/images/adriatico.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1200px" preload />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>El mundo, una<br className="hero-break" /> experiencia a la vez.</h1>
          <p>Encuentra experiencias locales y guarda las que te gustaría vivir en tu próximo viaje.</p>
          <Link href="/experiences" className="button button-light">Explorar experiencias <ArrowRight aria-hidden="true" size={19} /></Link>
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
                  <span>{categoryLabels[category]}</span>
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
          <Link href="/experiences" className="text-button">Ver las 100 experiencias <ArrowRight aria-hidden="true" size={17} /></Link>
        </div>
        <ExperienceGrid experiences={experiences.slice(0, 3)} />
      </section>
    </div>
  );
}
