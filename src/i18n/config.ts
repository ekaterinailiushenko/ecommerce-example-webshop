import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/translation.json'
import de from './locales/de/translation.json'

const SupportedLanguagesMap = {
  English: { translation: en },
  Deutsch: { translation: de },
}

export type SupportedLanguage = keyof typeof SupportedLanguagesMap

type SupportedLanguages = SupportedLanguage[]

export const SupportedLanguages = Object.keys(SupportedLanguagesMap) as SupportedLanguages

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: SupportedLanguagesMap,
    fallbackLng: 'English',
    supportedLngs: ['English', 'Deutsch'],
  })
