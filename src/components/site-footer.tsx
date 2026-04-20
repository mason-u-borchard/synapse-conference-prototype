import Link from "next/link";
import { meta } from "@/lib/content";
import { SynapseMark } from "@/components/synapse-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="container-gutter grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2.5" aria-label="The Synapse -- home">
            <SynapseMark className="h-6 w-6 text-ink" />
            <span className="font-serif text-lg">The Synapse</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            {meta.subtitle} {meta.city} &middot; {meta.dates.display}. An
            initiative of{" "}
            <a
              href={meta.fiscalSponsor.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold"
            >
              {meta.fiscalSponsor.name}
            </a>.
          </p>
        </div>
        <FooterColumn title="Explore" items={[
          { label: "About", href: "/about" },
          { label: "Ethos", href: "/#ethos" },
          { label: "Program", href: "/schedule" },
          { label: "Participants", href: "/speakers" },
          { label: "FAQ", href: "/faq" },
        ]} />
        <FooterColumn title="Get involved" items={[
          { label: "Apply to attend", href: "/register" },
          { label: "Fund the work", href: "/donate" },
          { label: "Access form", href: "/register#access" },
        ]} />
        <FooterColumn title="Reach us" items={[
          { label: "hello@thesynapse.example", href: "mailto:hello@thesynapse.example" },
          { label: "Code of conduct", href: "/about#conduct" },
          { label: "Press kit", href: "/about#press" },
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="container-gutter flex flex-col gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {year} {meta.fiscalSponsor.name}.
          </span>
          <span className="font-mono tracking-wider">
            {meta.dates.display} &middot; {meta.city}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow mb-3">{title}</h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-muted-foreground hover:text-ink">{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
