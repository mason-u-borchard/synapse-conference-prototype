import { google } from "googleapis";

type SubmissionPayload = Record<string, unknown>;
type SubmissionKind = "registration" | "contact";

export interface SinkResult {
  confirmationId: string;
  persisted: "sheets" | "log";
}

// Column order is read top-to-bottom into the Registrations tab,
// preceded by a timestamp column (so position 0 below corresponds to
// column B in the sheet). Reordered 2026-05-19 to surface the most-
// scanned fields up front; updated 2026-05-26 for Kelly's contributor
// redesign (contribute + contributionType replace isSpeaker; the
// sparse per-type contribution fields sit at the end since only one
// set is populated per row).
//
// Registrations sheet — paste the line below as row 1. Mirrors the
// list below with `timestamp` prepended and `extras` appended (the
// JSON catch-all column for anything sent but not named here). Last
// header sync: 2026-06-13.
//
// Paste steps (Google Sheets eats tabs if you're in cell-edit mode):
//   1. Copy ONLY the text after `// ` on the line below — do not
//      include the `// ` prefix.
//   2. In the Registrations tab, single-click cell A1 so it's
//      highlighted but NOT in edit mode (no blinking cursor inside).
//   3. Paste. Sheets should auto-split on tabs.
//   4. If it lands in one cell anyway, leave that cell selected and
//      use Data → Split text to columns → Separator: Tab.
//
// timestamp	confirmationId	kind	fullName	contribute	contributionType	attendIfNotSelected	city	usState	country	affiliation	pronouns	email	gender	bio	directoryConsent	essay1	essay2	reflection	dietary	access	guidelinesAgreement	referral	presentTitle	presentAbstract	presentCoauthors	presentResisted	experienceTitle	experienceDescription	experienceMedium	experienceNeeds	experienceLink	facilitateOffering	facilitateExperience	facilitateMatching	extras
const REGISTRATION_COLUMNS = [
  "confirmationId",
  "kind",
  "fullName",
  "contribute",
  "contributionType",
  "attendIfNotSelected",
  "city",
  "usState",
  "country",
  "affiliation",
  "pronouns",
  "email",
  "gender",
  "bio",
  "directoryConsent",
  "essay1",
  "essay2",
  "reflection",
  "dietary",
  "access",
  "guidelinesAgreement",
  "referral",
  // Per-contribution-type detail. Sparse: only the selected type's
  // fields are filled on any given row.
  "presentTitle",
  "presentAbstract",
  "presentCoauthors",
  "presentResisted",
  "experienceTitle",
  "experienceDescription",
  "experienceMedium",
  "experienceNeeds",
  "experienceLink",
  "facilitateOffering",
  "facilitateExperience",
  "facilitateMatching",
];

// Contact sheet — paste the line below as row 1 of the Contact tab.
// Same convention: `timestamp` prepended, `extras` appended. Same
// paste steps as above — single-click A1, paste, fall back to
// Data → Split text to columns → Tab if it lands in one cell.
//
// timestamp	confirmationId	kind	fullName	email	message	extras
const CONTACT_COLUMNS = [
  "confirmationId",
  "kind",
  "fullName",
  "email",
  "message",
];

export async function recordSubmission(
  kind: SubmissionKind,
  payload: SubmissionPayload,
): Promise<SinkResult> {
  const confirmationId = makeConfirmationId();
  const row = flattenRow(kind, { kind, confirmationId, ...payload });

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
  const tabName = kind === "registration" ? "Registrations" : "Contact";

  // Don't use values.append. Its "table" detection treats any non-
  // empty cell in the searched range -- including stray formatting,
  // formula output, and whitespace in unused columns -- as part of
  // the data table, which silently pushes new rows to row numbers
  // far past the last real submission. Instead, scan column B
  // (confirmationId), which every persisted submission writes, find
  // the next empty row, and update at exactly that cell.
  const nextRow = await withRetry(() =>
    findNextRow(sheets, spreadsheetId, tabName),
  );

  // values.update (unlike values.append) does NOT auto-extend the
  // grid. If the target row sits past the sheet's current rowCount,
  // the call throws "Range exceeds grid limits." Ensure capacity
  // first so we never block on a sheet that ran out of rows.
  await withRetry(() =>
    ensureRowCapacity(sheets, spreadsheetId, tabName, nextRow),
  );

  await withRetry(() =>
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tabName}!A${nextRow}`,
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    }),
  );

  return { confirmationId, persisted: "sheets" };
}

// Reads the tab's gridProperties.rowCount and appends rows in a
// single batchUpdate if the target row sits beyond it. Adds rows in
// chunks of ROW_CHUNK so we don't make a Sheets API call every
// single submission once we're near the edge.
const ROW_CHUNK = 100;

async function ensureRowCapacity(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string,
  requiredRow: number,
): Promise<void> {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets(properties(sheetId,title,gridProperties))",
  });
  const sheet = meta.data.sheets?.find(
    (s) => s.properties?.title === tabName,
  );
  const sheetId = sheet?.properties?.sheetId;
  const rowCount = sheet?.properties?.gridProperties?.rowCount;
  if (sheetId == null || rowCount == null) {
    throw new Error(`[sheets-sink] tab not found or unreadable: ${tabName}`);
  }
  if (requiredRow <= rowCount) return;

  const shortfall = requiredRow - rowCount;
  const toAdd = Math.max(ROW_CHUNK, shortfall);
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          appendDimension: {
            sheetId,
            dimension: "ROWS",
            length: toAdd,
          },
        },
      ],
    },
  });
}

// Reads column B and returns the row number immediately after the
// last non-empty cell. Falls back to row 2 (just under the header)
// if the column is empty. Race-condition note: two simultaneous
// submissions could both resolve the same nextRow and one would
// overwrite the other. The form's per-IP rate limit and the low
// expected concurrency for a conference application form make this
// acceptable. If we ever need stronger guarantees, switch to a
// Sheets "insert rows then update" sequence or move the sink to a
// real datastore.
async function findNextRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string,
): Promise<number> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tabName}!B:B`,
    majorDimension: "COLUMNS",
  });
  const column = response.data.values?.[0] ?? [];
  for (let i = column.length - 1; i >= 0; i--) {
    const cell = column[i];
    if (cell !== undefined && cell !== null && String(cell).trim() !== "") {
      return i + 2; // 0-based index → 1-based row, then +1 for "next row".
    }
  }
  return 2;
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

function flattenRow(kind: SubmissionKind, row: Record<string, unknown>): string[] {
  const ordered = kind === "registration" ? REGISTRATION_COLUMNS : CONTACT_COLUMNS;
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
