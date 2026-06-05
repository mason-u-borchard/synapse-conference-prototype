"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { SynapseMark } from "@/components/synapse-mark";

// Nav follows the v2 IA -- text links on the left for content pages,
// the two CTAs (Invest / Attend) rendered as buttons on the right via
// the action region below.
const navItems = [
  { href: "/about", label: "About" },
  { href: "/ethos", label: "Ethos" },
  { href: "/program", label: "Program" },
];

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // "Sticky on scroll up" per Taylor's Figma note: hide on
  // scroll-down once we've moved past the hero; show on scroll-up.
  // visible defaults true so the bar is always there at the top
  // and only auto-hides after the user starts moving down.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const delta = y - lastY;
      // Don't react to micro-movements (smooth-scroll wobble).
      if (Math.abs(delta) < 4) return;
      if (y < 80) {
        setVisible(true);
      } else if (delta > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 w-full transition-transform duration-300 ease-out",
        scrolled ? "py-3" : "pt-5 pb-3",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container-gutter">
        {/* Pill-shaped nav per Taylor's Figma. Dark amethyst surface
            with a soft inset shadow and an off-white text palette,
            inspired by the Hero export. */}
        <div
          className="mx-auto flex h-[60px] max-w-[1568px] items-center justify-between rounded-full bg-amethyst-300 px-7 shadow-[5px_5px_18px_-6px_rgba(144,90,140,0.35),inset_0_0_0_1px_rgba(241,236,233,0.06)]"
        >
          <Link href="/" className="group flex items-center gap-4" aria-label="The Synapse -- home">
            {/* Use Taylor's actual icon SVG (oxide-100 fill baked in)
                from /figma/synapse-icon.svg, not the v1 SynapseMark
                component which had a different glyph shape. Hue cycle
                applied via CSS filter so we don't need to swap files. */}
            {/* The icon SVG ships with preserveAspectRatio="none" so
                we must set BOTH width and height explicitly or it
                stretches to fill its container (which was making it
                look like a flat oval). The icon's actual viewBox is
                ~25x26, so 24x25 in CSS pixels keeps it square-ish
                and recognizable. */}
            <img
              src="/figma/synapse-icon.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={26}
              className="animate-logo-cycle h-[26px] w-[24px] shrink-0 transition-transform group-hover:rotate-[8deg]"
            />
            <span className="font-serif text-lg tracking-tight text-off-white">The Synapse</span>
            <span className="hidden lg:inline font-mono text-[11px] uppercase tracking-[0.3em] text-off-white/85">San Diego / 2026</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-10">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isProgram = item.href === "/program";
              if (isProgram) {
                return (
                  <span
                    key={item.href}
                    aria-disabled="true"
                    className="font-noto text-base flex items-center gap-1.5 text-off-white/65 cursor-default select-none"
                  >
                    {item.label}
                    <span className="rounded bg-off-white/5 px-1.5 py-0.5 font-mono text-[11px] italic text-off-white/85">
                      Coming soon!
                    </span>
                  </span>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "font-noto text-base transition-colors flex items-center gap-1.5 hover:text-oxide-100",
                    active ? "text-oxide-100" : "text-off-white/85",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/invest"
              className="hidden lg:inline-flex h-10 items-center btn-solid-glow rounded-full bg-oxide-100 px-5 font-noto text-base font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Invest
            </Link>
            <Link
              href="/attend"
              className="hidden lg:inline-flex h-10 items-center btn-outline-glow rounded-full border border-off-white/80 px-5 font-noto text-base font-semibold text-off-white transition-colors hover:bg-off-white/10"
            >
              Attend
            </Link>
            <button
              type="button"
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-off-white/30 text-off-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d={menuOpen ? "M4 4l10 10M14 4L4 14" : "M3 5h12M3 9h12M3 13h12"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-3 mx-4 rounded-3xl bg-amethyst-300 px-5 py-4 shadow-lg">
          <nav aria-label="Mobile" className="flex flex-col gap-3 text-off-white">
            {navItems.map((item) => {
              if (item.href === "/program") {
                return (
                  <span key={item.href} aria-disabled="true" className="rounded-md px-2 py-2 text-base font-noto text-off-white/65 cursor-default flex items-center gap-2">
                    {item.label}
                    <span className="rounded bg-off-white/5 px-1.5 py-0.5 font-mono text-[10px] italic text-off-white/85">Coming soon!</span>
                  </span>
                );
              }
              return (
                <Link key={item.href} href={item.href} className="rounded-md px-2 py-2 text-base font-noto hover:bg-off-white/10">
                  {item.label}
                </Link>
              );
            })}
            <Link href="/invest" className="mt-2 btn-solid-glow rounded-full bg-oxide-100 px-5 py-3 text-center font-noto font-semibold text-off-black">Invest</Link>
            <Link href="/attend" className="btn-outline-glow rounded-full border border-off-white/80 px-5 py-3 text-center font-noto font-semibold text-off-white">Attend</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

