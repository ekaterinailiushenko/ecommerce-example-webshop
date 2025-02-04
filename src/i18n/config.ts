import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'

const resources = {
  en: { translation: en },
}

await i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en'],
  preload: ['en'],
})

export default i18next
