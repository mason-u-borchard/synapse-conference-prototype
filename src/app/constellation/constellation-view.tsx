"use client";

import { useState } from "react";
import Link from "next/link";
import { SpeakerConstellation } from "@/components/speaker-constellation";
import { speakers } from "@/lib/content";
import scholars from "@/content/scholars.json";
import type { Scholar } from "@/types/content";

export function ConstellationView() {
  const [view, setView] = useState<"speakers" | "scholars" | "both">("both");

  return (
    <main className="relative isolate bg-off-white -mt-[88px] pt-[88px]">
      <section className="container-gutter pt-20 pb-12 md:pt-28">
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-off-black/70">
          The constellation
        </p>
        <h1 className="mt-5 max-w-[24ch] font-serif text-[clamp(2.5rem,5vw+0.5rem,4rem)] leading-[1.05] text-off-black text-balance">
          The room, as a map.
        </h1>
        <div className="mt-8 max-w-[60ch] space-y-5 font-sans text-lg leading-[1.55] text-off-black">
          <p className="text-pretty">
            Each dot is a speaker. Each line is one of the four fields their research touches. Speakers whose work sits across two or three fields settle between them.
          </p>
          <p className="text-pretty">
            Filled dots are 2026 speakers (placeholders until the roster confirms). Hollow rings are scholars whose published work bridges the four fields.
          </p>
          <p className="text-pretty">
            The layout isn&rsquo;t drawn by hand. It&rsquo;s a force simulation &mdash; springs pulling speakers toward the fields they belong to, repulsion keeping them legible. Where they come to rest is where the conversation actually lives.
          </p>
        </div>
      </section>

      <section className="container-gutter pb-16">
        <div
          role="tablist"
          aria-label="Show"
          className="mb-6 inline-flex rounded-full border border-off-black/20 p-1 text-xs font-mono uppercase tracking-[0.16em]"
        >
          {(["speakers", "scholars", "both"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-1 transition-colors ${
                view === v
                  ? "bg-off-black text-off-white"
                  : "text-off-black/65 hover:text-off-black"
              }`}
            >
              {v[0]!.toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        <SpeakerConstellation
          speakers={view === "scholars" ? [] : speakers}
          scholars={(view === "speakers" ? [] : scholars) as readonly Scholar[]}
        />
      </section>

      <section className="container-gutter pb-24 md:pb-section">
        <div className="mx-auto max-w-[60ch] border-t border-off-black/15 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-off-black/70">
            A note on the data
          </p>
          <p className="mt-4 font-sans text-base leading-[1.6] text-off-black/85 text-pretty">
            The roster is still being finalized by the committee. Names you see here are placeholders mapped to real research areas drawn from the program arc &mdash; once invitations are confirmed, the map updates automatically.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex h-[44px] items-center btn-outline-glow rounded-full border border-off-black/70 px-5 font-noto text-base font-semibold text-off-black transition-colors hover:bg-off-black/5"
            >
              Back to About
            </Link>
            <Link
              href="/attend"
              className="inline-flex h-[44px] items-center btn-solid-glow rounded-full bg-oxide-100 px-5 font-noto text-base font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Apply to attend
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
