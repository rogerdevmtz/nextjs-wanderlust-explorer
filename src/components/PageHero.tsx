import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, description, image, imagePosition = "center", children }: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imagePosition?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-hero">
      <div className="page-hero-image">
        <Image src={image} alt="" fill sizes="(max-width: 760px) 100vw, 60vw" preload style={{ objectPosition: imagePosition }} />
      </div>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero-lead">{description}</p>
        </div>
        {children}
      </div>
    </header>
  );
}
