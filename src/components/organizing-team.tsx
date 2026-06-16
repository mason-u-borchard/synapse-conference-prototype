import Link from "next/link";
import type { ReactNode } from "react";

// Organizing team -- two stacked horizontal bio cards (Julia + Beth)
// per Taylor's 2026-06-15 Figma update (node 20:2285). Replaces the
// prior click-to-swap card pair; with only two people, the static
// stacked layout reads cleaner and removes the need for client state.
//
// Beth's photo was refreshed in the same Figma update; the new file
// lives at /figma/about-beth-2026-06-15.jpg.

type Member = {
  id: "julia" | "beth";
  name: string;
  image: string;
  role: ReactNode;
  bio: ReactNode;
  linkedIn: { url: string; handle: string };
};

const team: ReadonlyArray<Member> = [
  {
    id: "julia",
    name: "Julia Mossbridge, PhD",
    image: "/figma/about-julia-2026-06-15.jpg",
    role: (
      <>
        Neuroscientist / Founder
        <br aria-hidden="true" />
        Applied Love Labs &amp; American Electrodynamics Corp
      </>
    ),
    bio: (
      <>
        <p>
          Dr. Julia Mossbridge is an American cognitive neuroscientist, author and educator who works on understanding and training exceptional human performance including psi effects, notably on precognition and presentiment.
        </p>
        <p className="mt-4">
          She is a Senior Distinguished Fellow in Human Potential at the{" "}
          <BioLink href="https://www.fau.edu/future-mind/">
            Center for the Future of AI, Mind, and Society
          </BioLink>{" "}
          at Florida Atlantic University, Member of the{" "}
          <BioLink href="https://www.stimson.org/project/alfred-lee-loomis-innovation-council/">
            Loomis Innovation Council
          </BioLink>{" "}
          at the nonpartisan Stimson Center, and the Founder and Chief Science Officer of{" "}
          <BioLink href="https://americanelectrodynamics.com">
            American Electrodynamics Corp
          </BioLink>{" "}
          and the nonprofit{" "}
          <BioLink href="https://applied.love">Applied Love Labs</BioLink>.
        </p>
      </>
    ),
    linkedIn: { url: "https://www.linkedin.com/in/julia-mossbridge/", handle: "Julia Mossbridge" },
  },
  {
    id: "beth",
    name: "Beth Glick",
    image: "/figma/about-beth-2026-06-15.jpg",
    role: <>Consciousness researcher and field-builder</>,
    bio: (
      <>
        <p>
          Beth Glick is a researcher, strategist, and organizational designer. She co-founded ChangeCraft, where she spent twenty years advising philanthropies and nonprofits across challenges like atrocity prevention and human rights, helping direct millions of dollars toward the world's most pernicious problems.
        </p>
        <p className="mt-4">
          She brings that systems mindset to consciousness research — and to building the field itself. Her doctoral work investigates how exceptional human experiences reshape people's lives, and why they do so in radically different ways. She holds a master's degree from Harvard University.
        </p>
      </>
    ),
    linkedIn: { url: "https://www.linkedin.com/in/bethglick", handle: "Beth Glick" },
  },
];

export function OrganizingTeam() {
  return (
    <div className="mt-14 w-full max-w-[1328px] space-y-16 lg:space-y-20">
      {team.map((m) => (
        <article
          key={m.id}
          className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-[60px]"
        >
          <div className="relative w-full max-w-[400px] shrink-0 self-center overflow-hidden rounded-[20px] aspect-square lg:w-[400px]">
            <img
              src={m.image}
              alt={m.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex w-full flex-col gap-6 text-off-white lg:gap-7">
            <header className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Link
                  href={m.linkedIn.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[4px] bg-off-white/10 transition-colors hover:bg-off-white/20"
                >
                  <LinkedInIcon className="h-[22px] w-[22px] text-off-white" />
                </Link>
                <h3 className="font-serif text-[clamp(1.375rem,1vw+0.875rem,1.625rem)] leading-[1.15] text-off-white">
                  {m.name}
                </h3>
              </div>
              <p className="font-mono text-[clamp(0.9375rem,0.3vw+0.75rem,1.125rem)] leading-[1.4] text-off-white/80">
                {m.role}
              </p>
            </header>
            <div className="font-sans text-[clamp(1rem,0.4vw+0.75rem,1.25rem)] leading-[1.5] text-off-white">
              {m.bio}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function BioLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-oxide-100 underline decoration-oxide-100 underline-offset-4 transition-colors hover:text-oxide-200"
    >
      {children}
    </Link>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
