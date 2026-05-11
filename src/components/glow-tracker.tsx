"use client";

import { useEffect } from "react";

// Global cursor tracker. Sets --glow-x / --glow-y CSS custom
// properties on any element with class `.btn-solid-glow` so the
// radial-gradient hover effect (defined in globals.css) follows
// the cursor. Mounted once at the layout level.
//
// Implemented as a single document-level mousemove listener with
// closest() so we don't pay a listener-per-button cost. The
// style write only happens when the cursor is actually inside a
// glowable element.

export function GlowTracker() {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn-solid-glow");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty("--glow-x", `${x}%`);
      target.style.setProperty("--glow-y", `${y}%`);
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
