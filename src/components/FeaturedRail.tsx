"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import type { Experience } from "@/types/experience";

export function FeaturedRail({ experiences, action }: { experiences: readonly Experience[]; action?: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  function updateEdges() {
    const track = rail.current;
    if (!track) return;
    const start = track.scrollLeft <= 2;
    const end = track.scrollWidth - track.clientWidth - track.scrollLeft <= 2;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 1);
    setEdges((current) => current.start === start && current.end === end ? current : { start, end });
  }

  useEffect(() => {
    const track = rail.current;
    if (!track) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  function move(direction: -1 | 1) {
    const track = rail.current;
    const firstCard = track?.querySelector("article");
    const secondCard = firstCard?.nextElementSibling;
    if (!track || !firstCard || !secondCard) return;

    const step = secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left;
    track.scrollBy({ left: step * direction });
  }

  return (
    <>
      <div className="rail-controls" role="group" aria-label="Desplazar la selección">
        <button type="button" aria-label="Experiencia anterior" aria-controls="featured-track"
          aria-disabled={edges.start} onClick={() => { if (!edges.start) move(-1); }}>
          <ArrowLeft aria-hidden="true" size={19} />
        </button>
        <button type="button" aria-label="Siguiente experiencia" aria-controls="featured-track"
          aria-disabled={edges.end} onClick={() => { if (!edges.end) move(1); }}>
          <ArrowRight aria-hidden="true" size={19} />
        </button>
        {action}
      </div>
      <div id="featured-track" ref={rail} className="rail-track" onScroll={updateEdges}
        role="region" aria-label="Selección de experiencias">
        <ExperienceGrid experiences={experiences} />
      </div>
      <div className="rail-progress" aria-hidden="true"><span style={{ transform: `scaleX(${0.34 + progress * 0.66})` }} /></div>
    </>
  );
}
