import { useTranslation } from 'react-i18next'
import { PERSON } from '../../data/kevin-os'
import { useLocale } from '../../lib/useLocale'
import { Avatar } from '../ui'
import { LanguageSwitcher } from './LanguageSwitcher'

/** Sticky top bar: brand + date on the left, VI/EN/中 + avatar on the right. */
export function Header() {
  const { t } = useTranslation()
  const { date } = useLocale()
  const now = new Date()

  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <a href="#top" aria-label={t('header.home')} className="flex shrink-0 items-center gap-2.5 rounded-full">
            <span className="relative inline-flex size-8 items-center justify-center rounded-[10px] bg-ink font-display text-[15px] font-semibold text-paper">
              {PERSON.initial}
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-accent ring-2 ring-paper" />
            </span>
            <span className="text-sm font-semibold tracking-[0.08em]">{t('app.name')}</span>
          </a>
          <span className="hidden h-4 w-px bg-line-strong md:block" aria-hidden />
          <time
            dateTime={now.toISOString().slice(0, 10)}
            className="hidden truncate text-[13px] text-ink-3 first-letter:uppercase md:block"
          >
            {date(now, { weekday: 'long', day: 'numeric', month: 'long' })}
          </time>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <Avatar name={PERSON.name} size="sm" className="hidden sm:inline-flex" />
        </div>
      </div>
    </header>
  )
}
