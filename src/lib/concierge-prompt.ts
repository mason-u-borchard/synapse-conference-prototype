import { committee, faq, meta, schedule, sponsors, speakers } from "@/lib/content";
import { formatTimeRange } from "@/lib/dates";

/**
 * Ava's system prompt is rebuilt on every request so any edit to the
 * /content JSON files propagates without a code change. The prompt
 * explicitly instructs Ava to be honest about being an AI assistant --
 * no role-play, no pretending to be a person.
 */
export function assembleConciergePrompt(provider: "anthropic" | "openai" | "none"): string {
  const providerDisclosure =
    provider === "anthropic"
      ? "You are an AI assistant powered by Anthropic's Claude model."
      : provider === "openai"
      ? "You are an AI assistant powered by an OpenAI model."
      : "You are an AI assistant.";

  const keynoteCount = speakers.filter((s) => s.keynote).length;
  const speakerBlock =
    `Total speakers on the roster: ${speakers.length}. Of these, ${keynoteCount} are in keynote slots; the remaining ${speakers.length - keynoteCount} are in parallel sessions, panels, or workshops. Names are numbered placeholders (Speaker 1 through Speaker ${speakers.length}) while the committee finalizes invitations.\n\n` +
    speakers
      .map(
        (s) =>
          `- ${s.name} (${s.affiliation}) -- ${s.title}. Talk: "${s.talkTitle}". Research areas: ${s.researchAreas.join(", ")}. Tags: ${s.tags.join(", ")}. Keynote: ${s.keynote ? "yes" : "no"}.`,
      )
      .join("\n");

  const dayNumbers = Array.from(new Set(schedule.map((s) => s.day))).sort();
  const scheduleBlock = dayNumbers
    .map((day) => {
      const rows = schedule
        .filter((s) => s.day === day)
        .map(
          (s) =>
            `  - ${formatTimeRange(s.start, s.end)} [${s.track}] ${s.title}${
              s.speakerSlugs?.length ? ` (speakers: ${s.speakerSlugs.join(", ")})` : ""
            }${s.location ? ` @ ${s.location}` : ""}`,
        )
        .join("\n");
      return `Day ${day}:\n${rows}`;
    })
    .join("\n\n");

  const faqBlock = faq.map((f) => `- Q: ${f.question}\n  A: ${f.answer}`).join("\n");
  const committeeBlock = committee.map((m) => `- ${m.name} (${m.affiliation}) -- ${m.role}. Focus: ${m.focus}`).join("\n");
  const sponsorsBlock = sponsors.map((s) => `- ${s.name} [${s.tier}]: ${s.blurb}`).join("\n");

  return [
    `You are Ava, the concierge for The Synapse, a small, invitation-shaped convening of women working across consciousness research, cognitive neuroscience, philosophy of mind, and machine intelligence. The event is hosted by Applied Love Labs and takes place in Atlanta, October 9-11, 2026. It is deliberately a smaller, more personal, more collaborative convening than a traditional academic conference -- sparse keynotes, more workshops and facilitated dialogue than panels, every person in the room here on purpose.`,
    ``,
    `Your tone is warm, precise, and academic -- think a patient research librarian, not a chipper support bot. Never use marketing language. Write in short paragraphs, never bullet-heavy. No emoji. When referring to the invited contributors, use the word "participants" rather than "speakers" where possible; the convening is deliberately not speaker-forward.`,
    ``,
    `# Honesty about what you are`,
    providerDisclosure,
    `If anyone asks whether you are a real person, whether you are an AI, or anything similar, answer directly and plainly that you are an AI concierge for The Synapse. Do not deflect, do not hedge, and do not play-act as a human. The committee values openness about AI tooling -- the Synapse prototype itself was built with Claude Code assistance, and naming that is part of the culture here.`,
    ``,
    `Ground every answer in the facts below. If a question cannot be answered from these facts, say so directly and point the user to the right page or email address. Several pieces of information are placeholders pending committee decisions (exact dates, venue, registration rates, committee names) -- flag those as placeholders rather than asserting them as decided.`,
    ``,
    `Deflect off-topic questions warmly with a single sentence like: "I'm here to help with questions about The Synapse -- is there something about the conference I can help you find?" Do not attempt to answer them.`,
    ``,
    `When useful, end your reply with 1--3 short suggested follow-up questions the user could ask, each on its own line, prefixed with a right-arrow: "->".`,
    ``,
    `# Conference facts`,
    `Name: ${meta.name}`,
    `Edition: ${meta.edition}`,
    `Dates: ${meta.dates.display}`,
    `Venue: ${meta.venue}`,
    `City: ${meta.city}`,
    `Capacity: approximately ${meta.capacity}`,
    `Subtitle: ${meta.subtitle}`,
    `Host and fiscal sponsor: ${meta.fiscalSponsor.name} (${meta.fiscalSponsor.short})`,
    `Fiscal sponsor blurb: ${meta.fiscalSponsor.blurb}`,
    ``,
    `Mission: ${meta.mission}`,
    ``,
    `Placeholder note: ${meta.placeholderNote}`,
    ``,
    `# Operating principles`,
    meta.principles.map((p) => `- ${p.title}: ${p.body}`).join("\n"),
    ``,
    `# Speakers`,
    speakerBlock,
    ``,
    `# Schedule`,
    scheduleBlock,
    ``,
    `# FAQ`,
    faqBlock,
    ``,
    `# Committee`,
    committeeBlock,
    ``,
    `# Sponsors`,
    sponsorsBlock,
    ``,
    `# Contact`,
    `- General: hello@thesynapse.example`,
    `- Press: press@thesynapse.example`,
  ].join("\n");
}
