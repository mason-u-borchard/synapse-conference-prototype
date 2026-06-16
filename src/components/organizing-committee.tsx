import Link from "next/link";

// Organizing committee table per Taylor's 2026-06-15 Figma update
// (node 20:2285). Each row is one committee member: LinkedIn icon +
// name + "↗" indicator on the left, role on the right. Whole row is
// a click target on every screen; the gentle hover lift (oxide-tinted
// background + italic name) only shows up on hover-capable pointers.
//
// LinkedIn URLs sourced from the team Form Responses spreadsheet
// (synapse-claude/notes/Synapse Team List for Website - Form
// Responses 1.csv, last pulled 2026-06-15). Protocols normalized to
// https://www.linkedin.com/in/... and tracking query params stripped.
// Set linkedIn to `null` to render a row as plain text with a dimmed
// LinkedIn glyph -- useful while waiting on a new member's submission.

type Committee = {
  name: string;
  role: string;
  linkedIn: string | null;
};

const committee: ReadonlyArray<Committee> = [
  { name: "Allison Paradise", role: "Founder / CEO", linkedIn: "https://www.linkedin.com/in/allisoncparadise/" },
  { name: "Audubon Dougherty", role: "CX & AI Strategist", linkedIn: "https://www.linkedin.com/in/pazonada/" },
  { name: "Carole Griggs", role: "Researcher / Executive Coach", linkedIn: "https://www.linkedin.com/in/carole-griggs-ph-d-71404b28/" },
  { name: "Courtney Hayden", role: "Operations", linkedIn: "https://www.linkedin.com/in/courtneysh/" },
  { name: "Dani Caputi", role: "Independent Scholar", linkedIn: "https://www.linkedin.com/in/samantha-caputi-phd/" },
  { name: "Dominique Pearyer", role: "Data Engineer", linkedIn: "https://www.linkedin.com/in/dpearyer/" },
  { name: "Helané Wahbeh", role: "Director of Research", linkedIn: "https://www.linkedin.com/in/drwahbeh/" },
  { name: "Kay Blake", role: "Transformation Practitioner", linkedIn: "https://www.linkedin.com/in/kayjb/" },
  { name: "Kelly Woznicki", role: "AI Stewardship Leader / Founder", linkedIn: "https://www.linkedin.com/in/kellywoznicki/" },
  { name: "Mason Borchard", role: "Software Engineer / PhD Candidate", linkedIn: "https://www.linkedin.com/in/mason-u-b-12681888/" },
  { name: "Michael Krieger", role: "Psychiatrist", linkedIn: "https://www.linkedin.com/in/michael-krieger-28152b334/" },
  { name: "Morgan Mine", role: "Grad Student / Teaching Artist", linkedIn: "https://www.linkedin.com/in/morgan-mine-203b792a8/" },
  { name: "Sarah Withee", role: "Engineering Manager", linkedIn: "https://www.linkedin.com/in/sarahwithee/" },
  { name: "Sitara Taddeo", role: "Consciousness Studies", linkedIn: "https://www.linkedin.com/in/sitara-taddeo-818334b5/" },
  { name: "Taylor Dunham", role: "Founder / Head of Design", linkedIn: "https://www.linkedin.com/in/taylordunham/" },
];

export function OrganizingCommittee() {
  return (
    <div className="w-full max-w-[596px] overflow-hidden rounded-t-2xl border border-off-white/25 bg-transparent">
      <div className="rounded-t-2xl bg-oxide-100 px-4 py-4 text-center font-sans text-[1.125rem] font-semibold text-off-black">
        Organizing committee
      </div>
      <ul className="flex flex-col">
        {committee.map((m) => (
          <CommitteeRow key={m.name} member={m} />
        ))}
      </ul>
    </div>
  );
}

function CommitteeRow({ member }: { member: Committee }) {
  const interactive = member.linkedIn !== null;
  const content = (
    <div
      className={`grid w-full grid-cols-[1fr] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-stretch border-t border-off-white/25 transition-colors group-hover/row:bg-oxide-100/[0.05]`}
    >
      <div className="flex items-center gap-4 px-5 py-4 sm:border-r sm:border-off-white/25">
        <LinkedInGlyph dimmed={!interactive} />
        <div className="flex items-center gap-2">
          <span className="font-mono text-[1.0625rem] font-light text-off-white transition-[font-style] group-hover/row:italic">
            {member.name}
          </span>
          {interactive && (
            <span aria-hidden="true" className="text-off-white/70 transition-colors group-hover/row:text-oxide-100">
              ↗
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center px-5 py-4">
        <span className="font-sans text-[0.9375rem] font-light text-true-white/95">
          {member.role}
        </span>
      </div>
    </div>
  );

  if (!interactive) {
    return <li className="group/row block">{content}</li>;
  }
  return (
    <li className="group/row block">
      <Link
        href={member.linkedIn!}
        target="_blank"
        rel="noreferrer"
        aria-label={`${member.name} on LinkedIn`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-oxide-100"
      >
        {content}
      </Link>
    </li>
  );
}

function LinkedInGlyph({ dimmed }: { dimmed: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`h-[22px] w-[22px] shrink-0 ${dimmed ? "text-off-white/30" : "text-off-white"}`}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
