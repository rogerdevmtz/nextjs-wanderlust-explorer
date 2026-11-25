import { ArrowRight, MapPin, Search, Shapes } from "lucide-react";
import Form from "next/form";
import { DestinationOptions } from "@/components/DestinationOptions";
import { categoryLabels } from "@/lib/catalog";
import { categories } from "@/types/experience";

export function HomeSearch() {
  return (
    <Form action="/experiences" className="hero-search" aria-label="Buscar experiencias">
      <label className="hero-field">
        <Search aria-hidden="true" size={18} />
        <span>
          <span className="hero-field-label">Experiencia</span>
          <input type="search" name="search" placeholder="Vela, templos, cocina…" />
        </span>
      </label>
      <label className="hero-field">
        <MapPin aria-hidden="true" size={18} />
        <span>
          <span className="hero-field-label">Destino</span>
          <select name="destination">
            <option value="">Todos</option>
            <DestinationOptions />
          </select>
        </span>
      </label>
      <label className="hero-field">
        <Shapes aria-hidden="true" size={18} />
        <span>
          <span className="hero-field-label">Categoría</span>
          <select name="category">
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>{categoryLabels[category]}</option>
            ))}
          </select>
        </span>
      </label>
      <button className="button" type="submit">Explorar experiencias <ArrowRight aria-hidden="true" size={17} /></button>
    </Form>
  );
}
