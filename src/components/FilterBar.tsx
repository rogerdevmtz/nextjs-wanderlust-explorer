import { ChevronDown, MapPin, Shapes } from "lucide-react";
import { cities, countries } from "@/hooks/useExperiences";
import { categoryLabels, countryLabel } from "@/lib/catalog";
import { categories } from "@/types/experience";

type Props = {
  category: string;
  destination: string;
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
};

export function FilterBar({ category, destination, onCategoryChange, onDestinationChange }: Props) {
  return (
    <>
      <div className="filter-field">
        <label htmlFor="category">Categoría</label>
        <div className="input-shell">
          <Shapes aria-hidden="true" size={18} />
          <select id="category" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="">Todas las categorías</option>
            {category && !categories.some((item) => item.toLowerCase() === category) && (
              <option value={category}>{category}</option>
            )}
            {categories.map((item) => <option key={item} value={item.toLowerCase()}>{categoryLabels[item]}</option>)}
          </select>
          <ChevronDown aria-hidden="true" className="select-arrow" size={16} />
        </div>
      </div>
      <div className="filter-field">
        <label htmlFor="destination">Destino</label>
        <div className="input-shell">
          <MapPin aria-hidden="true" size={18} />
          <select id="destination" value={destination} onChange={(event) => onDestinationChange(event.target.value)}>
            <option value="">Todos los destinos</option>
            {destination && !cities.includes(destination) && !countries.includes(destination) && (
              <option value={destination}>{destination}</option>
            )}
            <optgroup label="Países">
              {countries.map((country) => <option key={country} value={country}>{countryLabel(country)}</option>)}
            </optgroup>
            <optgroup label="Ciudades">
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </optgroup>
          </select>
          <ChevronDown aria-hidden="true" className="select-arrow" size={16} />
        </div>
      </div>
    </>
  );
}
