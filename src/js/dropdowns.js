// ============================================================
// DOM - DESKTOP CURRENCY
// ============================================================

const currencyDropdownButton = document.querySelector(
  '#currency-dropdown-button'
)

const currencyDropdown = document.querySelector('#currency-dropdown')

const selectedCurrency = document.querySelector('#selected-currency')

const currencyOptions = document.querySelectorAll('.currency-option')

// ============================================================
// DOM - DESKTOP LANGUAGE
// ============================================================

const languageDropdownButton = document.querySelector(
  '#language-dropdown-button'
)

const languageDropdown = document.querySelector('#language-dropdown')

const selectedLanguage = document.querySelector('#selected-language')

const languageOptions = document.querySelectorAll('.language-option')

// ============================================================
// DOM - MOBILE CURRENCY
// ============================================================

const mobileCurrencyButton = document.querySelector(
  '#mobile-currency-dropdown-button'
)

const mobileCurrencyDropdown = document.querySelector(
  '#mobile-currency-dropdown'
)

const mobileSelectedCurrency = document.querySelector(
  '#mobile-selected-currency'
)

const mobileCurrencyOptions = document.querySelectorAll(
  '.mobile-currency-option'
)

// ============================================================
// DOM - MOBILE LANGUAGE
// ============================================================

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

// ============================================================
// HELPERS
// ============================================================

function setActiveOption(options, value, dataKey) {
  options.forEach((option) => {
    option.classList.toggle('bg-white/30', option.dataset[dataKey] === value)
  })
}

function toggleDropdown(currentDropdown, otherDropdown) {
  if (!currentDropdown) return

  const isOpen = !currentDropdown.classList.contains('hidden')

  otherDropdown?.classList.add('hidden')

  if (isOpen) {
    currentDropdown.classList.add('hidden')
  } else {
    currentDropdown.classList.remove('hidden')
  }
}

function closeAllDropdowns() {
  currencyDropdown?.classList.add('hidden')
  languageDropdown?.classList.add('hidden')

  mobileCurrencyDropdown?.classList.add('hidden')
  mobileLanguageDropdown?.classList.add('hidden')
}

// ============================================================
// DESKTOP CURRENCY
// ============================================================

currencyDropdownButton?.addEventListener('click', (event) => {
  event.stopPropagation()

  toggleDropdown(currencyDropdown, languageDropdown)
})

currencyOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const currency = option.dataset.currency

    if (!selectedCurrency || !currencyDropdown) return

    selectedCurrency.textContent = currency

    currencyDropdown.classList.add('hidden')

    setActiveOption(currencyOptions, currency, 'currency')
  })
})

setActiveOption(currencyOptions, 'IRR', 'currency')

// ============================================================
// DESKTOP LANGUAGE
// ============================================================

languageDropdownButton?.addEventListener('click', (event) => {
  event.stopPropagation()

  toggleDropdown(languageDropdown, currencyDropdown)
})

languageOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const language = option.dataset.language

    if (!selectedLanguage || !languageDropdown) return

    selectedLanguage.textContent = language === 'fa' ? 'فارسی' : 'English'

    languageDropdown.classList.add('hidden')

    setActiveOption(languageOptions, language, 'language')
  })
})

setActiveOption(languageOptions, 'fa', 'language')

// ============================================================
// MOBILE CURRENCY
// ============================================================

mobileCurrencyButton?.addEventListener('click', (event) => {
  event.stopPropagation()

  toggleDropdown(mobileCurrencyDropdown, mobileLanguageDropdown)
})

mobileCurrencyOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const currency = option.dataset.mobileCurrency

    if (!mobileSelectedCurrency || !mobileCurrencyDropdown) {
      return
    }

    mobileSelectedCurrency.textContent = currency

    mobileCurrencyDropdown.classList.add('hidden')

    setActiveOption(mobileCurrencyOptions, currency, 'mobileCurrency')
  })
})

setActiveOption(mobileCurrencyOptions, 'IRR', 'mobileCurrency')

// ============================================================
// MOBILE LANGUAGE
// ============================================================

mobileLanguageButton?.addEventListener('click', (event) => {
  event.stopPropagation()

  toggleDropdown(mobileLanguageDropdown, mobileCurrencyDropdown)
})

mobileLanguageOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const language = option.dataset.mobileLanguage

    if (!mobileSelectedLanguage || !mobileLanguageDropdown) {
      return
    }

    mobileSelectedLanguage.textContent = language === 'fa' ? 'فارسی' : 'English'

    mobileLanguageDropdown.classList.add('hidden')

    setActiveOption(mobileLanguageOptions, language, 'mobileLanguage')
  })
})

setActiveOption(mobileLanguageOptions, 'fa', 'mobileLanguage')

// ============================================================
// CLICK OUTSIDE
// ============================================================

document.addEventListener('click', () => {
  closeAllDropdowns()
})

// ============================================================
// CLOSE DROPDOWNS ON SCROLL
// ============================================================

window.addEventListener(
  'scroll',
  () => {
    closeAllDropdowns()
  },
  { passive: true }
)
// ============================================================
// CLOSE DROPDOWNS ON PAGE HIDE / NAVIGATION
// ============================================================

window.addEventListener('pagehide', () => {
  closeAllDropdowns()
})

// ============================================================
// CLOSE DROPDOWNS ON VISIBILITY CHANGE
// ============================================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    closeAllDropdowns()
  }
})

// ============================================================
// CLOSE DROPDOWNS BEFORE NAVIGATION
// ============================================================

document.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    closeAllDropdowns()
  })
})

// ============================================================
// CLOSE DROPDOWNS ON PAGE HIDE / NAVIGATION
// ============================================================

window.addEventListener('pagehide', () => {
  closeAllDropdowns()
})

// ============================================================
// CLOSE DROPDOWNS ON VISIBILITY CHANGE
// ============================================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    closeAllDropdowns()
  }
})

// ============================================================
// CLOSE DROPDOWNS BEFORE NAVIGATION
// ============================================================

document.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    closeAllDropdowns()
  })
})
