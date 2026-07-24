interface WordmarkProps {
  main: string;
  sub?: string;
  className?: string;
}

/** Renders a product wordmark: primary text + accent-purple suffix. */
export function Wordmark({ main, sub, className = '' }: WordmarkProps) {
  return (
    <span className={`display font-bold tracking-tight ${className}`}>
      <span className="text-[var(--text)]">{main}</span>
      {sub && <span className="text-[var(--accent)]">{sub}</span>}
    </span>
  );
}
