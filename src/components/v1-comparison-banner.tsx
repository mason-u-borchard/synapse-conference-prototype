"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Thin top-of-page strip that points visitors to the previous design
// (main-branch deploy at legacy.thesynapse.co). Renders only on the
// homepage so it doesn't clutter inner pages.
export function V1ComparisonBanner() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="relative z-50 bg-off-black text-off-white">
      <div className="container-gutter">
        <Link
          href="https://legacy.thesynapse.co"
          target="_blank"
          rel="noopener"
          className="group flex h-9 items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-off-white/85 transition-colors hover:text-oxide-100"
        >
          <span>Compare with the original design</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
