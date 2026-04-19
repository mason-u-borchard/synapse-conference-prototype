import type { FaqEntry } from "@/types/content";

export function FaqPreview({ items }: { items: readonly FaqEntry[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.id} className="group py-5">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
            <span className="font-serif text-xl text-ink">{item.question}</span>
            <span className="font-mono text-xs text-muted-foreground transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-pretty text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
