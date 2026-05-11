"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

// "Solid" CTA button per Taylor's Figma comment (2026-05-07):
// "gradient/motion effect on hover for solid buttons. perhaps
// radial from cursor? Using the Oxide & Amethyst Palette?"
//
// Implementation: track the cursor position over the button and
// expose it as --glow-x / --glow-y CSS custom properties; the
// .btn-solid-glow class in globals.css renders a radial-gradient
// pseudo-element using those positions. Falls back to a centered
// gradient if JS hasn't run yet.

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export function GlowButton({ href, children, variant = "solid", className = "" }: Props) {
  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--glow-x", `${x}%`);
    e.currentTarget.style.setProperty("--glow-y", `${y}%`);
  }

  const base =
    "inline-flex h-[50px] items-center rounded-full px-6 font-noto text-lg font-semibold transition-transform";
  const solid =
    "btn-solid-glow bg-oxide-100 text-off-black hover:-translate-y-0.5";
  const outline =
    "btn-outline-glow border border-off-black/80 text-off-black/80 hover:bg-off-black/5";

  return (
    <Link
      href={href}
      onMouseMove={variant === "solid" ? onMove : undefined}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
    >
      {children}
    </Link>
  );
}
