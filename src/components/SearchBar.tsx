"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentSearch = new URLSearchParams(window.location.search).get("search") ?? "";
    if (input.current && input.current.value !== currentSearch) input.current.value = currentSearch;
  }, [value]);

  return (
    <div className="filter-field search-field">
      <label htmlFor="experience-search">Buscar por título</label>
      <div className="input-shell">
        <Search aria-hidden="true" size={18} />
        <input ref={input} id="experience-search" type="search" placeholder="Ej. vela, templos, cocina…" defaultValue={value}
          onChange={(event) => onChange(event.target.value)} />
        {value && (
          <button type="button" className="icon-button" aria-label="Borrar búsqueda" onClick={() => {
            onChange("");
            input.current?.focus();
          }}>
            <X aria-hidden="true" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
