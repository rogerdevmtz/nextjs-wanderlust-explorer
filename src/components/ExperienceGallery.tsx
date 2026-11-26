"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useState } from "react";

export type ExperiencePhoto = { src: string; caption: string; alt?: string };

// Portada de la ficha: la fotografía ocupa todo el ancho y el título se apoya sobre ella.
export function ExperienceGallery({ photos, children }: {
  photos: readonly [ExperiencePhoto, ...ExperiencePhoto[]];
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const photo = photos[index] ?? photos[0];

  return (
    <header className="detail-hero">
      <div id="experience-photo" className="detail-hero-media">
        {photos.map(({ src, caption, alt }, photoIndex) => (
          <Image key={src} src={src} alt={photoIndex === index ? alt ?? caption : ""} fill sizes="100vw"
            preload={photoIndex === 0} loading={photoIndex === 0 ? undefined : "eager"}
            className={photoIndex === index ? "is-active" : undefined} aria-hidden={photoIndex !== index} />
        ))}
      </div>
      <div className="container detail-hero-inner">
        <div className="detail-hero-copy">{children}</div>
        <div className="detail-hero-foot">
          <p className="detail-hero-caption" aria-live="polite">
            <Camera aria-hidden="true" size={15} /> {photo.caption}
            {photos.length > 1 && <span aria-hidden="true"> · {index + 1}/{photos.length}</span>}
          </p>
          {photos.length > 1 && (
            <div className="detail-hero-thumbs" role="group" aria-label="Elegir fotografía">
              {photos.map(({ src, caption }, photoIndex) => (
                <button key={src} type="button" aria-label={caption} aria-pressed={index === photoIndex}
                  aria-controls="experience-photo" onClick={() => setIndex(photoIndex)}>
                  <Image src={src} alt="" fill sizes="96px" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
