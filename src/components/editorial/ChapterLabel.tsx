import { cn } from '../../lib/cn'

export interface ChapterLabelProps {
  /** 1 → "01 /" */
  index: number
  label: string
  className?: string
}

/** Editorial chapter marker — "01 / WHO I AM" (DNA 1). */
export function ChapterLabel({ index, label, className }: ChapterLabelProps) {
  return (
    <p className={cn('t-chapter flex items-center gap-2 text-ink-3', className)}>
      <span className="text-accent-ink tabular-nums">{String(index).padStart(2, '0')} /</span>
      <span>{label}</span>
    </p>
  )
}
