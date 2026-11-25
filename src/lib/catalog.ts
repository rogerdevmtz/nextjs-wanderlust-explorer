import type { Category } from "@/types/experience";

export const filterKeys = ["search", "category", "destination"] as const;

export function getCatalogFilterQuery(params: Pick<URLSearchParams, "get">) {
  const filters = new URLSearchParams();
  for (const key of [...filterKeys, "page"]) {
    const value = params.get(key);
    if (value) filters.set(key, value);
  }
  return filters.toString();
}

export const categoryLabels: Record<Category, string> = {
  Adventure: "Aventura",
  Culture: "Cultura",
  Food: "Gastronomía",
  Wellness: "Bienestar",
  Nature: "Naturaleza",
};

const countries: Record<string, string> = {
  Croatia: "Croacia",
  Japan: "Japón",
  Thailand: "Tailandia",
  Morocco: "Marruecos",
  Iceland: "Islandia",
  Mexico: "México",
  Italy: "Italia",
};

const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const priceLabel = (price: number) => euro.format(price);
export const countryLabel = (country: string) => countries[country] ?? country;

export function destinationLabel(destination: string) {
  const [city, country] = destination.split(", ");
  return `${city}, ${countryLabel(country)}`;
}
