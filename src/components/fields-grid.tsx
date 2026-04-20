// Four fields, one thread. Field-card copy follows the committee's
// approved Website Copy doc (Kelly's "Synapse_Website_Copy"),
// Section 04.
const fields = [
  {
    label: "Consciousness",
    body: "Post-materialist frameworks, rigorous and controversial research, and the question the field keeps avoiding: what is experience, and how do we study it honestly?",
  },
  {
    label: "Artificial intelligence",
    body: "What does it mean to midwife AI into a world worth living in? Whose values get encoded -- and whose get erased -- when the people building the systems have never had to fight for a seat at the table?",
  },
  {
    label: "Cognitive science",
    body: "How minds develop, adapt, and are shaped -- across the lifespan, across cultures, and now across an age of AI that is rewriting the conditions of cognition in real time.",
  },
  {
    label: "Robotics & embodiment",
    body: "Physical embodiment, relational intelligence, and a central question: what do we encode in the bodies -- human and otherwise -- that we are building into the future?",
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
