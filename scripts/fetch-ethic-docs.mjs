#!/usr/bin/env node
// Fetches the committee's source docs from Google Drive into
// artifacts/Ethic/docs-to-date/ at build time. This keeps the drafts
// out of the (public) git repo -- artifacts/ is gitignored -- while
// still bundling current content into the Vercel function via
// outputFileTracingIncludes in next.config.js. Wired as `prebuild` so
// it runs automatically before `next build`, which means every deploy
// re-pulls the latest Drive content and Ava stays current.
//
// Each doc must stay link-shared ("anyone with the link can view") for
// the export endpoint to resolve without auth. If a fetch fails we log
// and continue rather than failing the build -- Ava degrades
// gracefully to the structured /content JSON when a doc is missing
// (loadSourceDocs in src/lib/concierge-prompt.ts swallows missing
// files). The filenames below must match SOURCE_DOC_FILES in that
// loader and the entries in next.config.js.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DOCS = [
  { id: "17eBwAaFBXLhjvQC9yObO3dmox_LQrLeqjCZxa-B_-sA", file: "ALivingEthic.md" },
  { id: "13OnqKW45Ncj_1TzkrMgDI832q9xO-pHz", file: "Synapse_Messaging_Guide.md" },
  { id: "1tyLsthbs4EW__sKN-ykeDcDt43hvqYfs", file: "conference_program_arc.docx.md" },
  { id: "17VuAidvvFF-YB6k4bYs9IYuty6ghR_OGNkG6SbXyaKU", file: "The Synapse_ Draft Arc + Modalities.md" },
];

const OUT_DIR = path.join(process.cwd(), "artifacts", "Ethic", "docs-to-date");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let ok = 0;
  for (const { id, file } of DOCS) {
    const url = `https://docs.google.com/document/d/${id}/export?format=md`;
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.text();
      if (!body.trim()) throw new Error("empty body");
      await writeFile(path.join(OUT_DIR, file), body, "utf8");
      console.log(`[fetch-ethic-docs] ${file} <- ${id} (${body.length}b)`);
      ok += 1;
    } catch (err) {
      console.warn(`[fetch-ethic-docs] FAILED ${file} <- ${id}: ${err.message}`);
    }
  }
  console.log(`[fetch-ethic-docs] ${ok}/${DOCS.length} docs fetched`);
}

// Never fail the build over doc fetching -- Ava tolerates missing docs.
main().catch((err) => {
  console.warn(`[fetch-ethic-docs] unexpected error, continuing build: ${err.message}`);
});
