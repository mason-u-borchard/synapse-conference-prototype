import type { Metadata } from "next";
import Link from "next/link";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Participants",
  description: "The roster of participants will be published once the committee finalizes invitations.",
};

export default function SpeakersPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Participants</p>
        <h1 className="text-display-lg text-balance">Every person in the room is here on purpose.</h1>
        <div className="mt-6 max-w-prose space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
          <p>
            Approximately {meta.capacity} participants will convene in
            {" "}{meta.city} across the three days. Who leads a session,
            facilitates, performs, or contributes in other ways is being
            shaped by the committee as the program arc is designed -- the
            Synapse deliberately does not divide the room into keynote
            and attendee tiers.
          </p>
          <p>
            Invitations are still being finalized; the roster will be
            published here soon. If you would like to be notified when
            the application window opens, leave your details on the{" "}
            <Link href="/register" className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">
              Attend
            </Link>{" "}
            page.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/register" className="btn btn-primary">Keep me in the loop</Link>
          <Link href="/schedule" className="btn btn-ghost">The program arc</Link>
          <Link href="/about" className="btn btn-ghost">Who it's for</Link>
        </div>
      </header>
    </div>
  );
}
