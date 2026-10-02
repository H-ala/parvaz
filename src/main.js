import './style.css'

import './js/icons'
import './js/flight-search'
import './js/swipers'
import './js/budget-range'
import './js/hero'
import './js/mobile-sidebar'
import './js/mobile-search'
import './js/navigation'

import { initI18n } from './i18n'

import { initLanguageSwitcher } from './js/language-switcher'
import { initCurrencySwitcher } from './js/currency-switcher'

import { initDropdownCloseHandlers } from './js/dropdown'

async function init() {
  await initI18n()

  initLanguageSwitcher()
  initCurrencySwitcher()

  initDropdownCloseHandlers()
}

init()
