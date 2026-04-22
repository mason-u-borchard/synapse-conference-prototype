import Link from "next/link";
import type { Speaker } from "@/types/content";

interface Props { speaker: Speaker; featured?: boolean; }

// Deliberately quiet card. The committee's ethos leans toward
// conversation rather than headliner display, so we drop the glyph,
// the italic talk-title pull-quote, the 'Keynote' badge, and the
// 'Read bio & abstract' CTA. The card stays clickable so anyone
// who wants the detail page still has a path; the click is just not
// an advertisement.
export function SpeakerCard({ speaker }: Props) {
  return (
    <Link
      href={`/speakers/${speaker.slug}`}
      className="group paper flex flex-col gap-3 p-6 transition-colors hover:border-border-strong"
    >
      <p className="eyebrow text-muted-foreground">{speaker.affiliation}</p>
      <h3 className="font-serif text-xl tracking-tight text-ink group-hover:underline decoration-gold-deep decoration-2 underline-offset-4">
        {speaker.name}
      </h3>
      <p className="text-sm text-muted-foreground">{speaker.title}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {speaker.tags.slice(0, 3).map((tag) => (
          <li key={tag} className="rounded-pill border border-border px-2.5 py-1 text-xs text-muted-foreground">
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
