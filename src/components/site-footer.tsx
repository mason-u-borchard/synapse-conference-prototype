import Link from "next/link";
import { meta } from "@/lib/content";

// Footer per Taylor's Figma (Home node 19:1222 / Footer 17:16934).
// Two visually distinct stacked sections:
//   - Pre-Footer: a full-bleed cityscape photo with the Synapse "S"
//     mark overlay, "San Diego, CA / Oct 9-11, 2026" headline, and a
//     "Hosted by Applied Love Labs" badge. Image src is still the
//     Atlanta skyline placeholder pending Taylor's San Diego asset.
//   - Main Footer: dark moss-400 surface with logo + tagline + the
//     standard three-column nav (Explore / Get Involved / Reach Us)
//     and a thin top-bordered bar at the very bottom for copyright
//     and legal links.

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate bg-moss-400 text-off-white">
      {/* === Pre-Footer: cityscape with date overlay ===
          The cityscape image fills the section. The Synapse "S" mark
          (a stylized white wordmark glyph) sits to the right at large
          scale as decorative anchoring. Date headline + host badge
          sit on the left. */}
      <section
        aria-label="San Diego, October 9-11, 2026"
        className="relative overflow-hidden"
      >
        <div className="relative h-[560px] md:h-[760px] lg:h-[933px]">
          <img
            src="/figma/atlanta-skyline.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Bottom gradient fades the photo into the dark footer below
              for a smooth handoff. */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(4,16,17,0) 0%, hsl(var(--moss-400)) 100%)" }}
            aria-hidden="true"
          />
          {/* Decorative Synapse S mark, right-aligned, partially behind
              text on smaller screens. */}
          <img
            src="/figma/synapse-s-overlay.svg"
            alt=""
            aria-hidden="true"
            className="absolute right-[5%] top-[18%] z-[1] hidden h-[55%] w-auto md:block"
          />
          <div className="container-gutter relative z-10 flex h-full flex-col justify-end pb-20 md:pb-32">
            <h2 className="max-w-[438px] font-serif text-[clamp(2.5rem,5vw+0.5rem,3.625rem)] font-semibold leading-[1.2] text-off-white">
              San Diego, CA<br />Oct 9-11, 2026
            </h2>
            <span className="mt-7 inline-flex w-fit rounded bg-off-black/40 px-3 py-1.5 font-mono text-base text-off-white">
              Hosted by Applied Love Labs
            </span>
          </div>
        </div>
      </section>

      {/* === Main Footer ===
          Logo + tagline on the left, three-column nav on the right.
          The Program nav-item gets a "Coming soon!" chip mirroring
          the header pattern. */}
      {/* Layout: stack the wordmark/tagline + nav vertically below lg.
          The earlier md:flex-row + md:grid-cols-3 packed three nav
          columns next to the tagline column in the 768-1023 range and
          squeezed the email + "Fund the room" / "Apply to attend"
          labels until they wrapped or trailed off the viewport
          (Mason 06-04 audit). At lg+ the original side-by-side layout
          returns. */}
      <section aria-label="Site footer" className="relative pt-24 md:pt-36">
        <div className="container-gutter flex flex-col gap-16 xl:flex-row xl:items-start xl:justify-between xl:gap-24">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center" aria-label="The Synapse -- home">
              <img
                src="/figma/synapse-wordmark.svg"
                alt="The Synapse"
                className="h-[42px] w-auto"
              />
            </Link>
            <p className="mt-7 font-sans text-xl leading-[1.6] text-off-white">
              Where women connect mind, machine, and what comes next.
            </p>
            <p className="mt-7 font-mono text-sm text-off-white">
              AI &middot; Robotics &middot; Cognitive Science &middot; Consciousness
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 sm:gap-10 xl:gap-24">
            <FooterColumn
              title="Explore"
              items={[
                { label: "About", href: "/about" },
                { label: "Ethos", href: "/ethos" },
                { label: "Program", chip: "Coming soon!" },
                { label: "FAQ", href: "/faq" },
              ]}
            />
            <FooterColumn
              title="Get Involved"
              items={[
                { label: "Fund the room", href: "/invest" },
                { label: "Apply to attend", href: "/attend" },
              ]}
            />
            <FooterColumn
              title="Reach Us"
              items={[
                { label: "hello@thesynapse.co", href: "mailto:hello@thesynapse.co" },
              ]}
            />
          </div>
        </div>

        {/* Bottom bar: thin top divider with copyright and legal links. */}
        <div className="mt-32 border-t border-off-white/20">
          <div className="container-gutter flex flex-col gap-3 py-8 font-mono text-base text-off-white md:flex-row md:items-center md:justify-between">
            <span>&copy; {year} {meta.fiscalSponsor.name}</span>
            <div className="flex items-center gap-2">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <span aria-hidden="true">&middot;</span>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href?: string; chip?: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase tracking-[0.4em] text-off-white">{title}</h3>
      <ul className="mt-7 space-y-5 font-sans text-base text-off-white">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:underline">{item.label}</Link>
            ) : (
              <span aria-disabled="true" className="text-off-white/65 cursor-default">{item.label}</span>
            )}
            {item.chip && (
              <span className="rounded bg-off-white/5 px-1.5 py-0.5 font-mono text-[11px] italic text-off-white/85">
                {item.chip}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
