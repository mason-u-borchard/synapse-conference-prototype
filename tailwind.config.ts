import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        aubergine: {
          50: "hsl(var(--aubergine-50) / <alpha-value>)",
          100: "hsl(var(--aubergine-100) / <alpha-value>)",
          200: "hsl(var(--aubergine-200) / <alpha-value>)",
          400: "hsl(var(--aubergine-400) / <alpha-value>)",
          600: "hsl(var(--aubergine-600) / <alpha-value>)",
          800: "hsl(var(--aubergine-800) / <alpha-value>)",
          900: "hsl(var(--aubergine-900) / <alpha-value>)",
          950: "hsl(var(--aubergine-950) / <alpha-value>)",
        },
        ivory: {
          DEFAULT: "hsl(var(--ivory) / <alpha-value>)",
          warm: "hsl(var(--ivory-warm) / <alpha-value>)",
          deep: "hsl(var(--ivory-deep) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "hsl(var(--gold) / <alpha-value>)",
          muted: "hsl(var(--gold-muted) / <alpha-value>)",
          deep: "hsl(var(--gold-deep) / <alpha-value>)",
        },
        synapse: {
          cyan: "hsl(var(--synapse-cyan) / <alpha-value>)",
          magenta: "hsl(var(--synapse-magenta) / <alpha-value>)",
          plum: "hsl(var(--synapse-plum) / <alpha-value>)",
          peach: "hsl(var(--synapse-peach) / <alpha-value>)",
        },
        /* === Synapse v2 Figma tokens (warm/earthy palette).
           Sourced from synapse-figma-variables.json. Tier 100 is the
           lightest / most saturated; tier 400 is the deepest. */
        neutral: {
          100: "hsl(var(--neutral-100) / <alpha-value>)",
          200: "hsl(var(--neutral-200) / <alpha-value>)",
          300: "hsl(var(--neutral-300) / <alpha-value>)",
          400: "hsl(var(--neutral-400) / <alpha-value>)",
        },
        moss: {
          100: "hsl(var(--moss-100) / <alpha-value>)",
          200: "hsl(var(--moss-200) / <alpha-value>)",
          300: "hsl(var(--moss-300) / <alpha-value>)",
          400: "hsl(var(--moss-400) / <alpha-value>)",
        },
        amethyst: {
          100: "hsl(var(--amethyst-100) / <alpha-value>)",
          200: "hsl(var(--amethyst-200) / <alpha-value>)",
          300: "hsl(var(--amethyst-300) / <alpha-value>)",
          400: "hsl(var(--amethyst-400) / <alpha-value>)",
        },
        orchid: {
          100: "hsl(var(--orchid-100) / <alpha-value>)",
          200: "hsl(var(--orchid-200) / <alpha-value>)",
          300: "hsl(var(--orchid-300) / <alpha-value>)",
          400: "hsl(var(--orchid-400) / <alpha-value>)",
        },
        azure: {
          100: "hsl(var(--azure-100) / <alpha-value>)",
          200: "hsl(var(--azure-200) / <alpha-value>)",
          300: "hsl(var(--azure-300) / <alpha-value>)",
          400: "hsl(var(--azure-400) / <alpha-value>)",
        },
        oxide: {
          100: "hsl(var(--oxide-100) / <alpha-value>)",
          200: "hsl(var(--oxide-200) / <alpha-value>)",
          300: "hsl(var(--oxide-300) / <alpha-value>)",
          400: "hsl(var(--oxide-400) / <alpha-value>)",
        },
        fire: "hsl(var(--fire) / <alpha-value>)",
        "off-black": "hsl(var(--off-black) / <alpha-value>)",
        "off-white": "hsl(var(--off-white) / <alpha-value>)",
        "true-white": "hsl(var(--true-white) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "surface-raised": "hsl(var(--surface-raised) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        "border-strong": "hsl(var(--border-strong) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        noto: ["var(--font-noto-sans)", "Noto Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 7vw + 1rem, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5vw + 1rem, 4.75rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 3.5vw + 1rem, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        eyebrow: ["0.72rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 3vw, 2.5rem)",
        section: "clamp(4rem, 8vw, 7rem)",
      },
      maxWidth: {
        prose: "68ch",
        gallery: "84rem",
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
      },
      boxShadow: {
        paper: "0 1px 0 hsl(var(--border) / 1), 0 12px 32px -18px hsl(var(--aubergine-950) / 0.35)",
        glow: "0 0 0 1px hsl(var(--gold) / 0.25), 0 0 40px -8px hsl(var(--gold) / 0.35)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms var(--ease-out-expo) both",
        "pulse-soft": "pulse-soft 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
