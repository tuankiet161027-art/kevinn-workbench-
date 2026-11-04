import { useTranslation } from 'react-i18next'
import { getLanguageMeta } from '../i18n'

/** Locale-aware formatters. Numbers/dates are never translated by hand. */
export function useLocale() {
  const { i18n } = useTranslation()
  const meta = getLanguageMeta(i18n.resolvedLanguage)
  return {
    lang: meta.code,
    intl: meta.intl,
    number: (n: number, opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat(meta.intl, opts).format(n),
    date: (d: Date, opts?: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(meta.intl, opts).format(d),
  }
}
