import {
  setActiveOption,
  toggleDropdown,
  closeDropdowns,
  registerDropdowns,
} from './dropdown'

// ============================================================
// INIT
// ============================================================

export function initCurrencySwitcher() {
  // ============================================================
  // DOM
  // ============================================================

  const currencyDropdownButton = document.querySelector(
    '#currency-dropdown-button'
  )

  const currencyDropdown = document.querySelector('#currency-dropdown')

  const selectedCurrency = document.querySelector('#selected-currency')

  const currencyOptions = document.querySelectorAll('.currency-option')

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

  registerDropdowns(currencyDropdown, mobileCurrencyDropdown)

  // ============================================================
  // DESKTOP
  // ============================================================

  currencyDropdownButton?.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleDropdown(currencyDropdown)
  })

  currencyOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const currency = option.dataset.currency

      if (!currency) return

      if (selectedCurrency) {
        selectedCurrency.textContent = currency
      }

      setActiveOption(currencyOptions, currency, 'currency')

      closeDropdowns(currencyDropdown)
    })
  })

  // ============================================================
  // MOBILE
  // ============================================================

  mobileCurrencyButton?.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleDropdown(mobileCurrencyDropdown)
  })

  mobileCurrencyOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const currency = option.dataset.mobileCurrency

      if (!currency) return

      if (mobileSelectedCurrency) {
        mobileSelectedCurrency.textContent = currency
      }

      setActiveOption(mobileCurrencyOptions, currency, 'mobileCurrency')

      closeDropdowns(mobileCurrencyDropdown)
    })
  })

  // ============================================================
  // INITIAL STATE
  // ============================================================

  setActiveOption(currencyOptions, 'IRR', 'currency')

  setActiveOption(mobileCurrencyOptions, 'IRR', 'mobileCurrency')

  return {
    currencyDropdown,
    mobileCurrencyDropdown,
  }
}
