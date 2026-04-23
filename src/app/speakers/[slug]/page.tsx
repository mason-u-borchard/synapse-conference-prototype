import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Participant not found",
};

// Individual participant pages are hidden until the committee finalizes
// invitations. Any /speakers/<slug> hit falls through to 404, which
// renders the friendly not-found page.
export default function SpeakerPage() {
  notFound();
}
