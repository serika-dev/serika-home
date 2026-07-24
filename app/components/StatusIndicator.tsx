export type Status = 'operational' | 'downtime' | 'checking';

const color: Record<Status, string> = {
  operational: 'var(--ok)',
  downtime: 'var(--down)',
  checking: 'var(--faint)',
};

const label: Record<Status, string> = {
  operational: 'Operational',
  downtime: 'Experiencing downtime',
  checking: 'Checking status',
};

/** A single, quiet status dot. */
export function StatusDot({ status }: { status: Status }) {
  return (
    <span
      className="inline-block h-2 w-2 shrink-0 rounded-full"
      style={{ backgroundColor: color[status] }}
      title={label[status]}
      aria-label={label[status]}
      role="img"
    />
  );
}
