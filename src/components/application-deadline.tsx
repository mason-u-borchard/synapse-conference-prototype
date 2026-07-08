// _Last updated: 2026-07-08_
"use client";

import { useEffect, useState } from "react";

// Deadline treatment used in the /apply, home, and /attend heroes. The
// date label is the anchor and renders on the server; the live day-count
// reveals only after mount, so there is never a server/client hydration
// mismatch on the number. The window auto-closes itself -- once the date
// passes, it reads "Applications closed" without any code change.
//
// Two variants:
//   plate   -- the full bordered chip (/apply, on the page surface)
//   minimal -- a clean eyebrow + the date in the brand's warm accent,
//              for the marketing heroes where the boxed chip is too much
//
// Three tones, because the heroes it sits in are fixed regardless of the
// site theme:
//   surface -- /apply, theme-driven page surface (light or dark)
//   onDark  -- home hero, always the deep amethyst backdrop
//   onLight -- /attend hero, always the off-white backdrop
// Each tone is a flat class map so a tone never leans on a semantic token
// that would flip out from under its fixed-tone background.
const CLOSE_ISO = "2026-07-22T23:59:59-07:00"; // Pacific end-of-day
const CLOSE_LABEL = "July 22, 2026";

type Tone = "surface" | "onDark" | "onLight";
type Variant = "plate" | "minimal";

const TONES: Record<
  Tone,
  {
    root: string;
    hover: string;
    spine: string;
    dotCore: string;
    dotHalo: string;
    dotClosed: string;
    eyebrow: string;
    date: string;
    accent: string; // the "important text" color -- the brand's warm yellow
    divider: string;
    number: string;
    caption: string;
  }
> = {
  surface: {
    root: "border-border/70 bg-surface-raised/70 shadow-paper backdrop-blur-sm",
    hover: "hover:border-border-strong",
    spine: "from-oxide-100 via-gold to-orchid-200",
    dotCore: "bg-oxide-200",
    dotHalo: "bg-oxide-200/50",
    dotClosed: "bg-neutral-300",
    eyebrow: "text-muted-foreground",
    date: "text-ink",
    accent: "text-oxide-200",
    divider: "border-border/70",
    number: "text-oxide-200",
    caption: "text-muted-foreground",
  },
  onDark: {
    root: "border-off-white/20 bg-off-white/[0.06] shadow-[0_18px_44px_-26px_rgba(0,0,0,0.7)] backdrop-blur-sm",
    hover: "hover:border-off-white/40",
    spine: "from-oxide-100 via-gold to-orchid-100",
    dotCore: "bg-oxide-100",
    dotHalo: "bg-oxide-100/60",
    dotClosed: "bg-off-white/40",
    eyebrow: "text-off-white/70",
    date: "text-off-white",
    accent: "text-oxide-100",
    divider: "border-off-white/20",
    number: "text-oxide-100",
    caption: "text-off-white/60",
  },
  onLight: {
    root: "border-neutral-200 bg-off-black/[0.04] shadow-paper",
    hover: "hover:border-neutral-300",
    spine: "from-oxide-100 via-gold to-orchid-200",
    dotCore: "bg-oxide-200",
    dotHalo: "bg-oxide-200/50",
    dotClosed: "bg-neutral-300",
    eyebrow: "text-neutral-300",
    date: "text-off-black",
    accent: "text-oxide-200",
    divider: "border-neutral-200",
    number: "text-oxide-200",
    caption: "text-neutral-300",
  },
};

export function ApplicationDeadline({
  tone = "surface",
  variant = "plate",
}: {
  tone?: Tone;
  variant?: Variant;
}) {
  // null until mounted -> avoids hydrating a stale build-time number.
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntil(CLOSE_ISO)), []);

  const t = TONES[tone];
  const open = days === null || days > 0;

  // Small live status dot: a slow ping halo around a solid core; goes
  // quiet (neutral, no halo) once the window has closed. Shared by both
  // variants.
  const dot = (
    <span className="relative flex h-2 w-2" aria-hidden>
      {open && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${t.dotHalo}`}
        />
      )}
      <span
        className={`relative inline-flex h-2 w-2 rounded-full ${
          open ? t.dotCore : t.dotClosed
        }`}
      />
    </span>
  );

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-3">
        {dot}
        <div className="leading-tight">
          <p
            className={`font-mono text-[0.8rem] font-semibold uppercase tracking-[0.18em] ${t.eyebrow}`}
          >
            {open ? "Applications close" : "Applications closed"}
          </p>
          <p className="mt-1 flex items-baseline gap-2.5">
            {/* The date is the important text -- set in the brand's warm
                accent so it pops out of the hero. */}
            <span
              className={`font-serif text-[clamp(1.5rem,1.2vw+1.05rem,2rem)] tracking-tight tabular-nums ${t.accent}`}
            >
              {CLOSE_LABEL}
            </span>
            {days !== null && days > 0 && (
              <span
                className={`animate-fade-up font-mono text-[0.78rem] font-semibold uppercase tracking-[0.12em] tabular-nums ${t.caption}`}
              >
                {days === 1 ? "1 day left" : `${days} days left`}
              </span>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative inline-flex items-stretch gap-5 overflow-hidden rounded-2xl border py-3.5 pl-6 pr-7 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-0.5 ${t.root} ${t.hover}`}
    >
      {/* Warm accent spine -- the one hit of color that pulls the eye. */}
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${t.spine}`}
      />

      <div className="flex items-center gap-3.5">
        {dot}
        <div className="leading-none">
          <p
            className={`font-mono text-[0.62rem] uppercase tracking-[0.22em] ${t.eyebrow}`}
          >
            {open ? "Applications close" : "Applications closed"}
          </p>
          <p
            className={`mt-1.5 font-serif text-2xl tracking-tight tabular-nums ${t.date}`}
          >
            {CLOSE_LABEL}
          </p>
        </div>
      </div>

      {/* Countdown -- appears after mount with a soft fade so there's no
          hydration flash. This large tabular numeral is the memorable beat. */}
      {days !== null && (
        <div
          className={`flex animate-fade-up items-center border-l pl-5 ${t.divider}`}
        >
          <div className="text-center leading-none">
            <p
              className={`font-serif text-3xl font-medium tabular-nums ${t.number}`}
            >
              {days > 0 ? days : days === 0 ? "0" : "—"}
            </p>
            <p
              className={`mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] ${t.caption}`}
            >
              {days > 1
                ? "days left"
                : days === 1
                  ? "day left"
                  : days === 0
                    ? "closes today"
                    : "window closed"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function daysUntil(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}
