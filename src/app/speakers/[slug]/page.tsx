import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { speakers, speakerBySlug, sessionsForSpeaker } from "@/lib/content";
import { formatTimeRange } from "@/lib/dates";

interface PageProps { params: { slug: string }; }

export function generateStaticParams() {
  return speakers.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const speaker = speakerBySlug(params.slug);
  if (!speaker) return { title: "Speaker not found" };
  return {
    title: `${speaker.name} -- ${speaker.talkTitle}`,
    description: speaker.talkAbstract.slice(0, 200),
  };
}

export default function SpeakerPage({ params }: PageProps) {
  const speaker = speakerBySlug(params.slug);
  if (!speaker) notFound();

  const sessions = sessionsForSpeaker(speaker.slug);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: speaker.name,
    jobTitle: speaker.title,
    affiliation: speaker.affiliation,
    description: speaker.bio,
    knowsAbout: speaker.researchAreas,
  };

  return (
    <article className="container-gutter py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Link href="/speakers" className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-ink">
        <span aria-hidden="true">&larr;</span> All speakers
      </Link>
      <header className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          {speaker.keynote && (
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" /> Keynote
            </p>
          )}
          <h1 className="text-display-lg text-balance">{speaker.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{speaker.title} &middot; {speaker.affiliation}</p>
          {speaker.pronouns && <p className="mt-1 text-sm text-muted-foreground">{speaker.pronouns}</p>}
        </div>
        <ul className="flex flex-wrap gap-2">
          {speaker.tags.map((tag) => (
            <li key={tag} className="rounded-pill border border-border px-3 py-1 text-xs text-muted-foreground">{tag}</li>
          ))}
        </ul>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[2fr_1fr]">
        <div>
          <section className="paper p-8">
            <p className="eyebrow mb-3 text-muted-foreground">Talk</p>
            <h2 className="font-serif text-3xl tracking-tight text-pretty">&ldquo;{speaker.talkTitle}&rdquo;</h2>
            <p className="mt-6 text-pretty leading-relaxed text-ink">{speaker.talkAbstract}</p>
          </section>
          <section className="mt-8">
            <h2 className="eyebrow mb-4 text-muted-foreground">Biography</h2>
            <p className="max-w-prose text-pretty leading-relaxed text-ink">{speaker.bio}</p>
          </section>
        </div>

        <aside className="space-y-8">
          <section>
            <h2 className="eyebrow mb-3 text-muted-foreground">Appearing</h2>
            {sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Schedule details finalizing.</p>
            ) : (
              <ul className="space-y-3">
                {sessions.map((s) => (
                  <li key={s.id} className="paper p-4">
                    <p className="eyebrow text-muted-foreground">Day {s.day} &middot; {formatTimeRange(s.start, s.end)} &middot; {s.track}</p>
                    <p className="mt-1 font-serif text-lg text-ink">{s.title}</p>
                    {s.location && <p className="text-sm text-muted-foreground">{s.location}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="eyebrow mb-3 text-muted-foreground">Elsewhere</h2>
            <ul className="space-y-2 text-sm">
              {speaker.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex items-center gap-1.5 text-ink underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold" target="_blank" rel="noreferrer">
                    {l.label} <span aria-hidden="true">&nearr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  );
}
