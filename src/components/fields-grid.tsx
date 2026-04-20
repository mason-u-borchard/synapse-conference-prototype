// Four fields the convening holds in one conversation. Text is
// placeholder copy the committee can replace; the structure (four
// cards, two rows on md) is what matters.
const fields = [
  {
    label: "Consciousness",
    body: "The old question -- what is it like to be a subject? -- asked with contemporary tools and without the patience for vague answers.",
  },
  {
    label: "Cognitive neuroscience",
    body: "What the brain actually does, measured at the scales the question demands. Perception, attention, memory, and the failure modes that reveal the work.",
  },
  {
    label: "Philosophy of mind",
    body: "The conceptual scaffolding the empirical work rests on, examined in public. Where the data runs out, what replaces it should not be vibes.",
  },
  {
    label: "Machine intelligence",
    body: "What we are building, and what that building reveals about thinking. Alignment, interpretability, agency, and the ways synthetic systems are shadows of the biological.",
  },
];

export function FieldsGrid() {
  return (
    <ol className="grid gap-6 md:grid-cols-2 md:gap-8">
      {fields.map((field, idx) => (
        <li key={field.label} className="paper relative flex flex-col p-7">
          <span className="eyebrow absolute left-7 top-6 text-muted-foreground">
            0{idx + 1}
          </span>
          <div className="mt-10">
            <h3 className="font-serif text-2xl text-ink">{field.label}</h3>
            <p className="mt-3 text-pretty text-muted-foreground">{field.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
