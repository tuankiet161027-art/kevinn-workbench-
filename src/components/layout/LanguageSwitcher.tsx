import { useTranslation } from 'react-i18next'
import { LANGUAGES, getLanguageMeta, setLanguage } from '../../i18n'
import { cn } from '../../lib/cn'

/**
 * Segmented "VI / EN / 中" control.
 * - aria-pressed marks the active language for screen readers
 * - each button announces the language in its OWN script ("中文", not "Chinese"),
 *   so a reader who can't read the current UI can still find their language
 * - setLanguage() switches AND persists to localStorage (only explicit choices are saved)
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = getLanguageMeta(i18n.resolvedLanguage).code

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn('inline-flex items-center rounded-full border border-line bg-surface p-0.5 shadow-card', className)}
    >
      {LANGUAGES.map(({ code, short, htmlLang }) => {
        const active = code === current
        const native = t(`language.native.${code}`)
        return (
          <button
            key={code}
            type="button"
            lang={htmlLang}
            aria-pressed={active}
            aria-label={active ? native : t('language.switchTo', { name: native })}
            title={native}
            onClick={() => void setLanguage(code)}
            className={cn(
              'h-7 min-w-9 rounded-full px-2.5 text-xs font-semibold tracking-wide transition-colors duration-150',
              active ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-paper-2 hover:text-ink',
            )}
          >
            {short}
          </button>
        )
      })}
    </div>
  )
}
