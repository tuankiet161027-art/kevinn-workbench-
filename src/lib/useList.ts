import { useTranslation } from 'react-i18next'

/**
 * Read a translated string array (bullet lists) from the locale files.
 * Arrays are checked for equal length across vi/en/zh by scripts/check-locales.mjs.
 */
export function useList() {
  const { t } = useTranslation()
  const tAny = t as unknown as (key: string, opts: { returnObjects: true }) => unknown
  return (key: string): string[] => {
    const value = tAny(key, { returnObjects: true })
    return Array.isArray(value) ? (value as string[]) : []
  }
}
