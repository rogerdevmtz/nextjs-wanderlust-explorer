import { ArrowRight, ArrowUpRight, BookOpen, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedRail } from "@/components/FeaturedRail";
import { HomeSearch } from "@/components/HomeSearch";
import { experiences } from "@/data/experiences";
import { categoryLabels } from "@/lib/catalog";
import { countries } from "@/lib/catalog-options";
import { categories } from "@/types/experience";

const categoryFeatures = {
  Adventure: { title: "A pie, en bici o a vela", description: "Del Fitz Roy al Adriático, elige cómo moverte.", image: "/images/fitz-roy-al-amanecer.webp" },
  Culture: { title: "Templos, talleres e historias", description: "Conoce cada lugar a través de su patrimonio.", image: "/images/kyoto.webp" },
  Food: { title: "Sabores de mercado", description: "Prueba recetas y productos de cada región.", image: "/images/bangkok.webp" },
  Wellness: { title: "Tiempo para bajar el ritmo", description: "Yoga, baños termales y pausas al aire libre.", image: "/images/bienestar-ubud.webp" },
  Nature: { title: "Paisajes y vida silvestre", description: "Camina entre bosques, cascadas y montañas.", image: "/images/iceland.webp" },
};

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <Image src="/images/costa-dalmata-al-amanecer.webp" alt="" fill sizes="100vw" preload />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <h1>El mundo, una <em>experiencia</em> a la vez.</h1>
          <div className="hero-actions">
            <p>Descubre experiencias locales y guarda las que te gustaría vivir en tu próximo viaje.</p>
            <HomeSearch />
          </div>
          <div className="hero-meta">
            <span className="hero-location"><MapPin aria-hidden="true" size={16} /> Costa dálmata, Croacia</span>
            <span>{experiences.length} experiencias en {countries.length} países</span>
          </div>
        </div>
      </section>

      <section className="container discovery-section" aria-labelledby="travel-categories">
        <div className="editorial-heading">
          <h2 id="travel-categories">Explora <em>por categoría</em></h2>
          <p>Elige qué te apetece hacer y descubre las experiencias de esa categoría.</p>
        </div>
        <ul className="category-links">
          {categories.map((category) => {
            const feature = categoryFeatures[category];
            return (
              <li key={category}>
                <Link href={`/experiences?category=${category.toLowerCase()}`} aria-label={`Explorar ${categoryLabels[category]}`}>
                  <Image src={feature.image} alt="" fill sizes="(max-width: 640px) 92vw, 54vw" />
                  <span className="category-tag">{categoryLabels[category]}</span>
                  <span className="category-copy">
                    <strong>{feature.title}</strong>
                    <span>{feature.description}</span>
                  </span>
                  <span className="category-arrow"><ArrowUpRight aria-hidden="true" size={17} /></span>
                </Link>
              </li>
            );
          })}
        </ul>
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
          <Link href="/profile" className="journal-link">
            <span className="empty-icon"><BookOpen aria-hidden="true" size={21} /></span>
            <span><strong>Mi perfil y bitácora</strong><span>Consulta tus experiencias guardadas.</span></span>
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
