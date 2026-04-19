import { google } from "googleapis";

type SubmissionPayload = Record<string, unknown>;

export interface SinkResult {
  confirmationId: string;
  persisted: "sheets" | "log";
}

export async function recordSubmission(
  kind: "registration" | "contact",
  payload: SubmissionPayload,
): Promise<SinkResult> {
  const confirmationId = makeConfirmationId();
  const row = flattenRow({ kind, confirmationId, ...payload });

  if (!hasSheetsCredentials()) {
    console.info(
      "[sheets-sink] credentials absent, logging submission instead",
      JSON.stringify({ kind, confirmationId, payload }),
    );
    return { confirmationId, persisted: "log" };
  }

  const auth = buildAuthFromEnv();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID as string;

  await withRetry(() =>
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range: kind === "registration" ? "Registrations!A:Z" : "Contact!A:Z",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    }),
  );

  return { confirmationId, persisted: "sheets" };
}

function hasSheetsCredentials(): boolean {
  return !!process.env.GOOGLE_SERVICE_ACCOUNT_B64 && !!process.env.GOOGLE_SHEET_ID;
}

function buildAuthFromEnv() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_B64 as string;
  const json = Buffer.from(raw, "base64").toString("utf8");
  const credentials = JSON.parse(json) as { client_email: string; private_key: string };
  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function flattenRow(row: Record<string, unknown>): string[] {
  const ordered = ["confirmationId", "kind", "fullName", "email", "affiliation", "role", "pronouns", "interests", "dietary", "access", "grantInterest", "grantContext", "referral", "message"];
  const timestamp = new Date().toISOString();
  return [
    timestamp,
    ...ordered.map((key) => stringify(row[key])),
    stringify(row, ordered),
  ];
}

function stringify(value: unknown, omitKeys?: string[]): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (omitKeys && typeof value === "object") {
    const rest: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (!omitKeys.includes(k)) rest[k] = v;
    }
    return Object.keys(rest).length ? JSON.stringify(rest) : "";
  }
  return JSON.stringify(value);
}

function makeConfirmationId(): string {
  const slug = Math.random().toString(36).slice(2, 8).toUpperCase();
  const stamp = Date.now().toString(36).slice(-4).toUpperCase();
  return `SYN-${stamp}-${slug}`;
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (!isTransientError(err)) throw err;
      await new Promise((r) => setTimeout(r, 300 * Math.pow(2, i) + Math.random() * 150));
    }
  }
  throw lastError;
}

function isTransientError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const maybe = err as { code?: number | string; response?: { status?: number } };
  const status = maybe.response?.status ?? (typeof maybe.code === "number" ? maybe.code : 0);
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}
