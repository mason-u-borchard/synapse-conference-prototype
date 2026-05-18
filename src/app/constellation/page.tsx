import type { Metadata } from "next";
import { ConstellationView } from "./constellation-view";

export const metadata: Metadata = {
  title: "Constellation",
  description:
    "A live map of how this year's speakers bridge AI, robotics, cognitive science, and consciousness. Hover or click a dot to see where each one belongs.",
  robots: { index: false, follow: false },
};

export default function ConstellationPage() {
  return <ConstellationView />;
}
