"use client";

import { ArrowLeft, ArrowRight, LayoutGrid, Rows3, SearchX, SlidersHorizontal, X } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { PAGE_SIZE, useExperiences } from "@/hooks/useExperiences";
import { categoryLabels, countryLabel } from "@/lib/catalog";
import { categories } from "@/types/experience";

export function Explorer() {
  const { search, category, destination, hasFilters, results, pageResults, page, showAll, totalPages, goToPage, detailQuery, updateFilters, resetFilters } = useExperiences();
  const selectedCategory = categories.find((item) => item.toLowerCase() === category);
  const activeFilters = [
    { key: "search", field: "experience-search", label: search.trim() || search, name: "búsqueda" },
    { key: "category", field: "category", label: selectedCategory ? categoryLabels[selectedCategory] : category, name: "categoría" },
    { key: "destination", field: "destination", label: countryLabel(destination), name: "destino" },
  ] as const;

  function changePage(nextPage: number | "todas") {
    goToPage(nextPage);
    document.getElementById("results-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const first = (page - 1) * PAGE_SIZE + 1;
  const last = Math.min(results.length, page * PAGE_SIZE);

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
            <p className="eyebrow">Catálogo</p>
            <h2 id="results-title">{hasFilters ? <>Resultados de <em>búsqueda</em></> : <>Todas las <em>experiencias</em></>}</h2>
            <p role="status">
              {results.length} {results.length === 1 ? "experiencia" : "experiencias"}
              {totalPages > 1 && !showAll && <> · mostrando {first}–{last}</>}
            </p>
          </div>
        </div>
        {results.length ? (
          <>
            <ExperienceGrid experiences={pageResults} detailQuery={detailQuery} />
            {totalPages > 1 && (
              <nav className="pagination" aria-label="Paginación de resultados">
                {showAll ? (
                  <button type="button" className="pagination-step" onClick={() => changePage(1)}>
                    <Rows3 aria-hidden="true" size={17} /> <span>Ver por páginas</span>
                  </button>
                ) : (
                  <>
                    <button type="button" className="pagination-step" disabled={page === 1} onClick={() => changePage(page - 1)}>
                      <ArrowLeft aria-hidden="true" size={17} /> <span>Anterior</span>
                    </button>
                    <ol>
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                        <li key={number}>
                          <button type="button" aria-label={`Página ${number}`} aria-current={number === page ? "page" : undefined}
                            onClick={() => changePage(number)}>{number}</button>
                        </li>
                      ))}
                    </ol>
                    <button type="button" className="pagination-step" disabled={page === totalPages} onClick={() => changePage(page + 1)}>
                      <span>Siguiente</span> <ArrowRight aria-hidden="true" size={17} />
                    </button>
                    <button type="button" className="pagination-step pagination-all" onClick={() => changePage("todas")}>
                      <LayoutGrid aria-hidden="true" size={17} /> <span>Ver las {results.length}</span>
                    </button>
                  </>
                )}
              </nav>
            )}
          </>
        ) : (
          <EmptyState icon={<SearchX aria-hidden="true" />} title="No se encontraron resultados"
            description="Prueba otro término o cambia los filtros de categoría y destino.">
            <button type="button" className="button" onClick={clearAll}>Ver todas las experiencias</button>
          </EmptyState>
        )}
      </section>
    </>
  );
}
