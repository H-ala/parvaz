import i18next from 'i18next'

import faHome from './fa/home'
import faCommon from './fa/common.js'

import enHome from './en/home'
import enCommon from './en/common.js'

const resources = {
  fa: {
    translation: {
      home: faHome,
      common: faCommon,
    },
  },

  en: {
    translation: {
      home: enHome,
      common: enCommon,
    },
  },
}

const supportedLanguages = ['fa', 'en']

function getLanguageFromUrl() {
  const segments = window.location.pathname.split('/').filter(Boolean)

  const language = segments[1]

  if (supportedLanguages.includes(language)) {
    return language
  }

  return 'fa'
}

export async function initI18n() {
  const language = getLanguageFromUrl()

  await i18next.init({
    lng: language,
    fallbackLng: 'fa',
    resources,
    interpolation: {
      escapeValue: false,
    },
  })

  updateDocumentDirection(language)
  translatePage()

  return language
}

export function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n

    element.textContent = i18next.t(key)
  })
}

export function updateDocumentDirection(language) {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
}

export function getCurrentLanguage() {
  return i18next.language
}

export function changeLanguage(language) {
  if (!supportedLanguages.includes(language)) {
    return
  }

  const pathname = window.location.pathname

  const segments = pathname.split('/').filter(Boolean)

  // /parvaz/fa/...
  const basePath = `/${segments[0] || 'parvaz'}`

  const rest = segments.slice(2)

  const targetPath = [basePath, language, ...rest].join('/')

  window.location.href = `${targetPath}/`
}
