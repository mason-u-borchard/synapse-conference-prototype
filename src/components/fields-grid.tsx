// Four fields, one thread. The framing and field names align with the
// committee's reference build at whp.vercel.app. Copy below is close
// to that version's wording because the committee has converged on
// this scope; adjust in place as final copy is agreed.
const fields = [
  {
    label: "Consciousness",
    body: "Post-materialist frameworks, rigorous controversial research, and the ethics of studying mind itself.",
  },
  {
    label: "Artificial intelligence",
    body: "What does it mean to midwife AI into a world worth living in? Whose values get encoded, and whose get erased?",
  },
  {
    label: "Cognitive science",
    body: "The development of minds across the lifespan, cognitive security, and how young brains grow up in the age of AI.",
  },
  {
    label: "Robotics & embodiment",
    body: "Physical embodiment, relational intelligence, and the bodies -- human and otherwise -- we are building into the future.",
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
