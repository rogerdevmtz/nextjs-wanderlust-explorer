"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { experiences } from "@/data/experiences";
import { countryLabel, filterKeys, getCatalogFilterQuery } from "@/lib/catalog";
import { cities, countries } from "@/lib/catalog-options";
import { categories, type Experience } from "@/types/experience";

type Filters = Partial<Record<(typeof filterKeys)[number], string>>;

export const PAGE_SIZE = 12;

export const sortOptions = [
  { value: "", label: "Recomendadas" },
  { value: "precio-asc", label: "Precio: de menor a mayor" },
  { value: "precio-desc", label: "Precio: de mayor a menor" },
  { value: "valoracion", label: "Mejor valoradas" },
] as const;

type SortKey = (typeof sortOptions)[number]["value"];

const sorters: Record<Exclude<SortKey, "">, (a: Experience, b: Experience) => number> = {
  "precio-asc": (a, b) => a.price - b.price,
  "precio-desc": (a, b) => b.price - a.price,
  valoracion: (a, b) => b.rating - a.rating,
};

const isSortKey = (value: string): value is SortKey => sortOptions.some((option) => option.value === value);

function normalize(value: string) {
  return value.trim().normalize("NFD").replace(/\p{M}/gu, "");
}

export function useExperiences() {
  const pathname = usePathname();
  const params = useSearchParams();
  const search = params.get("search") ?? "";
  const rawCategory = params.get("category") ?? "";
  const rawDestination = params.get("destination") ?? "";
  const category = categories.find((item) => item.toLowerCase() === rawCategory.toLowerCase());
  const destination = [...cities, ...countries].find((item) =>
    [item, countryLabel(item)].some((label) => normalize(label).toLowerCase() === normalize(rawDestination).toLowerCase()),
  ) ?? rawDestination;

  const searchTerm = normalize(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titlePattern = new RegExp(searchTerm, "i");
  const destinationTerm = normalize(destination).toLowerCase();
  const results = experiences.filter((experience) => {
    const [city, country] = experience.destination.split(", ");
    const matchesDestination = !destinationTerm || [city, country, countryLabel(country), experience.destination]
      .some((part) => normalize(part).toLowerCase().includes(destinationTerm));

    return titlePattern.test(normalize(experience.title))
      && (!rawCategory || experience.category === category)
      && matchesDestination;
  });

  function updateFilters(updates: Filters, replace = false) {
    const next = new URLSearchParams(window.location.search);
    for (const key of filterKeys) {
      const value = updates[key];
      if (value === undefined) continue;
      if (value) next.set(key, value);
      else next.delete(key);
    }
    // Un cambio de filtros vuelve a la primera página (o mantiene «ver todas»).
    if (next.get("page") !== "todas") next.delete("page");

    const query = next.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (url === window.location.pathname + window.location.search) return;
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }

  // Paginación de 12 en 12 (?page=N) con la opción de ver todas (?page=todas).
  const rawSort = params.get("sort") ?? "";
  const sort: SortKey = isSortKey(rawSort) ? rawSort : "";
  const sorted = sort ? [...results].sort(sorters[sort]) : results;
  const rawPage = params.get("page");
  const showAll = rawPage === "todas";
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = showAll ? 1 : Math.min(totalPages, Math.max(1, Number.parseInt(rawPage ?? "1", 10) || 1));
  const pageResults = showAll ? sorted : sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function pushParam(key: string, value: string) {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    window.history.pushState(null, "", query ? `${pathname}?${query}` : pathname);
  }

  const goToPage = (nextPage: number | "todas") => pushParam("page", nextPage === "todas" ? "todas" : nextPage > 1 ? String(nextPage) : "");
  const changeSort = (value: string) => pushParam("sort", isSortKey(value) ? value : "");

  return {
    page,
    showAll,
    totalPages,
    pageResults,
    goToPage,
    sort,
    changeSort,
    search,
    category: category ? category.toLowerCase() : rawCategory,
    destination,
    hasFilters: Boolean(search || rawCategory || rawDestination),
    detailQuery: getCatalogFilterQuery(params),
    results,
    updateFilters,
    resetFilters: () => updateFilters({ search: "", category: "", destination: "" }),
  };
}
