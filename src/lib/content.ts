import speakersData from "@/content/speakers.json";
import scheduleData from "@/content/schedule.json";
import faqData from "@/content/faq.json";
import sponsorsData from "@/content/sponsors.json";
import committeeData from "@/content/committee.json";
import metaData from "@/content/meta.json";
import type { CommitteeMember, FaqEntry, Session, Speaker, Sponsor } from "@/types/content";

export const speakers = speakersData as readonly Speaker[];
export const schedule = scheduleData as readonly Session[];
export const faq = faqData as readonly FaqEntry[];
export const sponsors = sponsorsData as readonly Sponsor[];
export const committee = committeeData as readonly CommitteeMember[];
export const meta = metaData as {
  name: string;
  subtitle: string;
  edition: string;
  dates: { display: string; month: string; year: string };
  city: string;
  venue: string;
  capacity: number;
  fiscalSponsor: { name: string; short: string; href: string; blurb: string };
  mission: string;
  principles: { title: string; body: string }[];
  placeholderNote: string;
};

export function speakerBySlug(slug: string): Speaker | undefined {
  return speakers.find((s) => s.slug === slug);
}

export function sessionsForSpeaker(slug: string): Session[] {
  return schedule.filter((s) => s.speakerSlugs?.includes(slug));
}

export function speakerTagCloud(): string[] {
  const seen = new Set<string>();
  for (const s of speakers) for (const t of s.tags) seen.add(t);
  return Array.from(seen).sort();
}
