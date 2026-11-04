import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, ProgressBar } from '../ui'

export interface StatCardProps {
  id: string
  index: number
  icon: LucideIcon
  title: string
  /** null → "—" + "not logged". Never pass a guessed number. */
  value: string | null
  /** 0–100 toward target; null → empty state. */
  progress: number | null
  target: string
  body: string
  track: string
  note?: ReactNode
}

/** Group 2 focus card: index + title, big stat, target, description, what to track. */
export function StatCard({ id, index, icon: Icon, title, value, progress, target, body, track, note }: StatCardProps) {
  const { t } = useTranslation()
  return (
    <Card as="article" id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-28 flex-col">
      <header className="flex items-start gap-3">
        <span className="t-label pt-0.5 text-accent-ink tabular-nums">{String(index).padStart(2, '0')}</span>
        <h3 id={`${id}-title`} className="t-h3 flex-1 text-[15px] leading-snug">
          {title}
        </h3>
        <Icon className="size-[18px] shrink-0 text-ink-3" aria-hidden />
      </header>

      <div className="mt-6">
        <p className="t-stat">{value ?? t('common.empty')}</p>
        <p className="mt-2 text-xs text-ink-3">
          {t('content.dashboard.todayValue')}
          {value === null && ` · ${t('content.dashboard.notLogged')}`}
        </p>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs text-ink-3">
          <span>{t('content.dashboard.progress')}</span>
          <span className="tabular-nums">{progress === null ? t('common.notUpdated') : `${progress}%`}</span>
        </div>
        <ProgressBar value={progress} label={`${title} — ${t('content.dashboard.progress')}`} />
      </div>

      <div className="mt-5 rounded-md bg-accent-soft/60 px-3.5 py-3">
        <p className="t-label mb-1 text-accent-ink">{t('content.dashboard.target')}</p>
        <p className="text-[13px] leading-relaxed font-medium text-ink">{target}</p>
      </div>

      <p className="t-body mt-4 text-ink-2">{body}</p>
      {note && <p className="mt-3 border-l-2 border-line-strong pl-3 text-xs leading-relaxed text-ink-3">{note}</p>}

      <footer className="mt-auto pt-5">
        <div className="border-t border-line pt-4">
          <p className="t-label mb-1 text-ink-3">{t('content.dashboard.track')}</p>
          <p className="text-[13px] leading-relaxed text-ink-2">{track}</p>
        </div>
      </footer>
    </Card>
  )
}
