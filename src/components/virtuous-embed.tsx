"use client";

import { useEffect, useRef, useState } from "react";

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
  const [status, setStatus] = useState<"pending" | "loaded" | "error">("pending");

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

  return (
    <div className="paper p-6 md:p-8">
      <div
        ref={containerRef}
        className="min-h-[500px]"
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
            <a href="mailto:hello@thesynapse.example" className="underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">hello@thesynapse.example</a>{" "}
            to pledge support directly.
          </p>
        )}
      </div>
    </div>
  );
}
