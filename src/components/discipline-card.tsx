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
      // Card height comes from aspect-ratio so the card scales
      // proportionally at every viewport. The grid always shows at
      // least 2 columns, so cards stay narrow on phones and small
      // browser windows -- the taller 354:640 ratio there gives the
      // dark text panel enough room above the aspect-square graphic.
      // From lg+ (the 4-column desktop layout) we revert to the
      // 354:603 ratio Taylor specified in Figma.
      className="discipline-card group mx-auto w-full max-w-[400px] aspect-[354/490] min-[440px]:aspect-[354/680] lg:aspect-[354/603] [perspective:1500px]"
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
          {/* Title sits above body with a tight gap at narrow widths,
              where each card may only be ~170px wide in the 2-column
              grid. From lg+ (4-column desktop) we push title to top
              and body to bottom with justify-between to match Taylor's
              Figma, since the card is tall enough there to need it. */}
          <div className={`flex flex-1 min-h-0 flex-col gap-2 p-4 text-off-white md:gap-3 md:p-6 lg:justify-between ${textBg}`}>
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
            <p className="max-w-[28ch] font-serif text-[clamp(0.95rem,1vw+0.4rem,1.25rem)] leading-[1.35]">
              {back}
            </p>
          </div>
        </article>
      </button>
    </div>
  );
}
