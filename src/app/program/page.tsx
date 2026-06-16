import type { Metadata } from "next";
import Link from "next/link";
import { DisciplineCard } from "@/components/discipline-card";

export const metadata: Metadata = {
  title: { absolute: "Program | The Synapse — San Diego · Oct 9-11, 2026" },
  description:
    "Three days built around four disciplines and the spaces between them. Workshops, facilitated dialogue, and structured time for the conversations that usually only happen in hallways.",
};

// Program page per Taylor's 2026-06-16 Figma (node 444:603). Hero +
// three-day timeline (Expand / Weave / Emerge) + "Four fields. One
// frontier." section. Each day has a colored vertical timeline rail
// on the left and a stack of session cards on the right.
//
// Session-card data lives below as `days`. Time-of-day tags drive the
// pill color: morning -> oxide, afternoon -> orchid, evening ->
// amethyst, matching the day-header accent color.

type TimeOfDay = "morning" | "afternoon" | "evening";

type Session =
  | {
      kind: "session";
      time: TimeOfDay;
      title: string;
      description: string;
    }
  | {
      kind: "crossings";
      time: TimeOfDay;
      title: string;
      description: string;
      tracks: { title: string; description: string }[];
    };

type Day = {
  date: string;
  number: 1 | 2 | 3;
  title: string;
  subtitle: string;
  accent: "oxide" | "orchid" | "amethyst";
  sessions: Session[];
};

const days: Day[] = [
  {
    date: "Oct 9",
    number: 1,
    title: "Day 1: Expand",
    subtitle: "Who shapes minds? And what becomes possible when that expands?",
    accent: "oxide",
    sessions: [
      {
        kind: "session",
        time: "morning",
        title: "Welcome & Opening Practice",
        description:
          "Why this room, these bodies, these minds, these souls, this moment?",
      },
      {
        kind: "session",
        time: "morning",
        title: "Four Frontiers",
        description:
          "One keynote from each frontier: AI, consciousness, robotics, and cognitive science. How is each field expanding what shapes the minds of the future? What does each field fail to see when it tries to operate alone?",
      },
      {
        kind: "session",
        time: "afternoon",
        title: "The Provocation",
        description:
          "Speakers address research that got rejected, questions that resulted in stigmatization — and offer glimpses of what is possible if we unapologetically pursue them.",
      },
      {
        kind: "session",
        time: "evening",
        title: "Expansion Labs",
        description:
          "Choose-your-own experiential sessions that expand how we sense, feel, and know. Remote viewing, blindfolded sensing, frontier tech, soundbaths, ecstatic dance, prayer, and more.",
      },
    ],
  },
  {
    date: "Oct 10",
    number: 2,
    title: "Day 2: Weave",
    subtitle: "Something is gestating where these fields cross — and we are its parents.",
    accent: "orchid",
    sessions: [
      {
        kind: "session",
        time: "morning",
        title: "Morning Practice",
        description:
          "We use our bodies to move from listening alone to singing collectively.",
      },
      {
        kind: "session",
        time: "morning",
        title: "Weaving Keynote",
        description:
          "How traditions, lineages, and ways of knowing have always crossed and informed each other, long before separate academic disciplines emerged.",
      },
      {
        kind: "crossings",
        time: "morning",
        title: "The Crossings",
        description:
          "In each of four concurrent sessions, two speakers think aloud together, then the room joins in to deepen the conversation.",
        tracks: [
          {
            title: "Consciousness + AI",
            description:
              "Should we design consciousness into AI on purpose, and if so, how should we build differently?",
          },
          {
            title: "Mind + Body",
            description:
              "What do the body and mind know about each other that we need to build into our technologies?",
          },
          {
            title: "Wisdom + Power",
            description:
              "How do we honor indigenous, scientific, practical, and mystical wisdom traditions while navigating the realities of power?",
          },
          {
            title: "Responsibility + Creation",
            description:
              "How do we honor indigenous, scientific, practical, and mystical wisdom traditions while navigating the realities of power?",
          },
        ],
      },
      {
        kind: "session",
        time: "afternoon",
        title: "Expansion Labs",
        description:
          "Multiple experiential sessions that work across fields, bodies, and ways of knowing — such as collective sensemaking, working with power, somatic collaboration, voice training, relational perception, comedy writing, and improvisation.",
      },
      {
        kind: "session",
        time: "afternoon",
        title: "How We Build",
        description:
          "Women writing code, training models, designing robots, building consciousness tools. What decisions are we making as we build — and which questions outgrow our fields and require a new cross-frontier one?",
      },
      {
        kind: "session",
        time: "afternoon",
        title: "Open Space: The Invitation",
        description:
          "You may have an idea, an invitation for collaboration, a gestating project, or something that needs this room. This is the time to share it, receive feedback, and find your team.",
      },
      {
        kind: "session",
        time: "evening",
        title: "Celebratory Evening",
        description:
          "Ecstatic dance, oracle readings, yummy dinner, delicious conversation, quiet alone time. This is the sacred dance on the eve of birth.",
      },
    ],
  },
  {
    date: "Oct 11",
    number: 3,
    title: "Day 3: Emerge",
    subtitle: "What is being born, and how will we wear the mantle of care?",
    accent: "amethyst",
    sessions: [
      {
        kind: "session",
        time: "morning",
        title: "Morning Practice",
        description:
          "After two days of expanding and weaving, we will use a body-centered practice without spoken words to answer the question: what is the name of this field being born?",
      },
      {
        kind: "session",
        time: "morning",
        title: "Three Visions",
        description:
          "We will hear three visions of what's becoming possible with this birth, and what it asks in return.",
      },
      {
        kind: "session",
        time: "morning",
        title: "Open Space: Emergence",
        description:
          "Yesterday we seeded ideas; today, we build them with care and in community.",
      },
      {
        kind: "session",
        time: "morning",
        title: "Closing + Farewell",
        description:
          "We love and support and nourish ourselves as mothers, creators, colleagues, and friends.",
      },
    ],
  },
];

// Tailwind safelist hint — color classes are looked up via template
// strings below so we name them explicitly here for the JIT compiler:
//   bg-oxide-200 bg-orchid-200 bg-amethyst-200
//   text-oxide-200 text-orchid-200 text-amethyst-200
const accentStyles = {
  oxide: {
    headingDate: "text-oxide-200",
    dot: "bg-oxide-200",
    line: "bg-oxide-200",
  },
  orchid: {
    headingDate: "text-orchid-200",
    dot: "bg-orchid-200",
    line: "bg-orchid-200",
  },
  amethyst: {
    headingDate: "text-amethyst-200",
    dot: "bg-amethyst-200",
    line: "bg-amethyst-200",
  },
} as const;

const timeStyles = {
  morning: {
    bg: "bg-[rgba(240,170,113,0.5)]",
    text: "text-oxide-300",
    label: "Morning",
  },
  afternoon: {
    bg: "bg-[rgba(205,113,139,0.5)]",
    text: "text-orchid-300",
    label: "Afternoon",
  },
  evening: {
    bg: "bg-[rgba(208,156,199,0.5)]",
    text: "text-amethyst-300",
    label: "Evening",
  },
} as const;

export default function ProgramPage() {
  return (
    <>
      {/* === Hero (Figma 444:604) === */}
      <section className="bg-off-white pt-20 pb-section md:pt-24">
        <div className="container-gutter flex flex-col items-center gap-6 text-center">
          <img
            src="/figma/circle-graphic.svg"
            alt=""
            aria-hidden="true"
            width={102}
            height={111}
            className="h-[90px] w-auto md:h-[111px]"
          />
          <h1 className="max-w-[680px] font-serif text-[clamp(2.25rem,4.5vw+0.5rem,3.75rem)] leading-[1.05] text-off-black">
            A lecture hall becomes{" "}
            <span
              className="italic text-oxide-200"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              a living laboratory
            </span>
          </h1>
          <p className="max-w-[608px] font-sans text-[clamp(1rem,0.4vw+0.875rem,1.25rem)] leading-[1.6] text-off-black">
            Three days built around four disciplines and the spaces between them. Workshops, facilitated dialogue, and structured time for the conversations that usually only happen in hallways.
          </p>
          <Link
            href="/attend"
            className="mt-2 inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-black/80 px-6 font-noto text-lg font-semibold text-off-black/80 transition-colors hover:bg-off-black/5"
          >
            Apply to attend
          </Link>
        </div>
      </section>

      {/* === Schedule timeline (Figma 444:613) ===
          Three days, each with a colored vertical rail on the left
          (dot + line) and a stack of session cards on the right. */}
      <section className="bg-off-white pb-section">
        <div className="container-gutter flex flex-col gap-20">
          {days.map((day) => (
            <DaySchedule key={day.number} day={day} />
          ))}
        </div>
      </section>

      {/* === Four fields. One frontier. (Figma 445:2540) ===
          Heading + apply CTA + the same four DisciplineCards used on
          the home page. Reusing the home-page component preserves the
          click-to-flip back faces for free. */}
      <section className="bg-off-white py-section">
        <div className="container-gutter flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-[660px] font-serif text-[clamp(2.25rem,3vw+0.5rem,3rem)] leading-[1.2] text-off-black">
            Four fields. One frontier.
          </h2>
          <p className="max-w-[700px] font-sans text-[clamp(1rem,0.4vw+0.875rem,1.25rem)] leading-[1.6] text-off-black">
            AI, robotics, cognitive science, and consciousness aren't separate stories. The future is written where they converge.
          </p>
          <Link
            href="/attend"
            className="mt-2 inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-black/80 px-6 font-noto text-lg font-semibold text-off-black/80 transition-colors hover:bg-off-black/5"
          >
            Apply to attend
          </Link>
          <div className="mt-12 grid w-full max-w-[1488px] grid-cols-1 gap-3 min-[440px]:grid-cols-2 min-[440px]:gap-4 lg:grid-cols-4 lg:gap-6">
            <DisciplineCard
              title="Artificial Intelligence"
              body="Every model encodes a worldview. Most encode the same blind spots."
              back="New voices don't just correct the model. They remake what it's capable of seeing."
              backImage="/figma/back-ai.jpg"
              textBg="bg-amethyst-300"
              graphicBg="bg-amethyst-100"
              graphic="/figma/graphic-ai.svg"
            />
            <DisciplineCard
              title="Robotics"
              body="The moment intelligence gets a body, the consequences stop being theoretical."
              back="This is the threshold — where intention meets material, and what we make becomes real."
              backImage="/figma/back-robotics.jpg"
              textBg="bg-oxide-300"
              graphicBg="bg-oxide-100"
              graphic="/figma/graphic-robotics.svg"
            />
            <DisciplineCard
              title="Cognitive Science"
              body="When one theory of mind wins, every other way of knowing disappears from the blueprint."
              back="The fuller picture of mind is already emerging. It's been waiting for a room that can hold it."
              backImage="/figma/back-cs.jpg"
              textBg="bg-orchid-300"
              graphicBg="bg-orchid-100"
              graphic="/figma/graphic-cs.svg"
            />
            <DisciplineCard
              title="Consciousness"
              body="Consciousness isn't a philosophical luxury. It's the missing variable in every system we're building."
              back="Every mind contains a universe. That's where we begin."
              backImage="/figma/back-consciousness.jpg"
              textBg="bg-moss-300"
              graphicBg="bg-moss-100"
              graphic="/figma/graphic-consciousness.svg"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function DaySchedule({ day }: { day: Day }) {
  const accent = accentStyles[day.accent];
  return (
    <div className="grid grid-cols-[22px_minmax(0,1fr)] gap-x-4 gap-y-0 md:gap-x-6">
      {/* Vertical timeline rail on the left -- dot + line spanning the
          full height of the day so all of the day's cards sit
          alongside the colored line. */}
      <div className="row-span-2 flex flex-col items-center">
        <span
          aria-hidden="true"
          className={`block h-[22px] w-[22px] shrink-0 rounded-full ${accent.dot}`}
        />
        <span
          aria-hidden="true"
          className={`mt-1 w-[2px] flex-1 ${accent.line}`}
        />
      </div>

      {/* Day header */}
      <header className="flex flex-col gap-2 pt-0">
        <p
          className={`font-mono text-[1rem] font-medium leading-[1.4] ${accent.headingDate}`}
        >
          {day.date}
        </p>
        <h2 className="font-serif text-[clamp(1.5rem,1.5vw+0.875rem,1.75rem)] leading-[1.4] text-off-black">
          {day.title}
        </h2>
        <p className="max-w-[60ch] font-sans text-[clamp(1rem,0.4vw+0.875rem,1.25rem)] leading-[1.6] text-off-black">
          {day.subtitle}
        </p>
      </header>

      {/* Session cards stack -- one per session, with The Crossings'
          tracks rendered inside its card. */}
      <div className="mt-8 flex flex-col gap-6 pb-6">
        {day.sessions.map((session, i) => (
          <SessionCard key={`${day.number}-${i}`} session={session} />
        ))}
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  const time = timeStyles[session.time];
  return (
    <article className="flex flex-col gap-4 rounded-xl bg-true-white p-6 shadow-sm md:p-7">
      <span
        className={`inline-flex w-fit items-center rounded px-2.5 py-1 font-mono text-sm ${time.bg} ${time.text}`}
      >
        {time.label}
      </span>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-12 lg:gap-24">
        <h3 className="font-sans text-[clamp(1.25rem,1vw+0.875rem,1.625rem)] font-semibold leading-[1.4] text-off-black md:w-[480px] md:shrink-0">
          {session.title}
        </h3>
        <p className="font-sans text-[1rem] leading-[1.4] text-off-black md:flex-1">
          {session.description}
        </p>
      </div>
      {session.kind === "crossings" && (
        <ul className="mt-2 flex flex-col">
          {session.tracks.map((track, i) => (
            <li
              key={track.title}
              className={`flex flex-col gap-3 py-4 md:flex-row md:items-start md:gap-12 lg:gap-24 ${i === 0 ? "border-t border-off-black/10" : "border-t border-off-black/10"}`}
            >
              <h4 className="font-sans italic text-[clamp(1.125rem,0.7vw+0.875rem,1.5rem)] font-normal leading-[1.4] text-off-black md:w-[480px] md:shrink-0">
                {track.title}
              </h4>
              <p className="font-sans text-[1rem] leading-[1.4] text-off-black md:flex-1">
                {track.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
