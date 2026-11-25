"use client";

import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { useExperiences } from "@/hooks/useExperiences";
import { categoryLabels, countryLabel } from "@/lib/catalog";
import { categories } from "@/types/experience";

export function Explorer() {
  const { search, category, destination, hasFilters, results, detailQuery, updateFilters, resetFilters } = useExperiences();
  const selectedCategory = categories.find((item) => item.toLowerCase() === category);
  const activeFilters = [
    { key: "search", field: "experience-search", label: search.trim() || search, name: "búsqueda" },
    { key: "category", field: "category", label: selectedCategory ? categoryLabels[selectedCategory] : category, name: "categoría" },
    { key: "destination", field: "destination", label: countryLabel(destination), name: "destino" },
  ] as const;

  function clearAll() {
    resetFilters();
    document.getElementById("experience-search")?.focus();
  }

  return (
    <>
      <section className="filter-panel" aria-label="Búsqueda y filtros">
        <div className="filter-fields">
          <SearchBar value={search} onChange={(value) => updateFilters({ search: value }, true)} />
          <FilterBar category={category} destination={destination}
            onCategoryChange={(value) => updateFilters({ category: value })}
            onDestinationChange={(value) => updateFilters({ destination: value })} />
        </div>
        {hasFilters && (
          <div className="filter-actions">
            <ul className="filter-chips" aria-label="Filtros activos">
              {activeFilters.filter(({ label }) => label).map(({ key, field, label, name }) => (
                <li key={key}>
                  <button type="button" className="filter-chip" aria-label={`Quitar filtro de ${name}: ${label}`}
                    onClick={() => {
                      updateFilters({ [key]: "" });
                      document.getElementById(field)?.focus();
                    }}>
                    <span>{label}</span><X aria-hidden="true" size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="text-button" onClick={clearAll}>
              <SlidersHorizontal aria-hidden="true" size={16} /> Limpiar filtros
            </button>
          </div>
        )}
      </section>
      <section aria-labelledby="results-title" className={results.length === 1 ? "single-result" : undefined}>
        <div className="results-header">
          <div>
            <h2 id="results-title">Resultados</h2>
            <p role="status">{results.length} {results.length === 1 ? "experiencia" : "experiencias"}</p>
          </div>
        </div>
        {results.length ? <ExperienceGrid experiences={results} detailQuery={detailQuery} /> : (
          <EmptyState icon={<SearchX aria-hidden="true" />} title="No se encontraron resultados"
            description="Prueba otro término o cambia los filtros de categoría y destino.">
            <button type="button" className="button" onClick={clearAll}>Ver todas las experiencias</button>
          </EmptyState>
        )}
      </section>
    </>
  );
}
