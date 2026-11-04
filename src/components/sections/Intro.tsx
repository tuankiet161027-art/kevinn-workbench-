import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useList } from '../../lib/useList'
import { ChapterLabel } from '../editorial/ChapterLabel'
import { Hero3D } from '../hero/Hero3D'
import { buttonClasses } from '../ui'

/** 00 — Cover. Editorial DNA: kicker label, very large serif tagline, philosophy + 3D Kevin. */
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
    // overflow-x-clip: the giant "KEVIN." watermark is cropped at the edge instead of widening the page
    <section aria-labelledby="intro-heading" className="overflow-x-clip pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* mobile: label → tagline → 3D → philosophy; desktop: text left, 3D right */}
      <div className="grid items-center gap-x-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="lg:col-start-1 lg:row-start-1">
          <ChapterLabel index={0} label={t('content.brand.kicker')} className="mb-6 sm:mb-8" />
          <h1 id="intro-heading" className="t-display">
            {tagline.map((line, i) => (
              <span key={line} className={i === tagline.length - 1 ? 'block text-accent-ink' : 'block'}>
                {line}
              </span>
            ))}
          </h1>
        </div>

        <Hero3D className="my-6 max-w-[360px] sm:max-w-[440px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:my-0 lg:max-w-[560px]" />

        <div className="lg:col-start-1 lg:row-start-2 lg:mt-12">
          <p className="t-label mb-2 text-ink-3">{t('content.brand.philosophyLabel')}</p>
          <p className="t-lede max-w-xl text-ink-2">{t('content.brand.philosophy')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
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
