"use client";

import { useState } from "react";
import type { FaqEntry } from "@/types/content";
import { cx } from "@/lib/cx";

export function FaqAccordion({ items }: { items: readonly FaqEntry[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="mt-6 divide-y divide-border border-y border-border">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <li key={item.id} id={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-${item.id}`}
              onClick={() => setOpen((prev) => (prev === item.id ? null : item.id))}
              className="flex w-full items-baseline justify-between gap-6 py-5 text-left"
            >
              <span className="font-serif text-xl text-pretty text-ink">{item.question}</span>
              <span className={cx("mt-1 font-mono text-xs text-muted-foreground transition-transform", isOpen && "rotate-45")} aria-hidden="true">+</span>
            </button>
            <div id={`faq-${item.id}`} role="region" hidden={!isOpen} className="max-w-3xl pb-6 text-pretty text-muted-foreground">
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
