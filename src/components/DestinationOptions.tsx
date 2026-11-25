import type { SelectGroup } from "@/components/Select";
import { countryLabel } from "@/lib/catalog";
import { cities, countries } from "@/lib/catalog-options";
import { experiences } from "@/data/experiences";

const count = (match: (destination: string) => boolean) => experiences.filter(({ destination }) => match(destination)).length;

export function destinationGroups(allLabel: string, extra?: string): SelectGroup[] {
  return [
    { options: [{ value: "", label: allLabel, meta: experiences.length }, ...(extra ? [{ value: extra, label: extra }] : [])] },
    { label: "Países", options: countries.map((country) => ({ value: country, label: countryLabel(country), meta: count((d) => d.endsWith(`, ${country}`)) })) },
    { label: "Ciudades", options: cities.map((city) => ({ value: city, label: city, meta: count((d) => d.startsWith(`${city}, `)) })) },
  ];
}
