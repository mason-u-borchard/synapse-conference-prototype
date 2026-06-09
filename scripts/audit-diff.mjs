#!/usr/bin/env node
// audit-diff: capture prod (thesynapse.co) + local (localhost:3021)
// at the same viewports for every audit-affected route, drop the
// screenshots into /tmp/synapse-diff/, and emit an index.html that
// renders them side-by-side for visual comparison.
//
// Usage: node scripts/audit-diff.mjs
//        node scripts/audit-diff.mjs --local-port 3022
//        node scripts/audit-diff.mjs --routes /faq,/ethos

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a) => a.replace(/^--/, "").split("="))
    .map(([k, v]) => [k, v ?? true]),
);

const PROD = "https://thesynapse.co";
const LOCAL = `http://localhost:${args["local-port"] ?? 3021}`;
const OUT = "/tmp/synapse-diff";

const ROUTES = (args.routes
  ? String(args.routes).split(",")
  : ["/", "/faq", "/attend", "/ethos", "/about", "/apply"]
).map((r) => (r.startsWith("/") ? r : `/${r}`));

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 900 },
  { name: "mobile", width: 414, height: 900 },
];

const safe = (s) => s.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "root";

async function capture(page, url, file) {
  try {
    const resp = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });
    if (!resp) throw new Error("no response");
    if (resp.status() >= 400) throw new Error(`http ${resp.status()}`);
    // Disable the Ava launcher + reCAPTCHA badge so they don't sit on top of content.
    await page.addStyleTag({
      content: `
        [aria-label*="Ava" i], .grecaptcha-badge { display: none !important; }
      `,
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: file, fullPage: true });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const grid = []; // [{route, viewport, prod, local, prodErr, localErr}]

  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await ctx.newPage();
      const slug = `${safe(route)}__${vp.name}`;
      const prodFile = `${OUT}/${slug}__prod.png`;
      const localFile = `${OUT}/${slug}__local.png`;

      const prod = await capture(page, PROD + route, prodFile);
      const local = await capture(page, LOCAL + route, localFile);

      grid.push({
        route,
        vp,
        prodFile: prod.ok ? `${slug}__prod.png` : null,
        localFile: local.ok ? `${slug}__local.png` : null,
        prodErr: prod.ok ? null : prod.error,
        localErr: local.ok ? null : local.error,
      });

      const tag = `${route} @${vp.name}`;
      console.log(
        `  ${tag.padEnd(28)} prod:${prod.ok ? "ok" : "FAIL " + prod.error}  local:${local.ok ? "ok" : "FAIL " + local.error}`,
      );

      await ctx.close();
    }
  }

  await browser.close();

  // Index.html: sticky-tab navigation across routes, three viewport
  // panels per route, prod on left and local on right.
  const css = `
    :root { --gap: 12px; --bg: #f5f1ee; --panel: #fff; --rule: #0001; --accent: #c14000; }
    * { box-sizing: border-box; }
    body { margin: 0; font: 14px/1.45 -apple-system,system-ui,Segoe UI,sans-serif; background: var(--bg); color: #111; }
    header { position: sticky; top: 0; z-index: 10; background: #fff; border-bottom: 1px solid var(--rule); padding: 10px 18px; }
    nav a { display: inline-block; margin-right: 10px; padding: 4px 10px; border-radius: 6px; color: #111; text-decoration: none; background: #f0ebe6; }
    nav a:hover, nav a.active { background: var(--accent); color: #fff; }
    h2 { margin: 32px 18px 8px; font-weight: 600; }
    h3 { margin: 24px 18px 6px; font-weight: 500; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gap); padding: 0 18px 12px; }
    .pane { background: var(--panel); border: 1px solid var(--rule); border-radius: 8px; overflow: hidden; }
    .pane .label { display: flex; justify-content: space-between; padding: 6px 10px; background: #fafafa; border-bottom: 1px solid var(--rule); font: 600 12px/1 ui-monospace,monospace; }
    .pane.local .label { color: var(--accent); }
    .pane img { display: block; width: 100%; height: auto; }
    .err { padding: 14px; color: #a33; font: 13px ui-monospace,monospace; }
    .toc { padding: 18px; }
  `;

  const byRoute = new Map();
  for (const r of grid) {
    if (!byRoute.has(r.route)) byRoute.set(r.route, []);
    byRoute.get(r.route).push(r);
  }

  const routeAnchor = (route) => `route-${safe(route)}`;

  const nav = [...byRoute.keys()]
    .map((r) => `<a href="#${routeAnchor(r)}">${r}</a>`)
    .join("");

  const sections = [...byRoute.entries()]
    .map(([route, rows]) => {
      const blocks = rows
        .map((row) => {
          const prodCell = row.prodFile
            ? `<img src="${row.prodFile}" alt="prod ${route} ${row.vp.name}">`
            : `<div class="err">prod failed: ${row.prodErr}</div>`;
          const localCell = row.localFile
            ? `<img src="${row.localFile}" alt="local ${route} ${row.vp.name}">`
            : `<div class="err">local failed: ${row.localErr}</div>`;
          return `
            <h3>${row.vp.name} — ${row.vp.width}×${row.vp.height}</h3>
            <div class="row">
              <div class="pane prod">
                <div class="label"><span>prod</span><span>${PROD}${route}</span></div>
                ${prodCell}
              </div>
              <div class="pane local">
                <div class="label"><span>local</span><span>${LOCAL}${route}</span></div>
                ${localCell}
              </div>
            </div>`;
        })
        .join("");
      return `<section id="${routeAnchor(route)}"><h2>${route}</h2>${blocks}</section>`;
    })
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Synapse audit diff — prod vs local</title>
  <style>${css}</style>
</head>
<body>
  <header><nav>${nav}</nav></header>
  <main>${sections}</main>
  <script>
    const links = document.querySelectorAll('nav a');
    const sections = [...document.querySelectorAll('main section')];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      }
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((s) => io.observe(s));
  </script>
</body>
</html>`;

  await writeFile(`${OUT}/index.html`, html);
  console.log(`\nOpen: file://${OUT}/index.html`);
}

if (!existsSync("node_modules/playwright")) {
  console.error("playwright not installed -- run from the prototype root");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
