"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { experiences } from "@/data/experiences";
import { countryLabel, filterKeys, getCatalogFilterQuery } from "@/lib/catalog";
import { cities, countries } from "@/lib/catalog-options";
import { categories } from "@/types/experience";

type Filters = Partial<Record<(typeof filterKeys)[number], string>>;

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

    const query = next.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (url === window.location.pathname + window.location.search) return;
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }

  return {
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
