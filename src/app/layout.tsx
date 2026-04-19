import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Concierge } from "@/components/concierge/concierge";
import { meta } from "@/lib/content";
import { ThemeProvider } from "@/components/theme-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://masonborchard.com";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${meta.name} \u00b7 ${meta.subtitle}`,
    template: `%s \u00b7 ${meta.name}`,
  },
  description: meta.mission,
  applicationName: meta.name,
  keywords: [
    "consciousness",
    "cognitive neuroscience",
    "philosophy of mind",
    "AI alignment",
    "women in science",
    "Atlanta",
    "academic conference",
    meta.edition,
  ],
  openGraph: {
    title: `${meta.name} \u00b7 ${meta.subtitle}`,
    description: meta.mission,
    type: "website",
    url: basePath || "/",
    siteName: meta.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.name} \u00b7 ${meta.subtitle}`,
    description: meta.mission,
  },
  robots: { index: false, follow: false },
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
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
