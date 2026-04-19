import { cx } from "@/lib/cx";
import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  heading?: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  tone?: "surface" | "raised";
  bleed?: boolean;
  children: ReactNode;
}

export function Section({
  eyebrow,
  heading,
  lede,
  align = "start",
  tone = "surface",
  bleed = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cx("relative py-section", tone === "raised" && "bg-surface-raised", className)} {...rest}>
      <div className={cx(!bleed && "container-gutter")}>
        {(eyebrow || heading || lede) && (
          <header className={cx("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {heading && <h2 className="text-display-md text-balance">{heading}</h2>}
            {lede && <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
