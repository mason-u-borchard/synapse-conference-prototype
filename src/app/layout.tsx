import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Sans, JetBrains_Mono, Style_Script } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Concierge } from "@/components/concierge/concierge";
import { meta } from "@/lib/content";
import { ThemeProvider } from "@/components/theme-provider";
import { GlowTracker } from "@/components/glow-tracker";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});
// Inter for body subhead / paragraph (24px in the Hero per Figma).
// Noto Sans for buttons + nav items (per Figma's Hero export).
// (Roboto exists in Taylor's body/xs/@ token but isn't used anywhere in
// the Hero design, so we don't load it here yet -- add later if needed.)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-noto-sans", display: "swap" });
// Style Script is used for Julia's signature on the About page
// dedication card. Single weight is fine -- it's only used in one place.
const styleScript = Style_Script({ subsets: ["latin"], weight: "400", variable: "--font-style-script", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesynapse.co";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Home + global default metadata. Per-page SEO titles/descriptions
// (About, Ethos, Invest, Attend) are set in each page's own metadata
// export per Kelly's 2026-05-26 SEO copy; the values here are the home
// page's and the fallback for anything that doesn't override.
const HOME_TITLE = "The Synapse | AI, Cognitive Science & Consciousness";
const HOME_DESCRIPTION =
  "A three-day interdisciplinary gathering where women explore AI, robotics, cognitive science, consciousness, and the futures emerging between them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: HOME_TITLE,
    template: `%s \u00b7 ${meta.name}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: meta.name,
  keywords: [
    "consciousness",
    "cognitive neuroscience",
    "philosophy of mind",
    "AI alignment",
    "women in science",
    "San Diego",
    "academic conference",
    meta.edition,
  ],
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    type: "website",
    url: basePath || "/",
    siteName: meta.name,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  // Site-wide indexing allowed now that thesynapse.co is the live
  // production site. Pages that should stay unlisted -- /apply,
  // /program, /constellation -- set their own page-level
  // `robots: { index: false, follow: false }` which overrides this.
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0716" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} ${notoSans.variable} ${styleScript.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-surface"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="min-h-[calc(100vh-64px)]">{children}</main>
          <SiteFooter />
          <Concierge />
          <GlowTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
