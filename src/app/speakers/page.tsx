import type { Metadata } from "next";
import { speakers, speakerTagCloud } from "@/lib/content";
import { SpeakersExplorer } from "@/components/speakers-explorer";

export const metadata: Metadata = {
  title: "Participants",
  description: "A list of invited participants and a visual map of how their research areas overlap. Twenty numbered placeholders while the committee finalizes the roster.",
};

export default function SpeakersPage() {
  const allTags = speakerTagCloud();
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Participants</p>
        <h1 className="text-display-lg text-balance">Every person in the room is here on purpose.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The Synapse is built around conversation, not broadcast.
          Participants are numbered placeholders (Participant 1 through
          Participant 20) while the committee finalizes invitations. The
          constellation view shows how their research areas overlap; it
          is a map of the conversation, not a ranking.
        </p>
      </header>
      <SpeakersExplorer speakers={speakers} allTags={allTags} />
    </div>
  );
}
