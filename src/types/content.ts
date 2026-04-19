export type ResearchArea =
  | "consciousness studies"
  | "cognitive neuroscience"
  | "AI alignment"
  | "philosophy of mind"
  | "quantum cognition"
  | "contemplative neuroscience"
  | "computational psychiatry"
  | "affective computing"
  | "active inference"
  | "embodied cognition"
  | "psychedelic science"
  | "cognitive architecture"
  | "memory research"
  | "attention research"
  | "phenomenology";

export interface Speaker {
  slug: string;
  name: string;
  pronouns?: string;
  title: string;
  affiliation: string;
  city: string;
  researchAreas: ResearchArea[];
  headshotInitial: string;
  talkTitle: string;
  talkAbstract: string;
  bio: string;
  links: { label: string; href: string }[];
  tags: string[];
  keynote?: boolean;
}

export type Track =
  | "Plenary"
  | "Foundations"
  | "Machines"
  | "Frontiers"
  | "Community";

export interface Session {
  id: string;
  day: 1 | 2;
  start: string;
  end: string;
  track: Track;
  title: string;
  summary?: string;
  kind: "keynote" | "talk" | "panel" | "workshop" | "break" | "social";
  speakerSlugs?: string[];
  location?: string;
}

export interface Sponsor {
  name: string;
  tier: "presenting" | "supporting" | "community";
  blurb: string;
  href: string;
  initials: string;
}

export interface CommitteeMember {
  name: string;
  role: string;
  affiliation: string;
  focus: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: "registration" | "travel" | "access" | "submissions" | "conduct" | "program";
}
