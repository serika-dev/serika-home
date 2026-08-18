interface LogoProps {
  className?: string;
}

/**
 * The Serika Company wordmark, text only, "Company" in accent purple.
 * This is the single brand logo used across the header, footer and elsewhere.
 */
export function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`display text-[17px] font-bold tracking-tight text-[var(--text)] ${className}`}
    >
      The Serika <span className="text-[var(--accent)]">Company</span>
    </span>
  );
}
