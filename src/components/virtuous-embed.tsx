"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";

interface Props {
  vformId: string;
  orgId: string;
}

const VIRTUOUS_SRC = "https://cdn.virtuoussoftware.com/virtuous.embed.min.js";

// Mounts the Virtuous donation form inline. The Virtuous loader locates
// itself via the <script> tag's DOM position, so the script is injected
// into the container div (not into <head>) to keep the form rendering
// inside our layout. A data-* guard skips re-injection under React
// StrictMode's double-mount in development.
export function VirtuousEmbed({ vformId, orgId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"pending" | "loaded" | "error">("pending");
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  // Dev-only preview: hitting /donate?confirmationPreview=1 in a non-production
  // build short-circuits the component straight into the success state so the
  // confirmation panel can be designed/reviewed without running a real payment.
  // Guarded behind NODE_ENV so it can't be triggered on the deployed site.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("confirmationPreview") !== "1") return;
    setCompleteMessage(
      "Thank you, you lovely being.  We are so excited for this conference.\n- The team at ALL and Synapse Conference organizers",
    );
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.querySelector("script[data-virtuous-mounted]")) {
      setStatus("loaded");
      return;
    }

    const script = document.createElement("script");
    script.src = VIRTUOUS_SRC;
    script.async = true;
    script.setAttribute("data-vform", vformId);
    script.setAttribute("data-orgId", orgId);
    script.setAttribute("data-isGiving", "true");
    script.setAttribute("data-merchantType", "StripeUnified");
    script.setAttribute("data-dependencies", "[]");
    script.setAttribute("data-virtuous-mounted", "true");
    script.onload = () => setStatus("loaded");
    script.onerror = () => setStatus("error");
    container.appendChild(script);
  }, [vformId, orgId]);

  // Virtuous replaces its form DOM with a plain thank-you message when
  // the donation posts successfully. There is no public JS callback on
  // the embed, so we watch the container for the signature: no input
  // elements remain, and the text reads as a thank-you. When matched,
  // we capture the message, hide Virtuous's bare output, and render
  // our own confirmation panel in its place.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || completeMessage) return;
    const observer = new MutationObserver(() => {
      const text = (container.innerText || "").trim();
      if (!text) return;
      const stillTransacting = container.querySelectorAll("input, select, textarea, button[type=submit]").length > 0;
      if (stillTransacting) return;
      if (!/thank\s*you/i.test(text)) return;
      if (text.length > 1200) return;
      setCompleteMessage(text);
      observer.disconnect();
      requestAnimationFrame(() => {
        wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    observer.observe(container, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [completeMessage]);

  return (
    <div ref={wrapperRef} className="donate-card p-6 md:p-8">
      <div
        ref={containerRef}
        className={`min-h-[500px] ${completeMessage ? "hidden" : ""}`}
        aria-live="polite"
        aria-busy={status === "pending"}
      >
        {status === "pending" && (
          <p className="text-sm text-muted-foreground">Loading the donation form...</p>
        )}
        {status === "error" && (
          <p role="alert" className="rounded-md border border-synapse-magenta/60 bg-synapse-magenta/10 px-4 py-3 text-sm">
            The donation form could not be loaded. Please refresh, or reach
            the committee at{" "}
            <a href="mailto:hello@thesynapse.co" className="underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">hello@thesynapse.co</a>{" "}
            to pledge support directly.
          </p>
        )}
      </div>

      {completeMessage && <DonationConfirmation message={completeMessage} />}
    </div>
  );
}

function DonationConfirmation({ message }: { message: string }) {
  const reduced = useFramerReducedMotion();

  // Virtuous's message ships with extra whitespace and an em-dash
  // signature on its own line -- split it out so the attribution
  // reads cleanly under the thank-you body.
  const { body, attribution } = splitAttribution(message);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center py-6 text-center md:py-10"
    >
      <motion.div
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, hsl(38 72% 62%) 0%, hsl(36 72% 38%) 100%)",
          boxShadow: "0 8px 28px -12px hsl(36 72% 38% / 0.55), 0 0 0 6px hsl(38 72% 58% / 0.12)",
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="hsl(40 42% 97%)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M12 24.5 L21 33 L36 16"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.18, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={reduced ? false : { y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.25 }}
        className="mt-8 font-serif text-[2.25rem] leading-[1.1] tracking-tight"
        style={{ color: "hsl(294 45% 10%)" }}
      >
        Thank you.
      </motion.h2>

      <motion.p
        initial={reduced ? false : { y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.35 }}
        className="mt-4 max-w-md text-base leading-relaxed"
        style={{ color: "hsl(290 10% 38%)" }}
      >
        Your gift has been received. A receipt is on its way from Applied Love Labs, our host and fiscal sponsor.
      </motion.p>

      {body && (
        <motion.blockquote
          initial={reduced ? false : { y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.45 }}
          className="mt-8 max-w-md border-l-2 pl-5 text-left font-serif italic leading-relaxed"
          style={{ color: "hsl(294 45% 10%)", borderColor: "hsl(36 72% 38%)" }}
        >
          {body}
          {attribution && (
            <footer className="mt-3 text-sm not-italic" style={{ color: "hsl(290 10% 38%)" }}>
              {attribution}
            </footer>
          )}
        </motion.blockquote>
      )}

      <motion.div
        initial={reduced ? false : { y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.55 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition"
          style={{
            backgroundColor: "hsl(294 45% 10%)",
            color: "hsl(40 38% 97%)",
          }}
        >
          Back to The Synapse
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium transition"
          style={{
            borderColor: "hsl(292 16% 84%)",
            color: "hsl(294 45% 10%)",
          }}
        >
          Read the ethos
        </Link>
      </motion.div>
    </div>
  );
}

function splitAttribution(message: string): { body: string; attribution: string | null } {
  const lines = message.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return { body: "", attribution: null };
  const last = lines[lines.length - 1] ?? "";
  if (lines.length > 1 && /^[-—–]\s*/.test(last)) {
    return {
      body: lines.slice(0, -1).join(" "),
      attribution: last.replace(/^[-—–]\s*/, "— "),
    };
  }
  return { body: lines.join(" "), attribution: null };
}
