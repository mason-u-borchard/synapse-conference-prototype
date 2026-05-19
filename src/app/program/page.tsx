import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Program",
  robots: { index: false, follow: false },
};

// /program is intentionally not live yet. Nav still shows "Program"
// with a "Coming soon!" chip but the label is rendered as plain text;
// any direct URL hit falls through to the 404 page until the program
// is published.
export default function ProgramPage() {
  notFound();
}
