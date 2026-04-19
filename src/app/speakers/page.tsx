import type { Metadata } from "next";
import { speakers, speakerTagCloud } from "@/lib/content";
import { SpeakersExplorer } from "@/components/speakers-explorer";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Six scholars in consciousness studies, cognitive neuroscience, philosophy of mind, and AI alignment. Full abstracts included.",
};

export default function SpeakersPage() {
  const allTags = speakerTagCloud();
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">The roster</p>
        <h1 className="text-display-lg text-balance">Twenty researchers, one working conversation.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Speakers are numbered (Speaker 1 through Speaker 20) as placeholders
          while the committee finalizes invitations. Filter by topic, or
          explore the constellation to see how research areas overlap.
        </p>
      </header>
      <SpeakersExplorer speakers={speakers} allTags={allTags} />
    </div>
  );
}
