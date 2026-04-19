"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Speaker } from "@/types/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SNode {
  id: string;
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  kind: "speaker" | "tag";
  speakerSlug?: string;
  label: string;
}

interface Edge { a: string; b: string; }

export function SpeakerConstellation({ speakers, activeTag }: { speakers: readonly Speaker[]; activeTag: string | null; }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; kind: SNode["kind"] }>>({});
  const prefersReduced = useReducedMotion();

  const { nodes, edges } = useMemo(() => buildGraph(speakers), [speakers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const live: SNode[] = nodes.map((n) => ({ ...n }));
    let width = 0, height = 0;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    function size() {
      const rect = wrapper!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const speakerNodes = live.filter((n) => n.kind === "speaker");
      const tagNodes = live.filter((n) => n.kind === "tag");
      const cx = width / 2, cy = height / 2;
      speakerNodes.forEach((n, i) => {
        const a = (i / speakerNodes.length) * Math.PI * 2;
        n.x = cx + Math.cos(a) * Math.min(width, height) * 0.2;
        n.y = cy + Math.sin(a) * Math.min(width, height) * 0.2;
      });
      tagNodes.forEach((n, i) => {
        const a = (i / tagNodes.length) * Math.PI * 2 + Math.PI / tagNodes.length;
        n.x = cx + Math.cos(a) * Math.min(width, height) * 0.4;
        n.y = cy + Math.sin(a) * Math.min(width, height) * 0.4;
      });
    }

    size();
    let raf = 0;

    function tick() {
      const cx = width / 2, cy = height / 2;
      for (const n of live) {
        n.vx += (cx - n.x) * 0.0025;
        n.vy += (cy - n.y) * 0.0025;
        for (const m of live) {
          if (m.id === n.id) continue;
          const dx = n.x - m.x, dy = n.y - m.y;
          const d2 = dx * dx + dy * dy + 50;
          const repel = 2200 / d2;
          n.vx += (dx / Math.sqrt(d2)) * repel;
          n.vy += (dy / Math.sqrt(d2)) * repel;
        }
      }
      for (const e of edges) {
        const a = live.find((x) => x.id === e.a)!;
        const b = live.find((x) => x.id === e.b)!;
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) + 0.01;
        const force = (d - 130) * 0.012;
        a.vx += (dx / d) * force;
        a.vy += (dy / d) * force;
        b.vx -= (dx / d) * force;
        b.vy -= (dy / d) * force;
      }
      for (const n of live) {
        n.vx *= 0.82; n.vy *= 0.82;
        n.x += n.vx; n.y += n.vy;
        const pad = 40;
        n.x = Math.min(width - pad, Math.max(pad, n.x));
        n.y = Math.min(height - pad, Math.max(pad, n.y));
      }

      ctx!.clearRect(0, 0, width, height);
      for (const e of edges) {
        const a = live.find((x) => x.id === e.a)!;
        const b = live.find((x) => x.id === e.b)!;
        const highlight = hovered && (e.a === hovered || e.b === hovered);
        const dim = (activeTag && !isActiveEdge(e, live, activeTag)) || (hovered && !highlight);
        ctx!.strokeStyle = highlight
          ? "hsl(var(--gold) / 0.9)"
          : "hsl(var(--border-strong) / " + (dim ? "0.18" : "0.55") + ")";
        ctx!.lineWidth = highlight ? 1.6 : 0.8;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }
      for (const n of live) {
        const isHover = hovered === n.id;
        const dim = activeTag && n.kind === "tag" && n.label !== activeTag;
        ctx!.fillStyle =
          n.kind === "speaker"
            ? (isHover ? "hsl(var(--gold))" : "hsl(var(--aubergine-800))")
            : "hsl(var(--aubergine-400) / " + (dim ? "0.3" : "0.9") + ")";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius + (isHover ? 3 : 0), 0, Math.PI * 2);
        ctx!.fill();
      }
      const next: Record<string, { x: number; y: number; kind: SNode["kind"] }> = {};
      for (const n of live) next[n.id] = { x: n.x, y: n.y, kind: n.kind };
      setPositions(next);

      if (!prefersReduced) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(size);
    ro.observe(wrapper);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [nodes, edges, hovered, activeTag, prefersReduced]);

  return (
    <div ref={wrapperRef} className="relative h-[560px] w-full overflow-hidden rounded-card border border-border bg-surface-raised">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {nodes.map((n) => {
        const pos = positions[n.id];
        if (!pos) return null;
        if (n.kind === "speaker") {
          return (
            <Link
              key={n.id}
              href={`/speakers/${n.speakerSlug}`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered((h) => (h === n.id ? null : h))}
              className="absolute -translate-x-1/2 translate-y-3 whitespace-nowrap font-serif text-sm text-ink hover:underline"
              style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            >{n.label}</Link>
          );
        }
        return (
          <span
            key={n.id}
            className="eyebrow pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-pill border border-border bg-surface px-2 py-0.5 text-[10px]"
            style={{ left: `${pos.x}px`, top: `${pos.y - 18}px` }}
          >{n.label}</span>
        );
      })}
      <p className="pointer-events-none absolute bottom-4 left-4 right-4 text-xs text-muted-foreground">
        Hover a name to highlight shared research areas. Click to open the speaker's page.
      </p>
    </div>
  );
}

function buildGraph(speakers: readonly Speaker[]): { nodes: SNode[]; edges: Edge[] } {
  const nodes: SNode[] = [];
  const edges: Edge[] = [];
  const tagSeen = new Set<string>();
  for (const s of speakers) {
    nodes.push({ id: `s:${s.slug}`, x: 0, y: 0, vx: 0, vy: 0, radius: 6, kind: "speaker", label: s.name.replace(/^Dr\. /, ""), speakerSlug: s.slug });
    for (const tag of s.tags) {
      if (!tagSeen.has(tag)) {
        tagSeen.add(tag);
        nodes.push({ id: `t:${tag}`, x: 0, y: 0, vx: 0, vy: 0, radius: 4, kind: "tag", label: tag });
      }
      edges.push({ a: `s:${s.slug}`, b: `t:${tag}` });
    }
  }
  return { nodes, edges };
}

function isActiveEdge(edge: Edge, nodes: SNode[], activeTag: string): boolean {
  if (edge.a.startsWith("t:") || edge.b.startsWith("t:")) {
    return edge.a === `t:${activeTag}` || edge.b === `t:${activeTag}`;
  }
  const tagNode = nodes.find((n) => n.label === activeTag && n.kind === "tag");
  if (!tagNode) return false;
  return edge.a === tagNode.id || edge.b === tagNode.id;
}
