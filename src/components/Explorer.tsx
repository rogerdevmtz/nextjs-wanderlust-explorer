"use client";

import { ArrowDownWideNarrow, ArrowLeft, ArrowRight, LayoutGrid, Rows3, SearchX, SlidersHorizontal, X } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { Select } from "@/components/Select";
import { PAGE_SIZE, sortOptions, useExperiences } from "@/hooks/useExperiences";
import { categoryLabels, countryLabel } from "@/lib/catalog";
import { categories } from "@/types/experience";

// 1 … 4 5 6 … 9: la primera, la última y las vecinas de la actual.
function pageList(page: number, total: number) {
  const pages = new Set([1, total, page - 1, page, page + 1].filter((n) => n >= 1 && n <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? ["gap" as const, n] : [n]));
}

export function Explorer() {
  const { search, category, destination, hasFilters, results, pageResults, page, showAll, totalPages, goToPage, sort, changeSort, detailQuery, updateFilters, resetFilters } = useExperiences();
  const selectedCategory = categories.find((item) => item.toLowerCase() === category);
  const categoryName = selectedCategory ? categoryLabels[selectedCategory] : category;
  const activeFilters = [
    { key: "search", field: "experience-search", label: search.trim() || search, name: "búsqueda" },
    { key: "category", field: "category", label: categoryName, name: "categoría" },
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

  const term = search.trim();
  const scope = [categoryName, countryLabel(destination)].filter(Boolean).join(" · ");
  const emptyDescription = term
    ? `Ninguna experiencia contiene «${term}» en su título${scope ? ` dentro de ${scope}` : ""}.`
    : `No hay experiencias para ${scope}.`;

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
      <section aria-labelledby="results-title">
        <div className="results-header">
          <div>
            <h2 id="results-title">{hasFilters ? "Resultados de búsqueda" : "Todas las experiencias"}</h2>
            <p role="status">
              {results.length} {results.length === 1 ? "experiencia" : "experiencias"}
              {totalPages > 1 && !showAll && <> · mostrando {first}–{last}</>}
            </p>
          </div>
          {results.length > 1 && (
            <div className="sort-field">
              <label htmlFor="sort">Ordenar</label>
              <Select id="sort" className="input-shell" label="Ordenar" icon={<ArrowDownWideNarrow aria-hidden="true" size={17} />}
                groups={[{ options: sortOptions.map(({ value, label }) => ({ value, label })) }]} value={sort} onChange={changeSort} />
            </div>
          )}
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
                    <button type="button" className="pagination-step pagination-arrow" disabled={page === 1} onClick={() => changePage(page - 1)}>
                      <ArrowLeft aria-hidden="true" size={17} /> <span>Anterior</span>
                    </button>
                    <ol>
                      {pageList(page, totalPages).map((item, index) => (
                        <li key={item === "gap" ? `gap-${index}` : item}>
                          {item === "gap" ? <span className="pagination-gap" aria-hidden="true">…</span> : (
                            <button type="button" aria-label={`Página ${item}`} aria-current={item === page ? "page" : undefined}
                              onClick={() => changePage(item)}>{item}</button>
                          )}
                        </li>
                      ))}
                    </ol>
                    <button type="button" className="pagination-step pagination-arrow" disabled={page === totalPages} onClick={() => changePage(page + 1)}>
                      <span>Siguiente</span> <ArrowRight aria-hidden="true" size={17} />
                    </button>
                    <button type="button" className="text-button pagination-all" onClick={() => changePage("todas")}>
                      <LayoutGrid aria-hidden="true" size={16} /> Ver las {results.length}
                    </button>
                  </>
                )}
              </nav>
            )}
          </>
        ) : (
          <EmptyState icon={<SearchX aria-hidden="true" />} title="No se encontraron resultados" description={emptyDescription}>
            <div className="empty-actions">
              {term && scope && (
                <button type="button" className="button button-ghost" onClick={() => updateFilters({ category: "", destination: "" })}>
                  Buscar «{term}» en todo el catálogo
                </button>
              )}
              <button type="button" className="button" onClick={clearAll}>Ver todas las experiencias</button>
            </div>
          </EmptyState>
        )}
      </section>
    </>
  );
}
