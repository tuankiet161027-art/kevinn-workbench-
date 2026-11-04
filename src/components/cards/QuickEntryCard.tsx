import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '../ui'

export interface QuickEntryCardProps {
  id: string
  index: number
  icon: LucideIcon
  title: string
  desc: string
  bullets: string[]
  actionLabel: string
  onStart: () => void
}

/** Group 5 entry: the whole card is one button that primes the quick-input bar. */
export function QuickEntryCard({ id, index, icon: Icon, title, desc, bullets, actionLabel, onStart }: QuickEntryCardProps) {
  return (
    <Card as="article" id={id} tone="interactive" className="group relative flex scroll-mt-28 flex-col">
      <div className="flex items-center justify-between">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
          <Icon className="size-[18px]" aria-hidden />
        </span>
        <span className="t-label text-ink-3 tabular-nums">{String(index).padStart(2, '0')}</span>
      </div>
      <h3 className="t-h3 mt-4">
        {/* stretched button: whole card is clickable, but only one focus stop */}
        <button type="button" onClick={onStart} className="text-left after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
          {title}
        </button>
      </h3>
      <p className="t-body mt-2 text-ink-2">{desc}</p>
      <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-2">
            <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-accent-ink" aria-hidden>
        {actionLabel}
        <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </p>
      <span className="pointer-events-none absolute inset-0 rounded-card ring-accent group-has-[:focus-visible]:ring-2" aria-hidden />
    </Card>
  )
}
