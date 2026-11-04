import { CircleDashed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PROFILE, type ProfileValue } from '../../data/kevin-os'
import { useList } from '../../lib/useList'
import { useLocale } from '../../lib/useLocale'
import { ChapterSection } from '../editorial/ChapterSection'
import { Badge, Card } from '../ui'

/** 04 — Personal data profile + the data gaps that keep metrics at "—". */
export function DataGaps() {
  const { t } = useTranslation()
  const { number, date } = useLocale()
  const list = useList()
  const gaps = list('content.dataGaps.items')

  const render = (v: ProfileValue): string => {
    switch (v.kind) {
      case 'literal':
        return v.text
      case 'text':
        return t(`content.profileData.values.${v.key}`)
      case 'measure': {
        const measured = number(v.value, { style: 'unit', unit: v.unit })
        if (!v.reportedAt || !v.key) return measured
        const [y, m] = v.reportedAt.split('-').map(Number)
        const when = date(new Date(y, m - 1, 1), { month: 'long', year: 'numeric' })
        return t(`content.profileData.values.${v.key}`, { value: measured, date: when })
      }
    }
  }

  return (
    <ChapterSection id="profile" index={4} label={t('content.chapters.profile')} title={t('content.profileData.title')}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card padding="lg">
          <p className="t-body mb-5 max-w-xl text-ink-2">{t('content.profileData.intro')}</p>
          <dl className="divide-y divide-line border-t border-line">
            {PROFILE.map((row) => (
              <div key={row.id} className="grid gap-0.5 py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
                <dt className="text-[13px] text-ink-3">{t(`content.profileData.rows.${row.id}`)}</dt>
                <dd className="text-sm font-medium">{render(row.value)}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card padding="lg" className="self-start lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3">
            <h3 className="t-h2">{t('content.dataGaps.title')}</h3>
            <span className="t-stat text-[28px] text-accent-ink">{number(gaps.length)}</span>
          </div>
          <p className="t-body mt-2 text-ink-2">{t('content.dataGaps.intro')}</p>
          <ul className="mt-5 space-y-2">
            {gaps.map((gap) => (
              <li key={gap} className="flex items-start gap-3 rounded-md border border-dashed border-line-strong px-3.5 py-3">
                <CircleDashed className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden />
                <span className="flex-1 text-[13px] leading-relaxed">{gap}</span>
                <Badge tone="warn" className="hidden shrink-0 sm:inline-flex">
                  {t('content.dataGaps.badge')}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </ChapterSection>
  )
}
