import { Compass } from "lucide-react";
import Link from "next/link";

export function SiteBrand() {
  return (
    <Link href="/" className="wordmark" aria-label="Wanderlust Explorer, inicio">
      <span className="brand-mark"><Compass aria-hidden="true" size={21} /></span>
      <span className="brand-name">Wanderlust <span>Explorer</span></span>
    </Link>
  );
}
