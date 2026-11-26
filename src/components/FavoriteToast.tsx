"use client";

import { Heart, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useFavorites } from "@/components/FavoritesProvider";

export function FavoriteToast() {
  const { notice, dismissNotice, toggle } = useFavorites();

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(dismissNotice, notice.added ? 3200 : 5000);
    return () => window.clearTimeout(timer);
  }, [notice, dismissNotice]);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {notice && (
        <div key={notice.key} className={`toast ${notice.added ? "toast-added" : ""}`}>
          <Heart aria-hidden="true" size={18} className="toast-icon" />
          <p>{notice.added ? "Guardado en favoritos" : "Eliminado de favoritos"}</p>
          {notice.added
            ? <Link href="/favorites" onClick={dismissNotice}>Ver</Link>
            : <button type="button" className="toast-undo" onClick={() => toggle(notice.id)}>Deshacer</button>}
          <button type="button" aria-label="Cerrar aviso" onClick={dismissNotice}><X aria-hidden="true" size={16} /></button>
        </div>
      )}
    </div>
  );
}
