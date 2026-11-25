import { MapPin, Shapes } from "lucide-react";
import { destinationGroups } from "@/components/DestinationOptions";
import { Select } from "@/components/Select";
import { cities, countries } from "@/lib/catalog-options";
import { categoryLabels } from "@/lib/catalog";
import { experiences } from "@/data/experiences";
import { categories } from "@/types/experience";

type Props = {
  category: string;
  destination: string;
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
};

export function categoryGroups(allLabel: string, extra?: string) {
  return [{
    options: [
      { value: "", label: allLabel, meta: experiences.length },
      ...(extra ? [{ value: extra, label: extra }] : []),
      ...categories.map((item) => ({ value: item.toLowerCase(), label: categoryLabels[item], meta: experiences.filter(({ category }) => category === item).length })),
    ],
  }];
}

export function FilterBar({ category, destination, onCategoryChange, onDestinationChange }: Props) {
  const unknownCategory = category && !categories.some((item) => item.toLowerCase() === category) ? category : undefined;
  const unknownDestination = destination && !cities.includes(destination) && !countries.includes(destination) ? destination : undefined;
  return (
    <>
      <div className="filter-field">
        <label htmlFor="category">Categoría</label>
        <Select id="category" className="input-shell" icon={<Shapes aria-hidden="true" size={18} />}
          groups={categoryGroups("Todas las categorías", unknownCategory)} value={category} onChange={onCategoryChange} />
      </div>
      <div className="filter-field">
        <label htmlFor="destination">Destino</label>
        <Select id="destination" className="input-shell" icon={<MapPin aria-hidden="true" size={18} />}
          groups={destinationGroups("Todos los destinos", unknownDestination)} value={destination} onChange={onDestinationChange} />
      </div>
    </>
  );
}
