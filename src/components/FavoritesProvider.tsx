"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Favorites = {
  ids: ReadonlySet<string>;
  toggle: (id: string) => void;
};

const FavoritesContext = createContext<Favorites | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<ReadonlySet<string>>(() => new Set());
  const toggle = useCallback((id: string) => {
    setIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const favorites = useMemo(() => ({ ids, toggle }), [ids, toggle]);

  return <FavoritesContext.Provider value={favorites}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const favorites = useContext(FavoritesContext);
  if (!favorites) throw new Error("FavoritesProvider is required");
  return favorites;
}
