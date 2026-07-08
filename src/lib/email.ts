import { Resend } from "resend";
import { meta } from "@/lib/content";

export async function sendConfirmationEmail(options: {
  to: string;
  fullName: string;
  confirmationId: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "The Synapse <hello@thesynapse.example>";

  if (!apiKey) {
    console.info("[email] RESEND_API_KEY absent, skipping confirmation email");
    return { sent: false, reason: "no-credentials" };
  }

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from,
      to: options.to,
      subject: `Application received -- ${meta.name} ${meta.edition}`,
      html: renderConfirmationHtml(options),
      text: renderConfirmationText(options),
    });
    return { sent: true };
  } catch (error) {
    console.error("[email] resend send failed", error);
    return { sent: false, reason: "send-error" };
  }
}

function renderConfirmationHtml({ fullName, confirmationId }: { fullName: string; confirmationId: string }): string {
  return `
  <!doctype html>
  <html><body style="font-family: 'Georgia', serif; background: #faf6ef; color: #1e0e22; padding: 40px;">
    <div style="max-width: 540px; margin: 0 auto;">
      <p style="letter-spacing: 0.18em; text-transform: uppercase; color: #6b5a70; font-size: 11px;">The Synapse -- ${meta.edition}</p>
      <h1 style="font-size: 30px; line-height: 1.1; margin-top: 16px;">Thanks for applying, ${escapeHtml(fullName)}.</h1>
      <p style="font-size: 16px; line-height: 1.6;">We received your application and the committee reads every one carefully. You'll hear back within two weeks. If you flagged access needs or submitted a speaker proposal, the relevant lead will reach out separately.</p>
      <p style="font-family: monospace; color: #6b5a70; font-size: 12px; margin-top: 28px;">Confirmation: ${confirmationId}</p>
      <p style="font-size: 14px; color: #6b5a70; margin-top: 32px;">${meta.dates.display} &middot; ${meta.city} &middot; Hosted by ${meta.fiscalSponsor.name}</p>
    </div>
  </body></html>
  `;
}

function renderConfirmationText({ fullName, confirmationId }: { fullName: string; confirmationId: string }): string {
  return `Thanks for applying, ${fullName}.

We received your application to ${meta.name} ${meta.edition} in ${meta.city}. The committee reads every application carefully and will be in touch within two weeks.

Confirmation: ${confirmationId}

${meta.dates.display} -- ${meta.city}
Hosted by ${meta.fiscalSponsor.name}`;
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

// Internal notification sent to the program team when a new /apply
// submission arrives. Reads recipients from APPLICATION_NOTIFY_TO
// (comma-separated) and falls back to mason@thesynapse.co so the team
// always gets a copy even before the env var is set in production.
export async function sendAdminNotification(options: {
  confirmationId: string;
  payload: Record<string, unknown>;
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "The Synapse <hello@thesynapse.example>";
  const recipientEnv = process.env.APPLICATION_NOTIFY_TO || "mason@thesynapse.co";
  const recipients = recipientEnv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey) {
    console.info("[email] RESEND_API_KEY absent, skipping admin notification");
    return { sent: false, reason: "no-credentials" };
  }
  if (recipients.length === 0) {
    console.info("[email] APPLICATION_NOTIFY_TO is empty, skipping admin notification");
    return { sent: false, reason: "no-recipients" };
  }

  const p = options.payload;
  const fullName = String(p.fullName ?? "Unknown applicant");
  const contributionTag =
    p.contribute === "yes" && p.contributionType
      ? ` [${String(p.contributionType)}]`
      : "";
  // Honeypot-flagged rows still get sent to the team (fail closed) but are
  // marked so a real misfire can be spotted and a bot flood can be filtered.
  const flagTag = p.flag ? "[POSSIBLE SPAM] " : "";
  const subject = `${flagTag}New application: ${fullName}${contributionTag} -- ${options.confirmationId}`;

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from,
      to: recipients,
      subject,
      html: renderAdminHtml(options),
      text: renderAdminText(options),
    });
    return { sent: true };
  } catch (error) {
    console.error("[email] resend admin notification failed", error);
    return { sent: false, reason: "send-error" };
  }
}

function s(value: unknown): string {
  if (value === undefined || value === null || value === "") return "--";
  return String(value);
}

function renderAdminHtml(options: {
  confirmationId: string;
  payload: Record<string, unknown>;
}): string {
  const p = options.payload;
  const row = (label: string, value: unknown) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b5a70;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1e0e22;">${escapeHtml(s(value))}</td></tr>`;
  const block = (label: string, value: unknown) =>
    `<h3 style="margin:28px 0 8px;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#6b5a70;">${escapeHtml(label)}</h3><div style="white-space:pre-wrap;font-size:15px;line-height:1.55;color:#1e0e22;">${escapeHtml(s(value))}</div>`;
  return `
  <!doctype html>
  <html><body style="font-family:'Georgia',serif;background:#faf6ef;color:#1e0e22;padding:32px;">
    <div style="max-width:680px;margin:0 auto;">
      <p style="letter-spacing:0.18em;text-transform:uppercase;color:#6b5a70;font-size:11px;margin:0;">${escapeHtml(meta.name)} -- new application</p>
      <h1 style="font-size:26px;line-height:1.15;margin:10px 0 24px;">${escapeHtml(s(p.fullName))}</h1>
      ${p.flag ? `<p style="margin:0 0 20px;padding:10px 14px;background:#fdeaea;border:1px solid #e0b4b4;border-radius:6px;color:#8a2b2b;font-size:14px;">&#9888; ${escapeHtml(s(p.flag))} &mdash; review before acting; the applicant was not sent a confirmation email.</p>` : ""}
      <table style="border-collapse:collapse;font-size:14px;">
        ${row("Confirmation", options.confirmationId)}
        ${row("Email", p.email)}
        ${row("Pronouns", p.pronouns)}
        ${row("City", p.city)}
        ${row("State / territory", p.usState)}
        ${row("Country", p.country)}
        ${row("Affiliation", p.affiliation)}
        ${row("Gender", p.gender)}
        ${row("Contributing to program", p.contribute)}
        ${p.contribute === "yes" ? row("Contribution type", p.contributionType) : ""}
        ${p.contribute === "yes" ? row("Attend anyway if not selected", p.attendIfNotSelected) : ""}
        ${row("Directory consent", p.directoryConsent)}
        ${row("Dietary", p.dietary)}
        ${row("Referral", p.referral)}
      </table>
      ${contributionBlocksHtml(p, block, row)}
      ${block("Short bio", p.bio)}
      ${block("Why this gathering, and what you bring", p.essay1)}
      ${block("How you uplift women's voices in everyday life", p.essay2)}
      ${p.reflection ? block("What's been missing from other gatherings", p.reflection) : ""}
      ${p.access ? block("Accessibility needs (private)", p.access) : ""}
    </div>
  </body></html>
  `;
}

// Renders only the per-type contribution detail that's actually filled,
// so the email stays readable instead of listing a dozen empty fields.
function contributionBlocksHtml(
  p: Record<string, unknown>,
  block: (label: string, value: unknown) => string,
  row: (label: string, value: unknown) => string,
): string {
  if (p.contribute !== "yes") return "";
  if (p.contributionType === "present") {
    return (
      `<table style="border-collapse:collapse;font-size:14px;margin-top:18px;">${row("Proposed title", p.presentTitle)}${row("Coauthors", p.presentCoauthors)}</table>` +
      block("Abstract", p.presentAbstract) +
      (p.presentResisted ? block("Resisted / rejected work", p.presentResisted) : "")
    );
  }
  if (p.contributionType === "experience") {
    return (
      `<table style="border-collapse:collapse;font-size:14px;margin-top:18px;">${row("Session title", p.experienceTitle)}${row("Medium / form", p.experienceMedium)}${row("Needs", p.experienceNeeds)}${row("Past work", p.experienceLink)}</table>` +
      block("What participants experience", p.experienceDescription)
    );
  }
  if (p.contributionType === "facilitate") {
    return (
      `<table style="border-collapse:collapse;font-size:14px;margin-top:18px;">${row("Open to matching", p.facilitateMatching)}</table>` +
      block("Facilitation offered", p.facilitateOffering) +
      block("Relevant experience", p.facilitateExperience)
    );
  }
  return "";
}

function renderAdminText(options: {
  confirmationId: string;
  payload: Record<string, unknown>;
}): string {
  const p = options.payload;
  const lines = [
    `New application -- ${meta.name} ${meta.edition}`,
    ...(p.flag
      ? [`** ${s(p.flag)} -- review before acting; no confirmation email was sent to the applicant. **`]
      : []),
    `Confirmation: ${options.confirmationId}`,
    ``,
    `Name: ${s(p.fullName)}`,
    `Email: ${s(p.email)}`,
    `Pronouns: ${s(p.pronouns)}`,
    `City: ${s(p.city)}`,
    `State / territory: ${s(p.usState)}`,
    `Country: ${s(p.country)}`,
    `Affiliation: ${s(p.affiliation)}`,
    `Gender: ${s(p.gender)}`,
    `Contributing to program: ${s(p.contribute)}`,
  ];
  if (p.contribute === "yes") {
    lines.push(`Contribution type: ${s(p.contributionType)}`);
    lines.push(`Attend anyway if not selected: ${s(p.attendIfNotSelected)}`);
    if (p.contributionType === "present") {
      lines.push(`Proposed title: ${s(p.presentTitle)}`);
      lines.push(`Coauthors: ${s(p.presentCoauthors)}`);
      lines.push(`Abstract: ${s(p.presentAbstract)}`);
      if (p.presentResisted) lines.push(`Resisted / rejected work: ${s(p.presentResisted)}`);
    } else if (p.contributionType === "experience") {
      lines.push(`Session title: ${s(p.experienceTitle)}`);
      lines.push(`What participants experience: ${s(p.experienceDescription)}`);
      lines.push(`Medium / form: ${s(p.experienceMedium)}`);
      lines.push(`Needs: ${s(p.experienceNeeds)}`);
      lines.push(`Past work: ${s(p.experienceLink)}`);
    } else if (p.contributionType === "facilitate") {
      lines.push(`Facilitation offered: ${s(p.facilitateOffering)}`);
      lines.push(`Relevant experience: ${s(p.facilitateExperience)}`);
      lines.push(`Open to matching: ${s(p.facilitateMatching)}`);
    }
  }
  lines.push(`Directory consent: ${s(p.directoryConsent)}`);
  lines.push(`Dietary: ${s(p.dietary)}`);
  lines.push(`Referral: ${s(p.referral)}`);
  lines.push(``);
  lines.push(`Short bio:`);
  lines.push(s(p.bio));
  lines.push(``);
  lines.push(`Why this gathering, and what you bring:`);
  lines.push(s(p.essay1));
  lines.push(``);
  lines.push(`How you uplift women's voices in everyday life:`);
  lines.push(s(p.essay2));
  if (p.reflection) {
    lines.push(``);
    lines.push(`What's been missing from other gatherings:`);
    lines.push(s(p.reflection));
  }
  if (p.access) {
    lines.push(``);
    lines.push(`Accessibility needs (private):`);
    lines.push(s(p.access));
  }
  return lines.join("\n");
}
