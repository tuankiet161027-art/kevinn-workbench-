import { cn } from '../../lib/cn'

export interface ProgressBarProps {
  /** 0–100. null/undefined = no data yet → dashed empty track, never a fake 0%. */
  value: number | null | undefined
  label: string
  className?: string
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const known = typeof value === 'number' && Number.isFinite(value)
  const pct = known ? Math.min(100, Math.max(0, value)) : 0
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={known ? pct : undefined}
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full',
        known ? 'bg-paper-2' : 'border border-dashed border-line-strong',
        className,
      )}
    >
      {known && (
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  )
}
