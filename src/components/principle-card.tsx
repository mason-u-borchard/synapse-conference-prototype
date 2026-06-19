"use client";

import { useState } from "react";

interface Props {
  n: string;
  title: string;
  body: string;
  bg: string;
  photo: string;
  logo: string;
}

// One ethos principle tile. Per Taylor's 2026-06-08 audit (Figma 40:724):
// - The photo IS the default state with the unique per-card pattern
//   logo centered on it (Figma 56:2993 for the top-left).
// - Desktop hover or any-platform click flips to the colored text side.
// - Back-face typography mirrors Figma 40:758: JetBrains Mono Light
//   eyebrow, Inter Semi-Bold title, Inter Regular body.
// - mix-blend-lighten lets the white logo petals sit cleanly over the
//   photo without the source PNG's dark background blocking it.
export function PrincipleCard({ n, title, body, bg, photo, logo }: Props) {
  const [flipped, setFlipped] = useState(false);
  const showBack = flipped;

  return (
    <li className="group h-[246px] [perspective:1200px] md:h-[293px]">
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${title}. Tap to ${flipped ? "see image" : "read"}`}
        className="relative block h-full w-full text-left"
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]"
          style={{
            transformStyle: "preserve-3d",
            transform: showBack ? "rotateY(180deg)" : undefined,
          }}
        >
          {/* Front: photo + centered unique pattern logo */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_2px_6px_-3px_rgba(0,0,0,0.18)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={photo}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[95px] w-[95px] -translate-x-1/2 -translate-y-1/2 mix-blend-lighten md:h-[112px] md:w-[112px]"
              loading="lazy"
            />
          </div>
          {/* Back: solid color + principle text (typography per Figma 40:758) */}
          <div
            className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl px-8 pt-6 pb-7 text-off-white shadow-[0_2px_6px_-3px_rgba(0,0,0,0.18)] ${bg}`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-base font-light uppercase tracking-[0.3em]">{n}</span>
              <h3 className="font-sans text-[26px] font-semibold leading-[1.2]">{title}</h3>
            </div>
            <p className="font-sans text-base font-normal leading-[1.4]">{body}</p>
          </div>
        </div>
      </button>
    </li>
  );
}
