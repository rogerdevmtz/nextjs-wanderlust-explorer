"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type ExperiencePhoto = { src: string; caption: string; alt?: string };

export function ExperienceGallery({ photos }: { photos: readonly [ExperiencePhoto, ...ExperiencePhoto[]] }) {
  const [index, setIndex] = useState(0);
  const photo = photos[index] ?? photos[0];

  return (
    <section className={photos.length > 1 ? "experience-gallery gallery-with-thumbs" : "experience-gallery"}
      aria-label="Fotografías de la experiencia">
      <figure className="detail-figure">
        <div id="experience-photo" className="detail-image">
          <Image src={photo.src} alt={photo.alt ?? photo.caption} fill
            sizes={photos.length > 1 ? "(max-width: 720px) 92vw, (max-width: 1400px) 68vw, 900px" : "(max-width: 1375px) 92vw, 1280px"}
            preload={index === 0}
            loading={index === 0 ? undefined : "eager"} />
          <figcaption aria-live="polite">{photo.caption}</figcaption>
          <span className="gallery-counter" aria-hidden="true"><Camera size={14} /> {index + 1} / {photos.length}</span>
        </div>
      </figure>
      {photos.length > 1 && (
        <div className="gallery-thumbs" role="group" aria-label="Elegir fotografía">
          {photos.map(({ src, caption }, photoIndex) => (
            <button key={src} type="button" aria-label={caption} aria-pressed={index === photoIndex}
              aria-controls="experience-photo" onClick={() => setIndex(photoIndex)}>
              <Image src={src} alt="" fill sizes="(max-width: 760px) 30vw, 320px" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
