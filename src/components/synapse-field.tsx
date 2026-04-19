"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  baseX: number; baseY: number;
  phase: number; charge: number;
  firing: number;
}

interface Link { a: number; b: number; dist: number; }

interface Pulse { from: number; to: number; t: number; strength: number; }

/**
 * Canvas-driven synapse field. Reads CSS tokens at mount so the palette
 * matches whichever theme is active; a mutation observer on <html>
 * re-reads tokens on theme toggle so the field doesn't need to remount.
 *
 * Three visual registers: drifting soma nodes, distance-faded neighbor
 * connections, and short propagating pulses that run along the graph.
 * Pointer proximity biases nearby nodes; a click fires a chain reaction.
 * With reduced-motion requested the field renders a single still frame.
 */
export function SynapseField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const state = {
      width: 0, height: 0,
      dpr: Math.min(window.devicePixelRatio ?? 1, 2),
      nodes: [] as Node[],
      links: [] as Link[],
      pulses: [] as Pulse[],
      pointer: { x: -9999, y: -9999, active: false },
      palette: readPalette(),
    };

    function readPalette() {
      const style = getComputedStyle(document.documentElement);
      const hsl = (name: string) => `hsl(${style.getPropertyValue(name).trim()})`;
      return {
        node: hsl("--aubergine-800"),
        nodeDim: hsl("--aubergine-400"),
        link: hsl("--border-strong"),
        pulse: hsl("--gold"),
        accent: hsl("--synapse-magenta"),
        surface: hsl("--surface"),
      };
    }

    function size() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      canvas!.width = Math.floor(rect.width * state.dpr);
      canvas!.height = Math.floor(rect.height * state.dpr);
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx!.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      generateNodes();
    }

    function generateNodes() {
      const target = Math.round(state.width * state.height * 0.00012);
      const count = Math.max(28, Math.min(72, target));
      const cols = Math.ceil(Math.sqrt((count * state.width) / state.height));
      const rows = Math.ceil(count / cols);
      const cellW = state.width / cols;
      const cellH = state.height / rows;
      state.nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (state.nodes.length >= count) break;
          const x = c * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.6;
          const y = r * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.6;
          state.nodes.push({
            x, y, vx: 0, vy: 0,
            baseX: x, baseY: y,
            phase: Math.random() * Math.PI * 2,
            charge: 0.35 + Math.random() * 0.65,
            firing: 0,
          });
        }
      }
      rebuildLinks();
    }

    function rebuildLinks() {
      const maxLinkDist = Math.min(state.width, state.height) * 0.22;
      state.links = [];
      for (let i = 0; i < state.nodes.length; i++) {
        for (let j = i + 1; j < state.nodes.length; j++) {
          const a = state.nodes[i]!;
          const b = state.nodes[j]!;
          const d = Math.hypot(a.baseX - b.baseX, a.baseY - b.baseY);
          if (d < maxLinkDist) state.links.push({ a: i, b: j, dist: d });
        }
      }
    }

    function step(now: number) {
      const w = state.width, h = state.height;
      ctx!.clearRect(0, 0, w, h);

      const grd = ctx!.createRadialGradient(w / 2, h / 2, w * 0.1, w / 2, h / 2, w * 0.7);
      grd.addColorStop(0, "rgba(0,0,0,0)");
      grd.addColorStop(1, state.palette.surface);
      ctx!.fillStyle = grd;
      ctx!.globalAlpha = 0.35;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalAlpha = 1;

      const t = now / 1000;
      for (const n of state.nodes) {
        const breathe = Math.sin(t * 0.5 + n.phase) * 2.2;
        n.x = n.baseX + Math.cos(t * 0.35 + n.phase) * 4 + breathe;
        n.y = n.baseY + Math.sin(t * 0.45 + n.phase * 1.3) * 4;

        if (state.pointer.active) {
          const dx = state.pointer.x - n.x;
          const dy = state.pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            const pull = (1 - d / 140) * 6;
            n.x += (dx / d) * pull;
            n.y += (dy / d) * pull;
          }
        }
        n.firing *= 0.93;
      }

      for (let i = state.pulses.length - 1; i >= 0; i--) {
        const p = state.pulses[i]!;
        p.t += 0.018 * p.strength;
        if (p.t >= 1) {
          const target = state.nodes[p.to];
          if (target) {
            target.firing = Math.min(1, target.firing + 0.9);
            const outgoing = state.links.filter(
              (l) => (l.a === p.to || l.b === p.to) && Math.random() < 0.28,
            );
            for (const l of outgoing) {
              const nextTo = l.a === p.to ? l.b : l.a;
              state.pulses.push({ from: p.to, to: nextTo, t: 0, strength: p.strength * 0.6 });
            }
          }
          state.pulses.splice(i, 1);
          continue;
        }
        const from = state.nodes[p.from];
        const to = state.nodes[p.to];
        if (!from || !to) { state.pulses.splice(i, 1); continue; }
        const x = from.x + (to.x - from.x) * p.t;
        const y = from.y + (to.y - from.y) * p.t;
        ctx!.beginPath();
        ctx!.arc(x, y, 2 + 1.5 * p.strength, 0, Math.PI * 2);
        ctx!.fillStyle = state.palette.pulse;
        ctx!.globalAlpha = 0.65 * p.strength;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      const maxLinkDist = Math.min(w, h) * 0.22;
      for (const link of state.links) {
        const a = state.nodes[link.a]!;
        const b = state.nodes[link.b]!;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > maxLinkDist) continue;
        const alpha = Math.max(0, 1 - d / maxLinkDist) * 0.24;
        const firing = Math.max(a.firing, b.firing);
        ctx!.strokeStyle = firing > 0.2 ? state.palette.pulse : state.palette.link;
        ctx!.globalAlpha = alpha + firing * 0.35;
        ctx!.lineWidth = 0.6 + firing * 1.4;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      for (const n of state.nodes) {
        const pulse = (Math.sin(t * 1.4 + n.phase) * 0.5 + 0.5) * n.charge;
        const baseRadius = 1.6 + pulse * 0.8;
        const fire = n.firing;

        if (fire > 0.05) {
          ctx!.beginPath();
          ctx!.fillStyle = state.palette.pulse;
          ctx!.globalAlpha = fire * 0.35;
          ctx!.arc(n.x, n.y, 14 * fire, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, baseRadius + fire * 1.8, 0, Math.PI * 2);
        ctx!.fillStyle = fire > 0.1 ? state.palette.accent : state.palette.node;
        ctx!.globalAlpha = 0.55 + pulse * 0.35 + fire * 0.3;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      frameRef.current = requestAnimationFrame(step);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      state.pointer.x = e.clientX - rect.left;
      state.pointer.y = e.clientY - rect.top;
      state.pointer.active = true;
    }
    function onPointerLeave() {
      state.pointer.active = false;
      state.pointer.x = state.pointer.y = -9999;
    }
    function onClick(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      let closest = 0, best = Infinity;
      for (let i = 0; i < state.nodes.length; i++) {
        const n = state.nodes[i]!;
        const d = Math.hypot(n.x - cx, n.y - cy);
        if (d < best) { best = d; closest = i; }
      }
      if (best < 80) {
        state.nodes[closest]!.firing = 1;
        const outgoing = state.links.filter((l) => l.a === closest || l.b === closest);
        for (const l of outgoing) {
          const to = l.a === closest ? l.b : l.a;
          state.pulses.push({ from: closest, to, t: 0, strength: 1 });
        }
      }
    }

    size();
    if (prefersReduced) step(0);
    else frameRef.current = requestAnimationFrame(step);

    const ro = new ResizeObserver(() => {
      state.palette = readPalette();
      size();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const mo = new MutationObserver(() => { state.palette = readPalette(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onClick);

    const autonomous = window.setInterval(() => {
      if (state.pulses.length > 8 || state.nodes.length < 4) return;
      const from = Math.floor(Math.random() * state.nodes.length);
      const candidates = state.links.filter((l) => l.a === from || l.b === from);
      if (candidates.length === 0) return;
      const pick = candidates[Math.floor(Math.random() * candidates.length)]!;
      const to = pick.a === from ? pick.b : pick.a;
      state.pulses.push({ from, to, t: 0, strength: 0.8 });
    }, 2600);

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onClick);
      window.clearInterval(autonomous);
    };
  }, [prefersReduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-auto absolute inset-0 h-full w-full" />;
}
