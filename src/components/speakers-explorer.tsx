"use client";

import { useMemo, useState } from "react";
import type { Speaker } from "@/types/content";
import { SpeakerCard } from "@/components/speaker-card";
import { SpeakerConstellation } from "@/components/speaker-constellation";
import { cx } from "@/lib/cx";

type View = "grid" | "constellation";

export function SpeakersExplorer({ speakers, allTags }: { speakers: readonly Speaker[]; allTags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [view, setView] = useState<View>("grid");

  const filtered = useMemo(() => {
    if (!activeTag) return speakers;
    return speakers.filter((s) => s.tags.includes(activeTag));
  }, [speakers, activeTag]);

  return (
    <>
      <div className="mt-10 flex flex-col gap-5 border-y border-border py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2 text-muted-foreground">Filter</span>
          <TagButton label="All" active={activeTag === null} onClick={() => setActiveTag(null)} />
          {allTags.map((tag) => (
            <TagButton key={tag} label={tag} active={tag === activeTag} onClick={() => setActiveTag((t) => (t === tag ? null : tag))} />
          ))}
        </div>
        <div role="tablist" aria-label="View" className="inline-flex self-start rounded-pill border border-border p-0.5 text-xs md:self-auto">
          <ViewTab label="Grid" value="grid" active={view === "grid"} onClick={setView} />
          <ViewTab label="Constellation" value="constellation" active={view === "constellation"} onClick={setView} />
        </div>
      </div>

      {view === "grid" ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((speaker) => <SpeakerCard key={speaker.slug} speaker={speaker} />)}
        </div>
      ) : (
        <div className="mt-10"><SpeakerConstellation speakers={speakers} activeTag={activeTag} /></div>
      )}
    </>
  );
}

function TagButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-pill border px-3 py-1 text-xs transition-colors",
        active ? "border-ink bg-ink text-surface" : "border-border text-muted-foreground hover:border-border-strong hover:text-ink",
      )}
    >{label}</button>
  );
}

function ViewTab({ label, value, active, onClick }: { label: string; value: View; active: boolean; onClick: (v: View) => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onClick(value)}
      className={cx("rounded-pill px-3 py-1 transition-colors", active ? "bg-ink text-surface" : "text-muted-foreground hover:text-ink")}
    >{label}</button>
  );
}
