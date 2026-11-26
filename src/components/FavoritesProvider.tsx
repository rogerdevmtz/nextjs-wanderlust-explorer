"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Notice = { key: number; added: boolean };

type Favorites = {
  ids: ReadonlySet<string>;
  toggle: (id: string) => void;
  notice: Notice | null;
  dismissNotice: () => void;
};

const FavoritesContext = createContext<Favorites | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<ReadonlySet<string>>(() => new Set());
  const [notice, setNotice] = useState<Notice | null>(null);
  const toggle = useCallback((id: string) => {
    setIds((current) => {
      const next = new Set(current);
      const added = !next.has(id);
      if (added) next.add(id);
      else next.delete(id);
      setNotice({ key: Date.now(), added });
      return next;
    });
  }, []);
  const dismissNotice = useCallback(() => setNotice(null), []);
  const favorites = useMemo(() => ({ ids, toggle, notice, dismissNotice }), [ids, toggle, notice, dismissNotice]);

  return <FavoritesContext.Provider value={favorites}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const favorites = useContext(FavoritesContext);
  if (!favorites) throw new Error("FavoritesProvider is required");
  return favorites;
}
