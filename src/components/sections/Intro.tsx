import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useList } from '../../lib/useList'
import { ChapterLabel } from '../editorial/ChapterLabel'
import { buttonClasses } from '../ui'

/** 00 — Cover. Editorial DNA: kicker label, very large serif tagline, philosophy. */
export function Intro() {
  const { t } = useTranslation()
  const list = useList()
  const tagline = list('content.brand.tagline')

  const facts = [
    [t('content.profileData.rows.university'), 'HUIT'],
    [t('content.profileData.rows.major'), t('content.profileData.values.major')],
    [t('content.profileData.rows.studyYear'), t('content.profileData.values.studyYear')],
  ] as const

  return (
    <section aria-labelledby="intro-heading" className="pt-14 pb-16 sm:pt-24 sm:pb-24">
      <ChapterLabel index={0} label={t('content.brand.kicker')} className="mb-6 sm:mb-8" />
      <h1 id="intro-heading" className="t-display max-w-5xl">
        {tagline.map((line, i) => (
          <span key={line} className={i === tagline.length - 1 ? 'block text-accent-ink' : 'block'}>
            {line}
          </span>
        ))}
      </h1>

      <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-xl">
          <p className="t-label mb-2 text-ink-3">{t('content.brand.philosophyLabel')}</p>
          <p className="t-lede text-ink-2">{t('content.brand.philosophy')}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#dashboard" className={buttonClasses('primary')}>
            {t('content.brand.ctaDashboard')}
            <ArrowRight aria-hidden />
          </a>
          <a href="#who-i-am" className={buttonClasses('secondary')}>
            {t('content.brand.ctaStory')}
            <ArrowDown aria-hidden />
          </a>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
        {facts.map(([label, value]) => (
          <div key={label} className="bg-surface px-5 py-4">
            <dt className="t-label text-ink-3">{label}</dt>
            <dd className="mt-1 text-[15px] font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
