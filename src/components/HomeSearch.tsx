import { ArrowRight, MapPin, Search, Shapes } from "lucide-react";
import Form from "next/form";
import { destinationGroups } from "@/components/DestinationOptions";
import { categoryGroups } from "@/components/FilterBar";
import { Select } from "@/components/Select";

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
      <div className="hero-field">
        <MapPin aria-hidden="true" size={18} />
        <span>
          <span className="hero-field-label" id="home-destination-label">Destino</span>
          <Select name="destination" label="Destino" groups={destinationGroups("Todos")} />
        </span>
      </div>
      <div className="hero-field">
        <Shapes aria-hidden="true" size={18} />
        <span>
          <span className="hero-field-label">Categoría</span>
          <Select name="category" label="Categoría" groups={categoryGroups("Todas")} />
        </span>
      </div>
      <button className="button" type="submit">Explorar <ArrowRight aria-hidden="true" size={17} /></button>
    </Form>
  );
}
