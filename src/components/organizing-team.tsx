"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";

// The Organizing Team section per Taylor's Figma (Figma 20:1764).
// On click, the active card grows in place and that person's bio
// renders below the cards. Inactive cards stay in their original
// positions and shrink. Default active person is Julia.
//
// Bios pulled from synapse-screenshots/about/organizer_bios.md.
// Highlighted spans below are organizations Mason wants linked out
// per the Figma's orange-link treatment.
//
// Elatia Abate stepped off the committee on 2026-06-03 and her entry
// has been removed; the layout is now a two-card row instead of three.

type Member = {
  id: "julia" | "beth";
  name: string;
  shortName: string;
  image: string;
  role: ReactNode;
  bio: ReactNode;
  linkedIn: { url: string; handle: string };
};

const team: ReadonlyArray<Member> = [
  {
    id: "julia",
    name: "Julia Mossbridge, PhD",
    shortName: "Julia Mossbridge, PhD",
    image: "/figma/julia.jpg",
    // One-line role per Figma 20:1815.
    role: <>Neuroscientist / Founder, Applied Love Labs</>,
    bio: (
      <>
        Dr. Julia Mossbridge is an American cognitive neuroscientist, author and educator who works on understanding and training exceptional human performance including psi effects, notably on precognition and presentiment. She is a Senior Distinguished Fellow in Human Potential at the{" "}
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
        <BioLink href="https://applied.love">
          TILT: The Institute for Love and Time
        </BioLink>
        .
      </>
    ),
    linkedIn: { url: "https://www.linkedin.com/in/julia-mossbridge/", handle: "Julia Mossbridge" },
  },
  {
    id: "beth",
    name: "Beth Glick",
    shortName: "Beth Glick",
    image: "/figma/home-beth.png",
    role: <>Consciousness researcher and field-builder</>,
    bio: (
      <>
        Beth Glick is a researcher, strategist, and organizational designer. She co-founded ChangeCraft, where she spent twenty years advising philanthropies and nonprofits across challenges like atrocity prevention and human rights, helping direct millions of dollars toward the world's most pernicious problems. She brings that systems mindset to consciousness research — and to building the field itself. Her doctoral work investigates how exceptional human experiences reshape people's lives, and why they do so in radically different ways. She holds a master's degree from Harvard University.
      </>
    ),
    linkedIn: { url: "https://www.linkedin.com/in/bethglick", handle: "Beth Glick" },
  },
];

export function OrganizingTeam() {
  const [activeId, setActiveId] = useState<Member["id"]>("julia");
  const active = team.find((m) => m.id === activeId) ?? team[0]!;

  return (
    <>
      {/* Two cards in a row, vertically centered. Both render at the
          same size now (Mason 06-04) -- the prior active/inactive size
          split made sense with three cards but read as lopsided once
          Elatia stepped off. Click still swaps which bio renders
          below; the active card carries a thin oxide ring for feedback
          instead of being scaled larger. On mobile (<sm) the row stays
          a snap-scroll carousel; from sm up it's a centered two-up
          flex row. */}
      <div className="mt-12 w-full max-w-[1328px] overflow-x-auto sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-center gap-4 snap-x snap-mandatory sm:w-full sm:max-w-[1328px] sm:justify-center sm:gap-6 sm:snap-none">
        {team.map((m) => {
          const isActive = m.id === activeId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveId(m.id)}
              aria-pressed={isActive}
              aria-label={`${m.name} bio`}
              className={`group relative shrink-0 snap-center overflow-hidden rounded-[20px] transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-oxide-100 focus:ring-offset-2 focus:ring-offset-moss-300 sm:snap-none w-[min(72vw,360px)] sm:w-[clamp(280px,32vw,440px)] aspect-square ${
                isActive ? "ring-2 ring-oxide-100/80 ring-offset-2 ring-offset-moss-300" : ""
              }`}
            >
              <img
                src={m.image}
                alt={m.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Gradient bottom -> off-black so the name reads cleanly. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(4,16,17,0) 0%, rgba(4,16,17,0.84) 84%, hsl(var(--moss-400)) 100%)",
                }}
              />
              <p className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center font-serif text-off-white text-[clamp(1.125rem,1.2vw+0.5rem,1.625rem)]">
                {m.name}
              </p>
            </button>
          );
        })}
        </div>
      </div>

      {/* Active person's bio. Role + body + LinkedIn pill, all centered.
          Role uses JetBrains Mono in mixed case at 20px per Figma 20:1815. */}
      <div className="mt-12 max-w-[751px] text-center">
        <p className="font-mono text-[clamp(1rem,0.4vw+0.75rem,1.25rem)] leading-[1.4]">
          {active.role}
        </p>
        <p className="mt-4 font-sans text-[clamp(1rem,0.4vw+0.75rem,1.25rem)] leading-[1.4]">
          {active.bio}
        </p>
        <div className="mt-7 inline-flex">
          <Link
            href={active.linkedIn.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-moss-400 px-3 py-2 font-mono text-[13px] italic text-off-white transition-colors hover:bg-moss-200"
          >
            <LinkedInIcon />
            {active.linkedIn.handle}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </>
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

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}
