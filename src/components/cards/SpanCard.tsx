import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/cn'
import { Badge, Card } from '../ui'

export interface SpanCardProps {
  id: string
  index: number
  title: string
  body: string
  items: Array<{ key: string; title: string; bullets: string[] }>
  /** Spans two columns, sub-items laid out side by side. */
  featured?: boolean
}

/** Group 3 pillar card: title, description, three concrete items (A/B/C). */
export function SpanCard({ id, index, title, body, items, featured }: SpanCardProps) {
  const { t } = useTranslation()
  return (
    <Card
      as="article"
      id={id}
      padding="lg"
      aria-labelledby={`${id}-title`}
      className={cn('scroll-mt-28', featured && 'lg:col-span-2')}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="t-label text-accent-ink tabular-nums">{String(index).padStart(2, '0')}</span>
        {featured && (
          <Badge tone="accent" dot>
            {t('content.dashboard.mostImportant')}
          </Badge>
        )}
      </div>
      <h3 id={`${id}-title`} className={cn('mt-3 font-semibold tracking-tight', featured ? 't-h2 sm:text-[26px]' : 't-h2')}>
        {title}
      </h3>
      <p className={cn('t-body mt-3 text-ink-2', featured && 'max-w-3xl sm:text-[15px]')}>{body}</p>

      <p className="t-label mt-7 mb-3 text-ink-3">{t('content.dashboard.threeItems')}</p>
      <div className={cn('grid gap-3', featured && 'md:grid-cols-3')}>
        {items.map((item) => (
          <Card key={item.key} tone="flat" className="!p-4">
            <h4 className="flex gap-2 text-sm font-semibold">
              <span className="text-accent-ink uppercase">{item.key}.</span>
              <span>{item.title}</span>
            </h4>
            <ul className="mt-3 space-y-2">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-2">
                  <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-ink-3" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Card>
  )
}
