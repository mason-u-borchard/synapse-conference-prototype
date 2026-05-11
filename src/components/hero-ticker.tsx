// Hero ticker per Taylor's Figma comment (2026-05-07): "Scrolling
// ticker." Implemented as a CSS-only marquee. Two identical chip
// strips render side-by-side; the outer container animates from
// 0 to -50% so the second strip slides into the first's slot,
// looping seamlessly.
//
// Server-rendered: no client directive needed; pure CSS animation.

import type { ReactNode } from "react";

const tickerChips: { tone: TickerTone; text: string }[] = [
  { tone: "off-white", text: "Atlanta, GA · Oct 9-11 2026 · 100 guests" },
  { tone: "moss",      text: "Atlanta, GA · Oct 9-11 2026 · 100 guests" },
  { tone: "orchid",    text: "Atlanta, GA · Oct 9-11 2026 · 100 guests" },
  { tone: "amethyst",  text: "Atlanta, GA · Oct 9-11 2026 · 100 guests" },
  { tone: "oxide",     text: "Atlanta, GA · Oct 9-11 2026 · 100 guests" },
  { tone: "azure",     text: "Atlanta, GA · Oct 9-11 2026 · 100 guests" },
];

type TickerTone = "off-white" | "moss" | "orchid" | "amethyst" | "oxide" | "azure";

export function HeroTicker() {
  return (
    <div className="marquee-pause relative border-y border-off-white/20 overflow-hidden">
      <div className="flex w-max animate-marquee gap-5 px-5 py-4">
        {/* Two copies of the same strip back-to-back so the marquee
            translation looks continuous. aria-hidden on the duplicate
            so screen readers don't double-read. */}
        {tickerChips.map((chip, i) => (
          <Chip key={`a-${i}`} tone={chip.tone}>{chip.text}</Chip>
        ))}
        {tickerChips.map((chip, i) => (
          <Chip key={`b-${i}`} tone={chip.tone} aria-hidden>
            {chip.text}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  tone,
  children,
  ...rest
}: {
  tone: TickerTone;
  children: ReactNode;
  "aria-hidden"?: boolean;
}) {
  const styles: Record<TickerTone, string> = {
    "off-white": "bg-off-white/5 text-off-white",
    moss:        "bg-moss-100/5 text-moss-100",
    orchid:      "bg-orchid-100/5 text-orchid-100",
    amethyst:    "bg-amethyst-100/5 text-amethyst-100",
    oxide:       "bg-oxide-100/5 text-oxide-100",
    azure:       "bg-azure-100/5 text-azure-100",
  };
  return (
    <span
      {...rest}
      className={`shrink-0 rounded font-mono text-base italic ${styles[tone]} px-3 py-1.5`}
    >
      {children}
    </span>
  );
}
