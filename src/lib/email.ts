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
