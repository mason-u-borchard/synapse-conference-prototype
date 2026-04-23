import type { Metadata } from "next";
import { meta } from "@/lib/content";
import { WhoItsFor } from "@/components/who-its-for";

export const metadata: Metadata = {
  title: "About",
  description: "Four fields, one frontier. The Synapse convenes women working across AI, robotics, cognitive science, and consciousness -- hosted by Applied Love Labs.",
};

export default function AboutPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">About</p>
        <h1 className="text-display-lg text-balance">Four fields. One frontier.</h1>
        <div className="mt-6 max-w-prose space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
          <p>
            AI, robotics, cognitive science, and consciousness are no
            longer separate conversations. The questions that matter now
            live between them -- across disciplines, ways of knowing, and
            the full range of human intelligence.
          </p>
          <p>
            The Synapse convenes women working at these edges --
            researchers, builders, practitioners, and leaders shaping what
            comes next in real time.
          </p>
          <p className="font-serif italic text-ink">
            This is not a conference about the future.<br />
            It is the future, in formation.
          </p>
        </div>
      </header>

      <section id="who" className="mt-20">
        <p className="eyebrow mb-4 text-muted-foreground">Who it's for</p>
        <h2 className="text-display-md">For the women building at the edges.</h2>
        <div className="mt-8">
          <WhoItsFor />
        </div>
      </section>

      <section id="founder" className="mt-20 paper p-8 md:p-10">
        <p className="eyebrow mb-4 text-muted-foreground">A dedication, not a protest</p>
        <div className="max-w-prose space-y-5 text-pretty text-ink">
          <p>
            AI, consciousness, cognitive science, and robotics are the
            fields shaping the future of humanity. And they remain
            overwhelmingly led by elite, male-ordered institutions.
            After the Epstein files release made plain how women have
            been actively suppressed in these disciplines, a small group
            of us decided we would stop waiting for a better invitation
            and build one.
          </p>
          <p>
            This conference is not a protest. It is a dedication: to the
            rigorous, controversial, embodied, relational work women are
            already doing, and to the collaborative future we intend to
            build together.
          </p>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          -- {meta.founder.name} &middot; {meta.founder.title}
        </p>
      </section>

      <section id="fiscal-sponsor" className="mt-12 paper p-8">
        <p className="eyebrow mb-4 text-muted-foreground">Host and fiscal sponsor</p>
        <h2 className="font-serif text-3xl tracking-tight">{meta.fiscalSponsor.name}</h2>
        <p className="mt-4 max-w-prose text-pretty text-muted-foreground">{meta.fiscalSponsor.blurb}</p>
        <div className="mt-6">
          <a
            href={meta.fiscalSponsor.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            About {meta.fiscalSponsor.short}
          </a>
        </div>
      </section>

      <section id="atlanta" className="mt-12 paper p-8">
        <p className="eyebrow mb-4 text-muted-foreground">Why Atlanta</p>
        <h2 className="font-serif text-3xl tracking-tight">A city already doing the work of empowering women.</h2>
        <p className="mt-4 max-w-prose text-pretty text-muted-foreground">
          We are gathering in Atlanta: a city with deep roots in civil
          rights, a thriving tech and research ecosystem, and an
          established commitment to lifting women's voices. The City of
          Atlanta has expressed interest in supporting the initiative.
        </p>
      </section>

      {/* #PLACEHOLDER */}
      {/* <section id="committee" className="mt-20">
        <h2 className="text-display-md">Organizing committee</h2>
        <p className="mt-4 max-w-prose text-muted-foreground text-pretty">
          The working committee stewards the program, access, ethics, and
          community design. Committee roster is a placeholder until the
          committee confirms names for public listing.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {committee.map((m) => (
            <li key={m.role} className="paper p-6">
              <p className="eyebrow mb-2 text-muted-foreground">{m.role}</p>
              <p className="font-serif text-xl text-ink">{m.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.affiliation}</p>
              <p className="mt-4 text-sm text-ink">{m.focus}</p>
            </li>
          ))}
        </ul>
      </section> */}

      {/* #PLACEHOLDER -- Partners section hidden until confirmed partners exist */}

      {/* #PLACEHOLDER -- Code of conduct / code of ethics section hidden per Beth 2026-04-23 */}

      <section id="press" className="mt-24 max-w-3xl">
        <h2 className="text-display-md">Press and inquiries</h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          For media passes, speaker interviews, or the official press kit,
          reach the organizing committee at{" "}
          <a href="mailto:hello@thesynapse.co" className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">
            hello@thesynapse.co
          </a>.
        </p>
      </section>
    </div>
  );
}
