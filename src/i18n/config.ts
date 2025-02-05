import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

import en from './locales/en/translation.json'
import de from './locales/de/translation.json'

export const resources = {
  English: { translation: en },
  Deutsch: { translation: de },
}

await i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'English',
    supportedLngs: Object.keys(resources),
  })

export default i18n
