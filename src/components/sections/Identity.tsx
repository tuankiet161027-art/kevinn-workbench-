import { useTranslation } from 'react-i18next'
import { IDENTITY_SECTIONS, PERSON } from '../../data/kevin-os'
import { useList } from '../../lib/useList'
import { InfoCard } from '../cards/InfoCard'
import { ChapterSection } from '../editorial/ChapterSection'

/** 01 — Who I am (Group 1). */
export function Identity() {
  const { t } = useTranslation()
  const list = useList()

  return (
    <ChapterSection id="who-i-am" index={1} label={t('content.chapters.whoIAm')}>
      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
        <div
          className="flex size-20 items-center justify-center rounded-[24px] bg-ink font-display text-4xl font-semibold text-paper shadow-pop sm:size-28 sm:text-5xl"
          aria-hidden
        >
          {PERSON.initial}
        </div>
        <div>
          <p className="t-display">{t('content.profile.name')}</p>
          <p className="t-chapter mt-4 text-accent-ink">{t('content.profile.roles')}</p>
          <p className="t-lede mt-6 max-w-3xl text-ink-2">{t('content.profile.oneLiner')}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3 sm:mt-16">
        {IDENTITY_SECTIONS.map((id, i) => (
          <InfoCard
            key={id}
            index={i + 1}
            title={t(`content.identity.${id}.title`)}
            items={list(`content.identity.${id}.items`)}
          />
        ))}
      </div>
    </ChapterSection>
  )
}
