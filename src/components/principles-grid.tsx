import { meta } from "@/lib/content";

export function PrinciplesGrid() {
  return (
    <ol className="grid gap-6 md:grid-cols-2 md:gap-8">
      {meta.principles.map((principle, idx) => (
        <li key={principle.title} className="paper relative flex flex-col p-7">
          <span className="eyebrow absolute left-7 top-6 text-muted-foreground">0{idx + 1}</span>
          <div className="mt-10">
            <h3 className="font-serif text-2xl text-ink">{principle.title}</h3>
            <p className="mt-3 text-pretty text-muted-foreground">{principle.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
