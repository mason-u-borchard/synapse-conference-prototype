// "Who it's for" section -- Section 07 of Kelly's approved Website
// Copy doc. List copied close-to-verbatim.
const audience = [
  "Women leading research labs, companies, and movements",
  "Early-career scholars seeking real mentorship and collaborators",
  "Practitioners bridging science, embodiment, and technology",
  "Allies, funders, and partners committed to the mission",
  "Artists, facilitators, and somatic practitioners shaping the experience",
];

export function WhoItsFor() {
  return (
    <>
      <p className="max-w-prose text-pretty text-muted-foreground">
        This room is for women working where the disciplines don't have
        names yet -- and for those committed enough to stand with them.
        Researchers and builders. Scholars and practitioners. Early-career
        and established. The common thread: the desire to build what's
        next exceeds the comfort of what already exists.
      </p>
      <ul className="mt-8 grid gap-3 text-sm md:grid-cols-2">
        {audience.map((entry) => (
          <li key={entry} className="paper flex items-start gap-3 p-4">
            <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span className="text-pretty text-ink">{entry}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
