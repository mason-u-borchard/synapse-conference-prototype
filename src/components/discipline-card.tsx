"use client";

import { useState } from "react";

// Discipline card per Taylor's Figma comments (2026-05-07):
// - Desktop hover: title floats up, subtitle stays, everything grows
//   (handled in globals.css via .discipline-card / .discipline-card-title)
// - Click (desktop) / tap (mobile): flips to reveal a quote on the back.
// CSS-only flip via two absolute-positioned faces with backface-hidden
// inside a perspective-d container. State lives here so we can also
// flip on Enter/Space for keyboard users.

export function DisciplineCard({
  title,
  body,
  back,
  backImage,
  textBg,
  graphicBg,
  graphic,
}: {
  title: string;
  body: string;
  back: string;
  backImage: string;
  textBg: string;
  graphicBg: string;
  graphic: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      // Card height comes from aspect-ratio (354:603 per Figma) so the
      // card scales proportionally at every viewport instead of locking
      // a 603px height that breaks at narrow / zoomed widths.
      className="discipline-card group mx-auto w-full max-w-[400px] aspect-[354/603] [perspective:1500px]"
      onMouseEnter={undefined}
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${title} card. Click to ${flipped ? "see the front" : "reveal a quote"}.`}
        onClick={() => setFlipped((v) => !v)}
        className="relative block h-full w-full text-left [transform-style:preserve-3d] transition-transform duration-700 ease-out"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front face. Inner split: graphic panel is a square at the
            bottom of the card (aspect-square), text panel takes
            whatever's left up top via flex-1. Both heights flex with
            the card's overall aspect-ratio so things scale together. */}
        <article className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl [backface-visibility:hidden]">
          <div className={`flex flex-1 min-h-0 flex-col justify-between gap-3 p-6 text-off-white ${textBg}`}>
            <h3 className="discipline-card-title font-sans text-[clamp(1.25rem,2vw+0.5rem,1.625rem)] font-semibold leading-[1.2]">
              {title}
            </h3>
            <p className="font-sans text-[clamp(0.875rem,1vw+0.25rem,1rem)] leading-[1.4]">{body}</p>
          </div>
          <div className={`relative flex aspect-square w-full items-center justify-center ${graphicBg}`}>
            <img
              src={graphic}
              alt=""
              className="h-[92%] w-[92%] object-contain"
              aria-hidden="true"
            />
          </div>
        </article>

        {/* Back face -- photo at the top, quote on a dark surface
            below. Matches Taylor's Figma "Card Back" treatment from
            screenshot 2026-05-07 22:45. */}
        <article
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl text-off-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${textBg}`}
        >
          {/* Photo panel: aspect-square, mirrors the front graphic
              panel ratio so flipping doesn't change layout proportions. */}
          <div className="relative aspect-square w-full overflow-hidden">
            <img
              src={backImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Soft fade from the photo into the dark text panel below. */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              aria-hidden="true"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
              }}
            />
          </div>
          <div className="flex flex-1 min-h-0 flex-col items-center justify-center px-6 py-6 text-center">
            <p className="max-w-[28ch] font-serif text-[clamp(0.95rem,1vw+0.4rem,1.25rem)] leading-[1.35] italic">
              "{back}"
            </p>
            <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-off-white/60">
              Tap to flip back
            </span>
          </div>
        </article>
      </button>
    </div>
  );
}
