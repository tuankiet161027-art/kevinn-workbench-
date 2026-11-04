import { useTranslation } from 'react-i18next'
import { PERSON } from '../../data/kevin-os'
import { ChapterSection } from '../editorial/ChapterSection'

/** 02 — Long-term vision, set as a large editorial quote. */
export function Vision() {
  const { t } = useTranslation()
  return (
    <ChapterSection id="vision" index={2} label={t('content.chapters.vision')}>
      <figure className="relative max-w-5xl">
        <span
          className="pointer-events-none absolute -top-10 -left-2 font-display text-[120px] leading-none text-accent/25 select-none sm:-top-14 sm:-left-6 sm:text-[180px]"
          aria-hidden
        >
          “
        </span>
        <blockquote className="t-display-sm relative">{t('content.vision.statement')}</blockquote>
        <figcaption className="t-chapter mt-8 text-ink-3">— {PERSON.name}</figcaption>
      </figure>
    </ChapterSection>
  )
}
