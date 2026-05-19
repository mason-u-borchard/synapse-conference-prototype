"use client";

import { useMemo, useState, type FormEvent } from "react";
import { cx } from "@/lib/cx";
import { DEFAULT_COUNTRY, US_STATES_AND_TERRITORIES, getCountryOptions } from "@/lib/locations";

type Gender =
  | "male"
  | "female"
  | "non-binary"
  | "intersex"
  | "other"
  | "prefer-not-to-say";

type YesNo = "yes" | "no";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; confirmationId: string; speakerHadFile: boolean }
  | { kind: "error"; message: string };

const ESSAY1_LIMIT = 250;
const ESSAY2_LIMIT = 250;
const REFLECTION_LIMIT = 100;

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-Binary" },
  { value: "intersex", label: "Intersex" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function ApplicationForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const [gender, setGender] = useState<Gender | null>(null);
  const [directoryConsent, setDirectoryConsent] = useState<YesNo | null>(null);
  const [isSpeaker, setIsSpeaker] = useState<YesNo | null>(null);
  const [attendIfNotSpeaker, setAttendIfNotSpeaker] = useState<YesNo | null>(null);
  const [country, setCountry] = useState<string>(DEFAULT_COUNTRY);
  const [usState, setUsState] = useState<string>("");

  const countryOptions = useMemo(() => getCountryOptions(), []);

  const [bio, setBio] = useState("");
  const [essay1, setEssay1] = useState("");
  const [essay2, setEssay2] = useState("");
  const [reflection, setReflection] = useState("");

  const overLimit =
    countWords(essay1) > ESSAY1_LIMIT ||
    countWords(essay2) > ESSAY2_LIMIT ||
    countWords(reflection) > REFLECTION_LIMIT;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    if (overLimit) {
      setStatus({
        kind: "error",
        message:
          "One of your responses is over its word limit. Trim it and resubmit.",
      });
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") ?? "").length > 0) {
      setStatus({
        kind: "success",
        confirmationId: "SYN-PREVIEW",
        speakerHadFile: false,
      });
      return;
    }

    const speakerFile = data.get("speakerUpload");
    data.delete("speakerUpload");
    const speakerHadFile =
      speakerFile instanceof File && speakerFile.size > 0;

    const payload: Record<string, unknown> = Object.fromEntries(
      data.entries(),
    );
    if (speakerHadFile && speakerFile instanceof File) {
      payload.speakerUploadFilename = speakerFile.name;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/submit-form`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind: "registration", payload }),
        },
      );
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          body.message ?? `Submission failed (${response.status})`,
        );
      }
      const body = await response.json();
      setStatus({
        kind: "success",
        confirmationId: body.confirmationId ?? "SYN-UNKNOWN",
        speakerHadFile,
      });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      form.reset();
      setGender(null);
      setDirectoryConsent(null);
      setIsSpeaker(null);
      setAttendIfNotSpeaker(null);
      setCountry(DEFAULT_COUNTRY);
      setUsState("");
      setBio("");
      setEssay1("");
      setEssay2("");
      setReflection("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Submission failed.";
      setStatus({ kind: "error", message });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="paper p-10 text-center">
        <p className="eyebrow mb-3 text-muted-foreground">Application received</p>
        <h2 className="font-serif text-3xl text-ink">Thanks for applying.</h2>
        <p className="mt-4 max-w-prose text-pretty text-muted-foreground mx-auto">
          The committee reads every application carefully. You'll hear back
          within two weeks. A confirmation email is on its way.
        </p>
        {status.speakerHadFile && (
          <p className="mt-4 max-w-prose text-pretty text-muted-foreground mx-auto">
            Presenter materials: we have your filename on file but the upload
            channel isn't live yet. Watch your inbox -- the program team will
            reach out to collect the document.
          </p>
        )}
        <p className="mt-5 font-mono text-xs text-muted-foreground">
          Confirmation: {status.confirmationId}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="paper space-y-6 p-8">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <Field label="Are you applying as a presenter?" required>
        <YesNoRadios
          name="isSpeaker"
          value={isSpeaker}
          onChange={setIsSpeaker}
        />
      </Field>

      {isSpeaker === "yes" && (
        <>
          <Field
            label="Presenter submission"
            description="Upload a document with: (a) talk title, (b) coauthors and affiliations, (c) abstract <=500 words."
            required
          >
            <input
              required
              type="file"
              name="speakerUpload"
              accept=".md,.pdf,.doc,.docx"
              className="block w-full text-sm text-muted-foreground file:mr-4 file:cursor-pointer file:rounded-md file:border file:border-border-strong file:bg-surface file:px-4 file:py-2 file:text-sm file:text-ink hover:file:border-ink"
            />
          </Field>
          <Field
            label="Presenter slots are intentionally limited. If we can't fit you onto the program for 2026, would you still like to attend as a participant?"
            required
          >
            <YesNoRadios
              name="attendIfNotSpeaker"
              value={attendIfNotSpeaker}
              onChange={setAttendIfNotSpeaker}
            />
          </Field>
        </>
      )}

      <FieldRow>
        <Field label="Full name" required>
          <input
            required
            type="text"
            name="fullName"
            autoComplete="name"
            className="field-input"
          />
        </Field>
        <Field label="Pronouns">
          <input
            type="text"
            name="pronouns"
            className="field-input"
            placeholder="e.g., she / her"
          />
        </Field>
      </FieldRow>

      <Field label="Email" required>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="field-input"
        />
      </Field>

      <FieldRow>
        <Field label="City" required>
          <input
            required
            type="text"
            name="city"
            autoComplete="address-level2"
            className="field-input"
          />
        </Field>
        <Field label="Country" required>
          <select
            required
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              if (e.target.value !== DEFAULT_COUNTRY) setUsState("");
            }}
            autoComplete="country-name"
            className="field-input"
          >
            {countryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </FieldRow>

      {country === DEFAULT_COUNTRY && (
        <Field
          label="State or territory"
          description="Many city names exist in more than one state, so we ask US applicants to disambiguate."
          required
        >
          <select
            required
            name="usState"
            value={usState}
            onChange={(e) => setUsState(e.target.value)}
            autoComplete="address-level1"
            className="field-input"
          >
            <option value="">Select a state or territory</option>
            {US_STATES_AND_TERRITORIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field label="Affiliation" required>
        <input
          required
          type="text"
          name="affiliation"
          className="field-input"
          placeholder="Organization, field, or independent"
        />
      </Field>

      <Field label="Gender" required>
        <div role="radiogroup" className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {GENDER_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={cx(
                "cursor-pointer rounded-md border px-4 py-3 text-sm text-center transition-colors",
                gender === opt.value
                  ? "border-ink bg-ink text-surface"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-ink",
              )}
            >
              <input
                type="radio"
                name="gender"
                value={opt.value}
                checked={gender === opt.value}
                onChange={() => setGender(opt.value)}
                className="sr-only"
                required
              />
              {opt.label}
            </label>
          ))}
        </div>
      </Field>

      <Field label="How did you hear about The Synapse?">
        <input type="text" name="referral" className="field-input" />
      </Field>

      <Field
        label="Short bio (~75 words)"
        description="For the program directory. Roughly 75 words."
        required
      >
        <textarea
          required
          name="bio"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="field-input resize-y"
        />
        <WordCounter value={bio} limit={75} />
      </Field>

      <Field
        label="Do you consent to your name and email appearing in the conference program so fellow attendees can stay in touch?"
        required
      >
        <YesNoRadios
          name="directoryConsent"
          value={directoryConsent}
          onChange={setDirectoryConsent}
        />
      </Field>

      <Field label="Why this gathering, and what you bring" required>
        <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>What draws you to this gathering right now?</li>
          <li>
            What perspective or lived experience do you bring that would
            meaningfully expand the room?
          </li>
        </ul>
        <textarea
          required
          name="essay1"
          rows={8}
          value={essay1}
          onChange={(e) => setEssay1(e.target.value)}
          className="field-input resize-y"
        />
        <WordCounter value={essay1} limit={250} />
      </Field>

      <Field
        label="How do you aim to uplift women's voices in your everyday life -- personally, professionally, or in your community?"
        required
      >
        <textarea
          required
          name="essay2"
          rows={8}
          value={essay2}
          onChange={(e) => setEssay2(e.target.value)}
          className="field-input resize-y"
        />
        <WordCounter value={essay2} limit={250} />
      </Field>

      <Field label="What do you hope to experience here that has been missing from other gatherings you've attended?">
        <textarea
          name="reflection"
          rows={4}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="field-input resize-y"
        />
        <WordCounter value={reflection} limit={100} />
      </Field>

      <Field label="Dietary restrictions">
        <input type="text" name="dietary" className="field-input" />
      </Field>

      <Field
        label="Accessibility needs"
        description="We follow up privately within 72 hours. No detail is too small."
      >
        <textarea name="access" rows={3} className="field-input resize-y" />
      </Field>

      <div className="block">
        <span className="mb-2 block font-serif text-sm text-ink">
          Community guidelines
          <span className="ml-1 text-synapse-magenta" aria-hidden="true">*</span>
        </span>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <input
            required
            type="checkbox"
            name="guidelinesAgreement"
            className="mt-1 h-4 w-4 rounded border-border-strong"
          />
          <span>
            I agree to abide by the conference{" "}
            <a
              href="/guidelines"
              className="underline decoration-border-strong underline-offset-2 hover:text-ink hover:decoration-ink"
            >
              community guidelines
            </a>
            .
          </span>
        </label>
      </div>

      {status.kind === "error" && (
        <p
          role="alert"
          className="rounded-md border border-synapse-magenta/60 bg-synapse-magenta/10 px-4 py-3 text-sm"
        >
          {status.message}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status.kind === "submitting"}
        >
          {status.kind === "submitting" ? (
            <>
              <Spinner /> Sending
            </>
          ) : (
            <>Submit application</>
          )}
        </button>
        <p className="text-xs text-muted-foreground">
          Submitting sends a confirmation email. We read every entry.
        </p>
      </div>

      <style>{`
        .field-input {
          display: block;
          width: 100%;
          background: hsl(var(--surface));
          border: 1px solid hsl(var(--border-strong));
          border-radius: 8px;
          padding: 0.65rem 0.9rem;
          font: inherit;
          color: hsl(var(--ink));
          transition: border-color 180ms ease;
        }
        .field-input:focus {
          outline: none;
          border-color: hsl(var(--gold));
          box-shadow: 0 0 0 3px hsl(var(--gold) / 0.25);
        }
      `}</style>
    </form>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({
  label,
  description,
  required,
  children,
}: {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-serif text-sm text-ink">
        {label}
        {required && (
          <span className="ml-1 text-synapse-magenta" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {description && (
        <span className="mb-2 block text-xs text-muted-foreground">
          {description}
        </span>
      )}
      {children}
    </label>
  );
}

function YesNoRadios({
  name,
  value,
  onChange,
}: {
  name: string;
  value: YesNo | null;
  onChange: (next: YesNo) => void;
}) {
  const options: { value: YesNo; label: string }[] = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  return (
    <div role="radiogroup" className="grid grid-cols-2 gap-2 max-w-xs">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cx(
            "cursor-pointer rounded-md border px-4 py-3 text-sm text-center transition-colors",
            value === opt.value
              ? "border-ink bg-ink text-surface"
              : "border-border text-muted-foreground hover:border-border-strong hover:text-ink",
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
            required
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-surface/40 border-t-surface"
    />
  );
}

function WordCounter({ value, limit }: { value: string; limit: number }) {
  const count = countWords(value);
  const over = count > limit;
  return (
    <p
      className={cx(
        "mt-2 text-xs",
        over ? "text-synapse-magenta" : "text-muted-foreground",
      )}
      aria-live="polite"
    >
      {count} / {limit} words
    </p>
  );
}
