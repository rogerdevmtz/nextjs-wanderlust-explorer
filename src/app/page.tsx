import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
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
        <div className="hero-media" aria-hidden="true">
          <picture>
            <source media="(min-width: 761px)" type="image/webp" sizes="100vw"
              srcSet="/images/hero-kelingking-1600.webp 1600w, /images/hero-kelingking-2663.webp 2663w" />
            {/* Se sirve sin recomprimir para conservar la nitidez; cada pantalla recibe su recorte. */}
            <img src="/images/hero-kelingking-movil.webp" alt="" width={744} height={1328}
              fetchPriority="high" decoding="async" className="hero-photo" />
          </picture>
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <h1>El mundo, una <em>experiencia</em> a la vez.</h1>
          <div className="hero-actions">
            <p>Descubre {experiences.length} experiencias curadas en {countries.length} países, desde playas escondidas en Indonesia hasta mercados nocturnos y retiros termales.</p>
            <HomeSearch />
          </div>
        </div>
        <div className="container hero-footer">
          <p className="hero-place"><MapPin aria-hidden="true" size={15} /> Kelingking · Nusa Penida, Indonesia</p>
          <a href="#travel-categories" className="hero-scroll">Desliza para descubrir <ArrowDown aria-hidden="true" size={16} /></a>
        </div>
      </section>

      <section className="container discovery-section" aria-labelledby="travel-categories">
        <div className="editorial-heading">
          <div>
            <p className="eyebrow">Colecciones</p>
            <h2 id="travel-categories">Explora <em>por categoría</em></h2>
          </div>
          <p>Cinco formas distintas de conectar con cada destino. Elige qué te apetece hacer y descubre sus experiencias.</p>
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
                    <strong>{categoryLabels[category]}</strong>
                    <span>{experiences.filter((item) => item.category === category).length} experiencias</span>
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
            <div>
              <p className="eyebrow">Selección editorial</p>
              <h2 id="featured-title">Experiencias <em>destacadas</em></h2>
            </div>
          </div>
          <FeaturedRail experiences={experiences.slice(0, 6)}
            action={<Link href="/experiences" className="button button-small">Ver todas <ArrowRight aria-hidden="true" size={16} /></Link>} />
        </div>
      </section>
      <section className="journal-panel" aria-labelledby="journal-title">
        <Image src="/images/kelingking-playa.webp" alt="" fill sizes="100vw" />
        <div className="container journal-inner">
          <div className="journal-copy">
            <p className="eyebrow">Tu diario personal</p>
            <h2 id="journal-title">Tu <em>bitácora de viaje</em></h2>
            <p>Guarda tus experiencias favoritas y lleva un registro visual de los países y categorías que definen tu estilo de viaje.</p>
            <Link href="/profile" className="button button-light">Ver mi perfil <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
