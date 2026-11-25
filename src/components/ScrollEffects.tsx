"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const REVEAL = [
  ".eyebrow:not(.hero-eyebrow)", ".section-heading", ".editorial-heading", ".results-header",
  ".category-links > li", ".experience-card", ".rail-track", ".journal-copy", ".journal-stats > li",
  ".filter-panel", ".key-facts > div", ".detail-story", ".detail-content", ".experience-gallery",
  ".profile-grid", ".profile-stats dl > div", ".empty-state", ".saved-section", ".pagination",
  ".footer-col", ".footer-search", ".footer-bottom", ".footer-wordmark",
].join(",");

export function ScrollEffects() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  // Barra superior, progreso y botón de volver arriba
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let frame = 0;
    function update() {
      frame = 0;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", String(max > 0 ? Math.min(1, y / max) : 0));
      root.dataset.scrolled = y > 40 ? "true" : "false";
      if (Math.abs(y - lastY) > 6) {
        root.dataset.scrollDir = y > lastY && y > 160 ? "down" : "up";
        lastY = y;
      }
      setShowTop(y > window.innerHeight);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Aparición en ambos sentidos
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting, boundingClientRect } of entries) {
        const element = target as HTMLElement;
        if (isIntersecting) element.dataset.reveal = "in";
        else element.dataset.reveal = boundingClientRect.top < 0 ? "above" : "below";
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    const watched = new WeakSet<Element>();
    function scan() {
      document.querySelectorAll<HTMLElement>(REVEAL).forEach((element) => {
        if (watched.has(element) || element.closest(".rail-track") !== null && !element.matches(".rail-track")) return;
        watched.add(element);
        if (!element.dataset.reveal) {
          const siblings = element.parentElement ? [...element.parentElement.children] : [];
          element.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(element), 5) * 70}ms`);
          const { top, bottom } = element.getBoundingClientRect();
          element.dataset.reveal = top < window.innerHeight && bottom > 0 ? "in" : top < 0 ? "above" : "below";
        }
        observer.observe(element);
      });
    }
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <button type="button" className={`to-top${showTop ? " to-top-visible" : ""}`} aria-label="Volver arriba"
      tabIndex={showTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ArrowUp aria-hidden="true" size={20} />
    </button>
  );
}
