"use client";

import { useState } from "react";
import type { FaqEntry } from "@/types/content";
import { cx } from "@/lib/cx";

// Accordion on the off-white FAQ surface. Each row is a hairline-divided
// list item; the trailing "+" rotates to "x" on open. Question type
// is sans-serif at body-large size per the Figma; answer body sits
// indented within the row in muted off-black. Was previously styled
// for the dark moss surface (off-white text + off-white dividers);
// updated 2026-06-08 per Taylor's R1 audit ("Page should be white").
export function FaqAccordion({ items }: { items: readonly FaqEntry[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="divide-y divide-off-black/15 border-b border-off-black/15">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <li key={item.id} id={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-${item.id}`}
              onClick={() => setOpen((prev) => (prev === item.id ? null : item.id))}
              className="group flex w-full items-center justify-between gap-8 py-6 text-left transition-colors hover:text-oxide-200 md:py-7"
            >
              <span className="font-sans text-lg leading-[1.35] text-off-black text-pretty md:text-xl">
                {item.question}
              </span>
              <span
                className={cx(
                  "shrink-0 font-mono text-2xl leading-none text-off-black/60 transition-transform duration-300 group-hover:text-oxide-200",
                  isOpen && "rotate-45",
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={`faq-${item.id}`}
              role="region"
              hidden={!isOpen}
              className="max-w-[68ch] pb-7 pr-12 font-sans text-base leading-[1.6] text-off-black/75 text-pretty md:text-lg"
            >
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
