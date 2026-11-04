import 'i18next'
import type vi from './locales/vi.json'

// vi.json is the source of truth: a typo in t('…') becomes a compile error.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: typeof vi }
    returnNull: false
  }
}
