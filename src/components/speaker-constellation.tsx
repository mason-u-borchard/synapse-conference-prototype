"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FieldId, Scholar, Speaker } from "@/types/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Force-directed constellation built around the four conference fields
// (AI / Robotics / Cognitive Science / Consciousness). Each field is a
// large anchor node positioned around a soft ring. Speaker nodes orbit
// the anchors via spring edges -- a speaker whose research bridges two
// fields settles between them, so the layout itself is the overlap.
//
// Color-keyed to the discipline palette so each anchor reads as a real
// place on the page, not just a label.

interface FieldDef {
  id: FieldId;
  label: string;
  shortLabel: string;
  hue: string; // hsl() string -- used as the literal fill for both the
               // canvas dots and the legend swatch so the two never
               // drift apart.
}

const FIELDS: readonly FieldDef[] = [
  { id: "ai", label: "Artificial Intelligence", shortLabel: "AI", hue: "hsl(269 45% 55%)" },
  { id: "robotics", label: "Robotics", shortLabel: "Robotics", hue: "hsl(22 65% 50%)" },
  { id: "cogsci", label: "Cognitive Science", shortLabel: "Cog Sci", hue: "hsl(312 35% 55%)" },
  // Consciousness is intentionally the darkest hue -- the canvas dots
  // also bake in a glow that makes the green pop on off-white; the
  // legend boosts the lightness here so the swatch reads as deep moss
  // rather than near-black.
  { id: "consciousness", label: "Consciousness", shortLabel: "Consciousness", hue: "hsl(140 38% 38%)" },
];

// Map every research area + tag the speaker data uses to one of the
// four fields. Keeps the visualization deterministic and matches the
// way the rest of the site organizes the program. Multiple matches are
// fine -- a speaker linked to AI alignment + philosophy of mind reads
// as bridging AI and Consciousness, which is exactly the kind of pull
// we want the layout to show.
const FIELD_MAP: Readonly<Record<string, FieldId[]>> = {
  // AI cluster
  "AI alignment": ["ai"],
  "affective computing": ["ai"],
  "cognitive architecture": ["ai", "cogsci"],
  "AI and machine consciousness": ["ai", "consciousness"],
  // Robotics cluster (placeholder taxonomy -- robotics-tagged speakers
  // arrive when the committee confirms that side of the roster)
  "robotics": ["robotics"],
  "embodied cognition": ["robotics", "cogsci"],
  // Cognitive science cluster
  "cognitive neuroscience": ["cogsci"],
  "attention research": ["cogsci"],
  "memory research": ["cogsci"],
  "active inference": ["cogsci"],
  "computational psychiatry": ["cogsci"],
  "Predictive processing": ["cogsci"],
  "Attention": ["cogsci"],
  "Memory and learning": ["cogsci"],
  "Metacognition": ["cogsci", "consciousness"],
  // Consciousness cluster
  "consciousness studies": ["consciousness"],
  "contemplative neuroscience": ["consciousness"],
  "philosophy of mind": ["consciousness"],
  "phenomenology": ["consciousness"],
  "quantum cognition": ["consciousness"],
  "psychedelic science": ["consciousness"],
  "Neural correlates of consciousness": ["consciousness", "cogsci"],
  "Recurrent Processing Theory (RPT)": ["consciousness"],
  "Higher-order theories": ["consciousness"],
  "Global Workspace Theory": ["consciousness", "cogsci"],
  "Integrated Information Theory (IIT)": ["consciousness"],
  "Hard problem": ["consciousness"],
  "Qualia": ["consciousness"],
  "Phenomenology": ["consciousness"],
  "Free will and agency": ["consciousness"],
  "Personal identity and the self": ["consciousness"],
  "Meditation and mindfulness": ["consciousness"],
  "Dreams and lucid dreaming": ["consciousness"],
  "Psychedelics and altered states": ["consciousness"],
  "Quantum theories of consciousness": ["consciousness"],
};

interface SNode {
  id: string;
  kind: "field" | "speaker" | "scholar";
  fieldId?: FieldId;
  speakerSlug?: string;
  scholarSlug?: string;
  label: string;
  radius: number;
  // physics
  x: number;
  y: number;
  vx: number;
  vy: number;
  fields: Set<FieldId>; // which fields this node belongs to
}

interface Edge {
  a: string;
  b: string;
  fieldId: FieldId; // the field this edge represents pulling toward
}

export function SpeakerConstellation({
  speakers,
  scholars = [],
}: {
  speakers: readonly Speaker[];
  scholars?: readonly Scholar[];
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const prefersReduced = useReducedMotion();

  // Mirror hover/select state into refs so the canvas tick loop can read
  // the current focus without listing those state values in the effect's
  // dep array. Without this, every hover unmounts the simulation and
  // re-seeds 100+ node positions, producing the "spazz" the user sees.
  const hoveredIdRef = useRef<string | null>(null);
  const selectedIdRef = useRef<string | null>(null);
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);
  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  const { nodes, edges, speakerFields, scholarFields } = useMemo(
    () => buildGraph(speakers, scholars),
    [speakers, scholars],
  );
  const scholarBySlug = useMemo(() => {
    const m = new Map<string, Scholar>();
    for (const sc of scholars) m.set(sc.slug, sc);
    return m;
  }, [scholars]);

  // The set of node IDs that should read as "active" -- if the user has
  // hovered or selected a node, that node plus everything it links to.
  // Otherwise null = everything renders at full strength.
  const activeSet = useMemo(() => {
    const focusId = hoveredId ?? selectedId;
    if (!focusId) return null;
    const set = new Set<string>([focusId]);
    for (const e of edges) {
      if (e.a === focusId) set.add(e.b);
      if (e.b === focusId) set.add(e.a);
    }
    return set;
  }, [hoveredId, selectedId, edges]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cloned live nodes so the original buildGraph output stays as the
    // source of truth for what we render outside the canvas (labels,
    // legend interactions). Live nodes mutate every tick.
    const live: SNode[] = nodes.map((n) => ({ ...n, fields: new Set(n.fields) }));
    const fieldNodes = live.filter((n) => n.kind === "field");
    const speakerNodes = live.filter((n) => n.kind === "speaker");
    const scholarNodes = live.filter((n) => n.kind === "scholar");
    const mobileNodes = live.filter((n) => n.kind !== "field");

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    function sizeAndSeed() {
      const rect = wrapper!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Field anchors sit at the corners of a soft diamond -- AI top-left,
      // Robotics top-right, Cog Sci bottom-left, Consciousness bottom-right.
      // The diamond gives every anchor an honest amount of space without
      // looking gridded.
      const cx = width / 2;
      const cy = height / 2;
      // Pull the diamond inward on narrow viewports so the long field
      // labels (CONSCIOUSNESS, ARTIFICIAL INTELLIGENCE) don't get
      // clipped at the canvas edges.
      const tightness = width < 520 ? 0.28 : 0.4;
      const rx = Math.min(width, height) * tightness;
      const ry = Math.min(width, height) * tightness;
      const fieldPositions: Record<FieldId, { x: number; y: number }> = {
        ai: { x: cx - rx, y: cy - ry * 0.85 },
        robotics: { x: cx + rx, y: cy - ry * 0.85 },
        cogsci: { x: cx - rx, y: cy + ry * 0.85 },
        consciousness: { x: cx + rx, y: cy + ry * 0.85 },
      };
      for (const n of fieldNodes) {
        const pos = fieldPositions[n.fieldId!];
        n.x = pos.x;
        n.y = pos.y;
        n.vx = 0;
        n.vy = 0;
      }
      // Seed each mobile node near the centroid of the fields it belongs
      // to so the simulation converges quickly instead of unraveling
      // from the page center every reflow. Mobile = speakers + scholars.
      mobileNodes.forEach((n, i) => {
        let sx = 0;
        let sy = 0;
        let count = 0;
        for (const f of n.fields) {
          sx += fieldPositions[f].x;
          sy += fieldPositions[f].y;
          count += 1;
        }
        if (count === 0) {
          sx = cx;
          sy = cy;
        } else {
          sx /= count;
          sy /= count;
        }
        // Small deterministic jitter so co-located speakers don't stack
        // on the exact same pixel before the first tick.
        const jitter = (i % 5) * 6 - 12;
        n.x = sx + jitter;
        n.y = sy + jitter * 0.6;
        n.vx = 0;
        n.vy = 0;
      });
    }

    sizeAndSeed();
    let raf = 0;
    let ticks = 0;
    // ~3s at 60fps; the layout converges well before this, but we run
    // a few extra ticks of cooled-off motion so positions settle to
    // pixels instead of freezing mid-jiggle.
    const settleAfter = 180;

    function tick() {
      // Focus state is read from refs, NOT from closure-captured state,
      // so hover changes do not restart the simulation. The outer
      // useEffect now only re-runs when the graph itself changes.
      const focusId = hoveredIdRef.current ?? selectedIdRef.current;
      let frameActive: Set<string> | null = null;
      if (focusId) {
        frameActive = new Set<string>([focusId]);
        for (const e of edges) {
          if (e.a === focusId) frameActive.add(e.b);
          if (e.b === focusId) frameActive.add(e.a);
        }
      }

      // Step physics only while the layout is converging. After settle,
      // positions are frozen and the loop just keeps rendering so hover
      // and focus highlights still update in place.
      const stepping = ticks < settleAfter;
      if (stepping) {
        ticks += 1;
        for (const s of mobileNodes) {
          s.vx += (width / 2 - s.x) * 0.0008;
          s.vy += (height / 2 - s.y) * 0.0008;
          for (const other of live) {
            if (other.id === s.id) continue;
            const dx = s.x - other.x;
            const dy = s.y - other.y;
            const d2 = dx * dx + dy * dy + 80;
            // Higher node-node repulsion so clustered dots actually spread
            // out enough to click; field anchors hold the loosest tether
            // so bridge nodes still drift between them.
            const repel = (other.kind === "field" ? 1800 : 2800) / d2;
            const inv = 1 / Math.sqrt(d2);
            s.vx += dx * inv * repel;
            s.vy += dy * inv * repel;
          }
        }
        for (const e of edges) {
          const a = live.find((n) => n.id === e.a)!;
          const b = live.find((n) => n.id === e.b)!;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) + 0.01;
          const target = 180;
          const force = (d - target) * 0.014;
          if (a.kind !== "field") {
            a.vx += (dx / d) * force;
            a.vy += (dy / d) * force;
          }
          if (b.kind !== "field") {
            b.vx -= (dx / d) * force;
            b.vy -= (dy / d) * force;
          }
        }
        for (const s of mobileNodes) {
          s.vx *= 0.82;
          s.vy *= 0.82;
          s.x += s.vx;
          s.y += s.vy;
          const pad = 56;
          s.x = Math.min(width - pad, Math.max(pad, s.x));
          s.y = Math.min(height - pad, Math.max(pad, s.y));
        }
      }

      // Render every frame regardless of physics so focus changes after
      // the layout has settled still update the canvas immediately.
      ctx!.clearRect(0, 0, width, height);

      for (const e of edges) {
        const a = live.find((n) => n.id === e.a)!;
        const b = live.find((n) => n.id === e.b)!;
        const isActive = !frameActive || (frameActive.has(a.id) && frameActive.has(b.id));
        const field = FIELDS.find((f) => f.id === e.fieldId)!;
        ctx!.strokeStyle = withAlpha(field.hue, isActive ? 0.55 : 0.08);
        ctx!.lineWidth = isActive ? 1.4 : 0.7;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      for (const f of fieldNodes) {
        const field = FIELDS.find((x) => x.id === f.fieldId)!;
        const isActive = !frameActive || frameActive.has(f.id);
        const grad = ctx!.createRadialGradient(f.x, f.y, f.radius * 0.4, f.x, f.y, f.radius * 2.6);
        grad.addColorStop(0, withAlpha(field.hue, isActive ? 0.45 : 0.16));
        grad.addColorStop(1, withAlpha(field.hue, 0));
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.radius * 2.6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = withAlpha(field.hue, isActive ? 1 : 0.45);
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const s of speakerNodes) {
        const isActive = !frameActive || frameActive.has(s.id);
        const isFocus = focusId === s.id;
        const firstField = s.fields.values().next().value as FieldId | undefined;
        const field = (firstField && FIELDS.find((f) => f.id === firstField)) || FIELDS[0]!;
        ctx!.fillStyle = isActive
          ? withAlpha(field.hue, isFocus ? 1 : 0.85)
          : withAlpha(field.hue, 0.25);
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius + (isFocus ? 3 : 0), 0, Math.PI * 2);
        ctx!.fill();
        ctx!.strokeStyle = isActive ? "rgba(20, 20, 20, 0.45)" : "rgba(20, 20, 20, 0.12)";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      for (const s of scholarNodes) {
        const isActive = !frameActive || frameActive.has(s.id);
        const isFocus = focusId === s.id;
        const firstField = s.fields.values().next().value as FieldId | undefined;
        const field = (firstField && FIELDS.find((f) => f.id === firstField)) || FIELDS[0]!;
        const r = s.radius + (isFocus ? 3 : 0);
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = isActive
          ? withAlpha(field.hue, isFocus ? 1 : 0.9)
          : withAlpha(field.hue, 0.25);
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = isActive ? "rgba(20, 20, 20, 0.35)" : "rgba(20, 20, 20, 0.1)";
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, r + 1, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // Publish positions for the DOM overlay only while positions are
      // actually changing. After the layout settles, skipping this avoids
      // an unbounded 60fps React re-render of every label and hit target.
      if (stepping) {
        const next: Record<string, { x: number; y: number }> = {};
        for (const n of live) next[n.id] = { x: n.x, y: n.y };
        setPositions(next);
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(() => {
      sizeAndSeed();
      ticks = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    });
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // Intentionally exclude hoveredId/selectedId/activeSet/prefersReduced.
    // Focus is read via refs inside the tick loop; including state in
    // the deps would tear down the simulation on every hover.
  }, [nodes, edges]);

  const selectedSpeaker = selectedId?.startsWith("s:")
    ? speakers.find((s) => `s:${s.slug}` === selectedId)
    : null;
  const selectedSpeakerFields = selectedSpeaker
    ? speakerFields.get(selectedSpeaker.slug) ?? new Set<FieldId>()
    : null;

  // Scholars don't pin to the panel on click (the click opens their
  // profile URL in a new tab). The right-side panel shows scholar
  // details while the mouse hovers a scholar dot.
  const hoveredScholarId = hoveredId?.startsWith("sc:") ? hoveredId : null;
  const hoveredScholar = hoveredScholarId
    ? scholarBySlug.get(hoveredScholarId.slice(3))
    : null;
  const hoveredScholarFields = hoveredScholar
    ? scholarFields.get(hoveredScholar.slug) ?? new Set<FieldId>()
    : null;

  return (
    <div className="w-full">
      <div
        ref={wrapperRef}
        className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-off-black/10 bg-off-white sm:h-[640px] lg:h-[720px]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          onClick={(event) => {
            // Click on empty canvas clears selection. Speaker hit-tests
            // happen on the absolutely-positioned hit buttons below.
            if (event.target === canvasRef.current) setSelectedId(null);
          }}
        />

        {/* Field anchor labels. Positioned over the canvas so the text
            stays crisp regardless of devicePixelRatio. */}
        {nodes
          .filter((n) => n.kind === "field")
          .map((n) => {
            const pos = positions[n.id];
            if (!pos) return null;
            const field = FIELDS.find((f) => f.id === n.fieldId)!;
            const isActive = !activeSet || activeSet.has(n.id);
            return (
              <button
                type="button"
                key={n.id}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId((h) => (h === n.id ? null : h))}
                onFocus={() => setHoveredId(n.id)}
                onBlur={() => setHoveredId((h) => (h === n.id ? null : h))}
                onClick={() => setSelectedId((cur) => (cur === n.id ? null : n.id))}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-off-black transition-opacity"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y + n.radius + 18}px`,
                  opacity: isActive ? 1 : 0.35,
                }}
                aria-label={`${field.label} field`}
              >
                {field.shortLabel}
              </button>
            );
          })}

        {/* Speaker hit targets. The dot is painted by the canvas; this
            transparent button sits on top of it so hover, focus, and
            click all behave like normal interactive elements (including
            keyboard navigation). */}
        {nodes
          .filter((n) => n.kind === "speaker")
          .map((n) => {
            const pos = positions[n.id];
            if (!pos) return null;
            return (
              <button
                type="button"
                key={n.id}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId((h) => (h === n.id ? null : h))}
                onFocus={() => setHoveredId(n.id)}
                onBlur={() => setHoveredId((h) => (h === n.id ? null : h))}
                onClick={() => setSelectedId((cur) => (cur === n.id ? null : n.id))}
                aria-label={`${n.label}. Click to see how this speaker connects.`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-off-black/60"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  width: `${(n.radius + 4) * 2}px`,
                  height: `${(n.radius + 4) * 2}px`,
                  background: "transparent",
                }}
              />
            );
          })}

        {/* Scholar hit targets. Same pattern as the speaker buttons --
            transparent circle over the canvas dot. Click opens the
            scholar's primary source in a new tab; hover updates the
            details panel without pinning. */}
        {nodes
          .filter((n) => n.kind === "scholar")
          .map((n) => {
            const pos = positions[n.id];
            if (!pos) return null;
            const scholar = n.scholarSlug ? scholarBySlug.get(n.scholarSlug) : undefined;
            return (
              <button
                type="button"
                key={n.id}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId((h) => (h === n.id ? null : h))}
                onFocus={() => setHoveredId(n.id)}
                onBlur={() => setHoveredId((h) => (h === n.id ? null : h))}
                onClick={() => {
                  if (scholar?.profileUrl) {
                    window.open(scholar.profileUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                aria-label={`${n.label}. Click to open her primary source.`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-off-black/60"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  width: `${(n.radius + 4) * 2}px`,
                  height: `${(n.radius + 4) * 2}px`,
                  background: "transparent",
                }}
              />
            );
          })}

        {/* Hover label. Floats above the focused node so the names
            don't clutter the layout in their resting state. */}
        {(() => {
          const focusId = hoveredId ?? selectedId;
          if (!focusId || (!focusId.startsWith("s:") && !focusId.startsWith("sc:"))) return null;
          const pos = positions[focusId];
          if (!pos) return null;
          const node = nodes.find((n) => n.id === focusId);
          if (!node) return null;
          return (
            <span
              className="pointer-events-none absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-off-black px-3 py-1 font-sans text-xs text-off-white shadow-md"
              style={{ left: `${pos.x}px`, top: `${pos.y - node.radius - 24}px` }}
            >
              {node.label}
            </span>
          );
        })()}

        {/* Footnote inside the canvas frame. */}
        <p className="pointer-events-none absolute bottom-4 left-4 right-4 font-sans text-xs text-off-black/55">
          Filled dots are 2026 speakers. Hollow rings are scholars. Lines connect each node to the fields its research touches.
        </p>
      </div>

      {/* Legend + details panel sit below the canvas so they can wrap
          freely on narrow viewports without overlapping the force
          layout. */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-off-black/70">
            {FIELDS.map((f) => (
              <li key={f.id} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-3.5 w-3.5 rounded-full ring-1 ring-off-black/15"
                  style={{ background: f.hue }}
                />
                {f.label}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-off-black/70">
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3.5 w-3.5 rounded-full ring-1 ring-off-black/15"
                style={{ background: "hsl(140 38% 38%)" }}
              />
              2026 speaker (placeholder roster)
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3.5 w-3.5 rounded-full ring-1 ring-off-black/15"
                style={{ background: "transparent", boxShadow: "inset 0 0 0 2px hsl(140 38% 38%)" }}
              />
              Scholar (external source)
            </li>
          </ul>
        </div>

        <div aria-live="polite" className="min-h-[3.5rem] rounded-2xl border border-off-black/10 bg-off-white/60 p-4">
          {hoveredScholar ? (
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-black/60">
                Scholar
              </p>
              <p className="font-serif text-xl text-off-black">{hoveredScholar.name}</p>
              <p className="font-sans text-sm text-off-black/75">{hoveredScholar.affiliation}</p>
              <p className="font-sans text-sm text-off-black/85">
                <span className="font-semibold">Bridges:</span>{" "}
                {Array.from(hoveredScholarFields ?? new Set<FieldId>()).map((f) => FIELDS.find((x) => x.id === f)?.shortLabel).filter(Boolean).join(" / ") || "--"}
              </p>
              {hoveredScholar.notableWorks[0] ? (
                <p className="font-sans text-sm text-off-black/85">
                  {hoveredScholar.notableWorks[0].title} ({hoveredScholar.notableWorks[0].year}) &mdash; {hoveredScholar.notableWorks[0].venue}
                </p>
              ) : null}
              <p className="font-sans text-sm text-off-black/65">
                <span className="font-semibold">Research areas:</span> {hoveredScholar.researchAreas.join(", ")}
              </p>
            </div>
          ) : selectedSpeaker ? (
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-off-black/60">
                {selectedSpeaker.keynote ? "Keynote" : "Speaker"}
              </p>
              <p className="font-serif text-xl text-off-black">{selectedSpeaker.name}</p>
              <p className="font-sans text-sm text-off-black/75">{selectedSpeaker.title} &middot; {selectedSpeaker.affiliation}</p>
              <p className="font-sans text-sm text-off-black/85">
                <span className="font-semibold">Bridges:</span>{" "}
                {Array.from(selectedSpeakerFields ?? new Set<FieldId>()).map((f) => FIELDS.find((x) => x.id === f)?.shortLabel).filter(Boolean).join(" / ") || "--"}
              </p>
              <p className="font-sans text-sm text-off-black/65">
                Tags: {selectedSpeaker.tags.join(", ")}
              </p>
            </div>
          ) : (
            <p className="font-sans text-sm text-off-black/55">
              Hover a dot to see the speaker. Click to pin their details here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function buildGraph(
  speakers: readonly Speaker[],
  scholars: readonly Scholar[],
): {
  nodes: SNode[];
  edges: Edge[];
  speakerFields: Map<string, Set<FieldId>>;
  scholarFields: Map<string, Set<FieldId>>;
} {
  const nodes: SNode[] = [];
  const edges: Edge[] = [];
  const speakerFields = new Map<string, Set<FieldId>>();
  const scholarFields = new Map<string, Set<FieldId>>();

  for (const f of FIELDS) {
    nodes.push({
      id: `f:${f.id}`,
      kind: "field",
      fieldId: f.id,
      label: f.label,
      radius: 18,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      fields: new Set([f.id]),
    });
  }

  for (const s of speakers) {
    const speakerFieldSet = new Set<FieldId>();
    for (const ra of s.researchAreas) {
      for (const f of FIELD_MAP[ra] ?? []) speakerFieldSet.add(f);
    }
    for (const tag of s.tags) {
      for (const f of FIELD_MAP[tag] ?? []) speakerFieldSet.add(f);
    }
    // Every speaker needs at least one field anchor or they have no
    // edges and the simulation flings them at the wall. Default to
    // consciousness since the current placeholder roster leans that
    // direction; the field map will catch real assignments.
    if (speakerFieldSet.size === 0) speakerFieldSet.add("consciousness");

    speakerFields.set(s.slug, speakerFieldSet);

    const id = `s:${s.slug}`;
    nodes.push({
      id,
      kind: "speaker",
      speakerSlug: s.slug,
      label: s.name,
      radius: s.keynote ? 8 : 6,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      fields: speakerFieldSet,
    });

    for (const f of speakerFieldSet) {
      edges.push({ a: id, b: `f:${f}`, fieldId: f });
    }
  }

  for (const sc of scholars) {
    const fieldSet = new Set<FieldId>(sc.fields);
    if (fieldSet.size === 0) fieldSet.add("consciousness");
    scholarFields.set(sc.slug, fieldSet);

    const id = `sc:${sc.slug}`;
    nodes.push({
      id,
      kind: "scholar",
      scholarSlug: sc.slug,
      label: sc.name,
      radius: 5,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      fields: fieldSet,
    });

    for (const f of fieldSet) {
      edges.push({ a: id, b: `f:${f}`, fieldId: f });
    }
  }

  return { nodes, edges, speakerFields, scholarFields };
}

// hsl(269 45% 55%) -> hsla(269, 45%, 55%, alpha)
function withAlpha(hsl: string, alpha: number): string {
  const match = hsl.match(/^hsl\(([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\)$/);
  if (!match) return hsl;
  const [, h, s, l] = match;
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}
