"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Session, Speaker, Track } from "@/types/content";
import { formatTimeRange, minutesBetween } from "@/lib/dates";
import { cx } from "@/lib/cx";

const TRACKS: readonly Track[] = ["Plenary", "Foundations", "Machines", "Frontiers", "Community"];

export function ScheduleExplorer({ sessions, speakers }: { sessions: readonly Session[]; speakers: readonly Speaker[] }) {
  const [day, setDay] = useState<1 | 2 | 3>(1);
  const [trackFilter, setTrackFilter] = useState<Track | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const daySessions = useMemo(() => sessions.filter((s) => s.day === day), [sessions, day]);

  const trackCounts = useMemo(() => {
    const counts: Record<Track, number> = { Plenary: 0, Foundations: 0, Machines: 0, Frontiers: 0, Community: 0 };
    for (const s of daySessions) counts[s.track]++;
    return counts;
  }, [daySessions]);

  const filtered = useMemo(
    () => (trackFilter === "all" ? daySessions : daySessions.filter((s) => s.track === trackFilter)),
    [daySessions, trackFilter],
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <div role="tablist" aria-label="Day" className="inline-flex rounded-pill border border-border p-0.5 text-sm">
          {([1, 2, 3] as const).map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={day === d}
              onClick={() => setDay(d)}
              className={cx("rounded-pill px-4 py-1.5 transition-colors", day === d ? "bg-ink text-surface" : "text-muted-foreground hover:text-ink")}
            >Day {d}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2 text-muted-foreground">Track</span>
          <TrackPill label="All" active={trackFilter === "all"} onClick={() => setTrackFilter("all")} />
          {TRACKS.map((t) => (
            <TrackPill key={t} label={`${t} (${trackCounts[t]})`} active={trackFilter === t} onClick={() => setTrackFilter(t)} />
          ))}
        </div>
      </div>

      <ol className="mt-2">
        {filtered.map((session) => {
          const presenters = (session.speakerSlugs ?? [])
            .map((slug) => speakers.find((s) => s.slug === slug))
            .filter((s): s is Speaker => Boolean(s));
          const duration = minutesBetween(session.start, session.end);
          const isBreak = session.kind === "break" || session.kind === "social";
          const isOpen = expanded === session.id;
          return (
            <li
              key={session.id}
              id={session.id}
              className={cx(
                "group relative grid gap-4 border-b border-border py-6 md:grid-cols-[140px_1fr_140px] md:items-baseline md:gap-8",
                isBreak && "opacity-80",
              )}
            >
              <div className="font-mono text-sm text-muted-foreground">
                <div className="text-ink">{formatTimeRange(session.start, session.end)}</div>
                <div className="mt-1 text-xs">{duration} min</div>
              </div>
              <div>
                <p className="eyebrow mb-2 flex items-center gap-2 text-muted-foreground">
                  <TrackDot track={session.track} />
                  <span>{session.track}</span>
                  <span>&middot;</span>
                  <span className="uppercase">{session.kind}</span>
                  {session.location && (
                    <><span>&middot;</span><span>{session.location}</span></>
                  )}
                </p>
                <p className="font-serif text-xl text-pretty text-ink md:text-2xl">{session.title}</p>
                {presenters.length > 0 && (
                  <p className="mt-2 text-sm">
                    {presenters.map((p, i) => (
                      <span key={p.slug}>
                        <Link href={`/speakers/${p.slug}`} className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">
                          {p.name}
                        </Link>
                        {i < presenters.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}
                {session.summary && isOpen && (
                  <p className="mt-3 max-w-prose text-pretty text-muted-foreground">{session.summary}</p>
                )}
                {presenters.length === 1 && isOpen && (
                  <p className="mt-3 max-w-prose text-pretty text-muted-foreground">{presenters[0]!.talkAbstract}</p>
                )}
              </div>
              <div className="md:text-right">
                {(session.summary || presenters.length === 1) && (
                  <button
                    type="button"
                    className="eyebrow inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-ink"
                    onClick={() => setExpanded((id) => (id === session.id ? null : session.id))}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Collapse" : "Read more"}
                    <span className={cx("transition-transform", isOpen && "rotate-45")}>+</span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function TrackPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

function TrackDot({ track }: { track: Track }) {
  const colors: Record<Track, string> = {
    Plenary: "bg-aubergine-800",
    Foundations: "bg-synapse-cyan",
    Machines: "bg-gold",
    Frontiers: "bg-synapse-magenta",
    Community: "bg-aubergine-400",
  };
  return <span className={cx("inline-block h-1.5 w-1.5 rounded-full", colors[track])} aria-hidden="true" />;
}
