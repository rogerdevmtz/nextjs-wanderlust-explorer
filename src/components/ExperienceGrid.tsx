"use client";

import { ExperienceCard } from "@/components/ExperienceCard";
import { useFavorites } from "@/components/FavoritesProvider";
import type { Experience } from "@/types/experience";

export function ExperienceGrid({ experiences }: { experiences: readonly Experience[] }) {
  const { ids, toggle } = useFavorites();
  return (
    <div className="experience-grid">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} saved={ids.has(experience.id)} toggle={toggle} />
      ))}
    </div>
  );
}
