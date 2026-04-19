interface SynapseMarkProps { className?: string; }

export function SynapseMark({ className }: SynapseMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="The Synapse">
      <circle cx="7" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="25" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.2 16c3-4 5.6-4 5.8-4s3 0 5.8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="12" r="1.1" fill="currentColor" />
    </svg>
  );
}
