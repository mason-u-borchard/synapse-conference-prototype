// One-off diagnostic for /donate. Captures:
//  - all console messages
//  - all page errors
//  - all network requests to Virtuous / Stripe / hCaptcha hosts
//  - response status + body snippet for the costs API (the original CORS failure)
//  - whether the form actually rendered
//  - what the bottom-line text reads after picking a preset

import { chromium } from "playwright";

const URL = process.env.TARGET || "https://thesynapse.co/donate";

const VIRTUOUS_HOSTS = [
  "virtuoussoftware.com",
  "givevirtuous.org",
  "cdn.virtuoussoftware.com",
  "donateapi.givevirtuous.org",
  "forms.virtuoussoftware.com",
];

function isInteresting(url) {
  return VIRTUOUS_HOSTS.some((h) => url.includes(h)) ||
    url.includes("stripe.com") ||
    url.includes("hcaptcha.com");
}

const consoleMsgs = [];
const pageErrors = [];
const requests = [];
const responses = [];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();

page.on("console", (msg) => {
  consoleMsgs.push(`[${msg.type()}] ${msg.text()}`);
});
page.on("pageerror", (err) => {
  pageErrors.push(err.message);
});
page.on("requestfailed", (req) => {
  if (isInteresting(req.url())) {
    responses.push({
      url: req.url(),
      method: req.method(),
      status: "FAILED",
      failure: req.failure()?.errorText || "unknown",
    });
  }
});
page.on("request", (req) => {
  if (isInteresting(req.url())) {
    requests.push({ url: req.url(), method: req.method() });
  }
});
page.on("response", async (res) => {
  if (!isInteresting(res.url())) return;
  let bodySnippet = null;
  try {
    const buf = await res.body();
    const isFormConfig = /forms\.virtuoussoftware\.com\/api\/Form\/\d+\?/.test(res.url());
    bodySnippet = buf.toString("utf8").slice(0, isFormConfig ? 12000 : 400);
    if (isFormConfig) {
      const fs = await import("fs");
      fs.writeFileSync("/tmp/form-config.json", buf.toString("utf8"));
    }
  } catch {
    bodySnippet = "<body unavailable>";
  }
  responses.push({
    url: res.url(),
    status: res.status(),
    statusText: res.statusText(),
    bodySnippet,
  });
});

console.log(`\n=== Loading ${URL} ===\n`);
await page.goto(URL, { waitUntil: "networkidle", timeout: 30_000 }).catch((e) => {
  console.log("goto error:", e.message);
});

// give the embed time to fetch its config + render
await page.waitForTimeout(4000);

// Try to find the actual Virtuous form root. Look for any iframe or
// known Virtuous DOM markers.
const formInfo = await page.evaluate(() => {
  const iframes = Array.from(document.querySelectorAll("iframe")).map((f) => ({
    src: f.src,
    name: f.name,
    w: f.clientWidth,
    h: f.clientHeight,
  }));
  const virtuousNodes = Array.from(
    document.querySelectorAll("[class*=virtuous], [id*=virtuous], [class*=vg-]")
  ).slice(0, 8).map((n) => ({
    tag: n.tagName,
    cls: n.className?.toString().slice(0, 80),
    id: n.id,
  }));
  // Look for any visible $X.XX text on the page.
  const allText = document.body.innerText;
  const dollarMatches = allText.match(/\$[\d,]+\.\d{2}/g) || [];
  const bottomLineHints = allText.match(/your\s+donation[^\n]{0,80}/gi) || [];
  return { iframes, virtuousNodes, dollarMatches, bottomLineHints };
});

await page.screenshot({ path: "/tmp/donate-state.png", fullPage: true });

console.log("=== CONSOLE MESSAGES ===");
for (const m of consoleMsgs) console.log(m);

console.log("\n=== PAGE ERRORS ===");
for (const e of pageErrors) console.log(e);

console.log("\n=== INTERESTING REQUESTS ===");
for (const r of requests) console.log(`${r.method} ${r.url}`);

console.log("\n=== INTERESTING RESPONSES ===");
for (const r of responses) {
  console.log(`${r.status} ${r.statusText || ""} ${r.url}`);
  if (r.failure) console.log(`  failure: ${r.failure}`);
  if (r.bodySnippet) console.log(`  body: ${r.bodySnippet.replace(/\s+/g, " ")}`);
}

console.log("\n=== FORM RENDER ===");
console.log("iframes:", JSON.stringify(formInfo.iframes, null, 2));
console.log("virtuous nodes:", JSON.stringify(formInfo.virtuousNodes, null, 2));
console.log("dollar values on page:", formInfo.dollarMatches);
console.log("bottom-line hints:", formInfo.bottomLineHints);

await browser.close();
console.log("\nScreenshot: /tmp/donate-state.png");
