/** @type {import('next').NextConfig} */

// trim() defends against trailing newlines / whitespace that sometimes
// creep into env vars when pasted through a hosting UI.
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim();
const basePath = rawBasePath.replace(/\/$/, "");

// CSP is written with the Vercel AI SDK streaming endpoint in mind plus
// the Stripe Checkout redirect. When the committee finalizes a donation
// backend, re-audit the connect-src list below.
// The Virtuous donation loader pulls in third-party dependencies it needs
// to render a payment form: hCaptcha (anti-bot, required before submit),
// Google (reCAPTCHA fallback + gstatic fonts), and jsdelivr / cdnjs for
// Virtuous's own polyfills. All of these are standard for CRM-hosted
// donation embeds; dropping any one of them breaks the form in practice.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://cdn.virtuoussoftware.com https://*.virtuoussoftware.com https://js.hcaptcha.com https://*.hcaptcha.com https://www.google.com https://www.gstatic.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://*.virtuoussoftware.com https://*.hcaptcha.com https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com https://*.virtuoussoftware.com https://stackpath.bootstrapcdn.com https://cdnjs.cloudflare.com",
  "connect-src 'self' https://api.openai.com https://api.anthropic.com https://api.stripe.com https://*.upstash.io https://sheets.googleapis.com https://*.virtuoussoftware.com https://*.virtuousapi.com https://*.hcaptcha.com https://www.google.com https://*.launchdarkly.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.virtuoussoftware.com https://*.hcaptcha.com https://newassets.hcaptcha.com https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://*.virtuoussoftware.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// BUILD_MODE=export produces a static site in ./out/ for rsync to a plain
// webserver. API routes (chat/donate/submit-form) are skipped in that mode;
// the UI already degrades to offline fallbacks for each. Dynamic builds
// keep server features and security headers.
const isStaticExport = process.env.BUILD_MODE === "export";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    unoptimized: isStaticExport,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  // Headers are only applied by the Next.js server; static export serves
  // from nginx, which should apply its own CSP/HSTS. Guard so the build
  // does not warn about header-config being inapplicable.
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "Content-Security-Policy", value: cspDirectives },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                },
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ],
            },
          ];
        },
      }),
};

module.exports = nextConfig;
