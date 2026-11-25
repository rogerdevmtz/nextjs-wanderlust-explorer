"use client";

import { SearchX, SlidersHorizontal } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { useExperiences } from "@/hooks/useExperiences";

export function Explorer() {
  const { search, category, destination, hasFilters, results, updateFilters, resetFilters } = useExperiences();
  return (
    <>
      <section className="filter-panel" aria-label="Búsqueda y filtros">
        <SearchBar value={search} onChange={(value) => updateFilters({ search: value }, true)} />
        <FilterBar category={category} destination={destination}
          onCategoryChange={(value) => updateFilters({ category: value })}
          onDestinationChange={(value) => updateFilters({ destination: value })} />
      </section>
      <section aria-labelledby="results-title">
        <div className="results-header">
          <div>
            <h2 id="results-title">Resultados</h2>
            <p role="status">{results.length} {results.length === 1 ? "experiencia" : "experiencias"}</p>
          </div>
          {hasFilters && (
            <button type="button" className="text-button" onClick={resetFilters}>
              <SlidersHorizontal aria-hidden="true" size={16} /> Limpiar filtros
            </button>
          )}
        </div>
        {results.length ? <ExperienceGrid experiences={results} /> : (
          <EmptyState icon={<SearchX aria-hidden="true" />} title="No se encontraron resultados"
            description="Prueba otro término o cambia los filtros de categoría y destino.">
            <button type="button" className="button" onClick={resetFilters}>Ver todas las experiencias</button>
          </EmptyState>
        )}
      </section>
    </>
  );
}
