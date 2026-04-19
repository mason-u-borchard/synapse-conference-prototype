import Link from "next/link";
import type { Session } from "@/types/content";
import { speakerBySlug } from "@/lib/content";
import { formatTimeRange } from "@/lib/dates";

export function ScheduleGlance({ items }: { items: readonly Session[] }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {items.map((session) => {
        const names = (session.speakerSlugs ?? [])
          .map((slug) => speakerBySlug(slug)?.name)
          .filter((n): n is string => Boolean(n));
        return (
          <li key={session.id} className="grid gap-3 py-5 md:grid-cols-[180px_1fr_140px] md:items-baseline md:gap-8">
            <span className="font-mono text-sm text-muted-foreground">{formatTimeRange(session.start, session.end)}</span>
            <div>
              <p className="font-serif text-xl text-pretty text-ink">{session.title}</p>
              {names.length > 0 && <p className="mt-1 text-sm text-muted-foreground">{names.join(", ")}</p>}
            </div>
            <span className="eyebrow text-muted-foreground md:text-right">{session.track}</span>
          </li>
        );
      })}
      <li className="py-5">
        <Link href="/schedule" className="text-sm text-ink underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold">
          Full schedule, two days, four tracks
        </Link>
      </li>
    </ol>
  );
}
