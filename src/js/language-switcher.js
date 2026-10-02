import { changeLanguage, getCurrentLanguage } from '../i18n'

import {
  setActiveOption,
  toggleDropdown,
  closeDropdowns,
  registerDropdowns,
} from './dropdown'

// ============================================================
// INIT
// ============================================================

export function initLanguageSwitcher() {
  // ============================================================
  // DOM
  // ============================================================

  const languageDropdownButton = document.querySelector(
    '#language-dropdown-button'
  )

  const languageDropdown = document.querySelector('#language-dropdown')

  const selectedLanguage = document.querySelector('#selected-language')

  const languageOptions = document.querySelectorAll('.language-option')

  const mobileLanguageButton = document.querySelector(
    '#mobile-language-dropdown-button'
  )

  const mobileLanguageDropdown = document.querySelector(
    '#mobile-language-dropdown'
  )

  const mobileSelectedLanguage = document.querySelector(
    '#mobile-selected-language'
  )

  const mobileLanguageOptions = document.querySelectorAll(
    '.mobile-language-option'
  )

  registerDropdowns(languageDropdown, mobileLanguageDropdown)

  // ============================================================
  // HELPERS
  // ============================================================

  function updateLanguageUI(language) {
    const label = language === 'fa' ? 'فارسی' : 'English'

    if (selectedLanguage) {
      selectedLanguage.textContent = label
    }

    if (mobileSelectedLanguage) {
      mobileSelectedLanguage.textContent = label
    }

    setActiveOption(languageOptions, language, 'language')

    setActiveOption(mobileLanguageOptions, language, 'mobileLanguage')
  }

  // ============================================================
  // DESKTOP
  // ============================================================

  languageDropdownButton?.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleDropdown(languageDropdown)
  })

  languageOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const language = option.dataset.language

      if (!language) return

      closeDropdowns(languageDropdown)

      changeLanguage(language)
    })
  })

  // ============================================================
  // MOBILE
  // ============================================================

  mobileLanguageButton?.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleDropdown(mobileLanguageDropdown)
  })

  mobileLanguageOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const language = option.dataset.mobileLanguage

      if (!language) return

      closeDropdowns(mobileLanguageDropdown)

      changeLanguage(language)
    })
  })

  // ============================================================
  // INITIAL STATE
  // ============================================================

  updateLanguageUI(getCurrentLanguage())

  return {
    languageDropdown,
    mobileLanguageDropdown,
  }
}
