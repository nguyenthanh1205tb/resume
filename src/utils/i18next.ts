import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from 'src/locales/en.json'
import vi from 'src/locales/vi.json'

const resources = {
  vi,
  en,
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'vi',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })

const loadedLanguages = ['vi']

function setI18nLanguage(lang: string): string {
  i18n.changeLanguage(lang)
  document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string) {
  if (i18n.language === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  const msg = await import(`src/locales/${lang}.json`)
  i18n.addResources(lang, 'translation', msg.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export default i18n
