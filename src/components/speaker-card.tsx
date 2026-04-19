import Link from "next/link";
import type { Speaker } from "@/types/content";
import { cx } from "@/lib/cx";

interface Props { speaker: Speaker; featured?: boolean; }

export function SpeakerCard({ speaker, featured = false }: Props) {
  return (
    <Link
      href={`/speakers/${speaker.slug}`}
      className={cx(
        "group paper relative flex flex-col overflow-hidden p-6 transition-transform hover:-translate-y-0.5",
        featured && "md:p-8",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <SpeakerGlyph initials={speaker.headshotInitial} seed={speaker.researchAreas.join("|")} />
        {speaker.keynote && (
          <span className="eyebrow rounded-pill border border-border-strong px-2.5 py-1">Keynote</span>
        )}
      </div>
      <div className="mt-6">
        <p className="eyebrow mb-2 text-muted-foreground">{speaker.affiliation}</p>
        <h3 className="font-serif text-2xl tracking-tight text-ink">{speaker.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{speaker.title}</p>
      </div>
      <p className="mt-5 text-pretty font-serif text-lg italic leading-snug text-ink">&ldquo;{speaker.talkTitle}&rdquo;</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {speaker.tags.slice(0, 3).map((tag) => (
          <li key={tag} className="rounded-pill border border-border px-2.5 py-1 text-xs text-muted-foreground">{tag}</li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink underline decoration-gold/50 decoration-2 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-gold">
        Read bio &amp; abstract
      </span>
    </Link>
  );
}

function SpeakerGlyph({ initials, seed }: { initials: string; seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const hue = Math.abs(h) % 360;
  return (
    <div
      className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-card border border-border-strong"
      style={{
        background: `conic-gradient(from ${hue}deg, hsl(var(--synapse-plum)) 0deg, hsl(var(--synapse-magenta)) 90deg, hsl(var(--gold)) 180deg, hsl(var(--synapse-cyan)) 270deg, hsl(var(--synapse-plum)) 360deg)`,
      }}
    >
      <div className="absolute inset-1 rounded-[10px] bg-surface-raised" />
      <span className="relative font-serif text-2xl italic text-ink">{initials}</span>
    </div>
  );
}
