import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import vi from './locales/vi.json'
import en from './locales/en.json'
import zh from './locales/zh.json'

export const LANGUAGES = [
  { code: 'vi', short: 'VI', htmlLang: 'vi', intl: 'vi-VN' },
  { code: 'en', short: 'EN', htmlLang: 'en', intl: 'en-GB' },
  { code: 'zh', short: '中', htmlLang: 'zh-Hans', intl: 'zh-CN' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']
export const DEFAULT_LANGUAGE: LanguageCode = 'vi'
export const STORAGE_KEY = 'kevin-os.lang'

export const resources = {
  vi: { translation: vi },
  en: { translation: en },
  zh: { translation: zh },
} as const

export function getLanguageMeta(code: string | undefined) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]
}

/** Keep <html lang>, <title> in sync so :lang(zh) typography and screen readers follow the UI. */
function syncDocument(lng: string) {
  const meta = getLanguageMeta(lng)
  document.documentElement.lang = meta.htmlLang
  document.title = i18n.t('app.documentTitle')
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: LANGUAGES.map((l) => l.code),
    fallbackLng: DEFAULT_LANGUAGE,
    // zh-CN, zh-TW, en-US, vi-VN … → zh / en / vi
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      // 1st visit: browser language. After a choice: localStorage wins.
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      // Don't auto-save the detected language: until the user picks one,
      // the page keeps following the browser. setLanguage() saves explicit choices.
      caches: [],
    },
    interpolation: { escapeValue: false }, // React already escapes
    returnNull: false,
  })

/** Explicit user choice: switch + remember. */
export function setLanguage(code: LanguageCode) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* private mode / blocked storage: still switch for this session */
  }
  return i18n.changeLanguage(code)
}

syncDocument(i18n.resolvedLanguage ?? DEFAULT_LANGUAGE)
i18n.on('languageChanged', syncDocument)

export default i18n
