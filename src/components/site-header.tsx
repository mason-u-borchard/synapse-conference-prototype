"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import { useTheme } from "@/components/theme-provider";
import { SynapseMark } from "@/components/synapse-mark";

const navItems = [
  { href: "/speakers", label: "Speakers" },
  { href: "/schedule", label: "Schedule" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors",
        scrolled ? "border-border/80 bg-surface/85" : "border-transparent bg-surface/60",
      )}
    >
      <div className="container-gutter flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="The Synapse -- home">
          <SynapseMark className="h-6 w-6 text-ink transition-transform group-hover:rotate-[8deg]" />
          <span className="font-serif text-lg tracking-tight">The Synapse</span>
          <span className="eyebrow hidden md:inline">Atlanta / 2026</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "text-ink" : "text-muted-foreground hover:text-ink",
                )}
              >
                {item.label}
                {active && <span className="absolute inset-x-3 -bottom-px h-px bg-ink" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-ink"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <Link href="/register" className="hidden md:inline-flex btn btn-primary">Register</Link>
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
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
      {menuOpen && (
        <div className="border-t border-border bg-surface-raised md:hidden">
          <nav aria-label="Mobile" className="container-gutter flex flex-col py-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:text-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/register" className="btn btn-primary mt-2 w-full">Register</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 9.5A5.5 5.5 0 016.5 3a5.5 5.5 0 00-3 10.5A5.5 5.5 0 0013 9.5z" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
        <path d="M8 1.5v1.5M8 13v1.5M1.5 8h1.5M13 8h1.5M3.3 3.3l1.1 1.1M11.6 11.6l1.1 1.1M3.3 12.7l1.1-1.1M11.6 4.4l1.1-1.1" />
      </g>
    </svg>
  );
}
