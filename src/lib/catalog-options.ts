import { experiences } from "@/data/experiences";
import { countryLabel } from "@/lib/catalog";

const collator = new Intl.Collator("es");
const destinations = experiences.map(({ destination }) => destination.split(", "));

export const cities = [...new Set(destinations.map(([city]) => city))].sort(collator.compare);
export const countries = [...new Set(destinations.map(([, country]) => country))]
  .sort((a, b) => collator.compare(countryLabel(a), countryLabel(b)));
