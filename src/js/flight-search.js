// ============================================================
// DOM
// ============================================================

const originSelect = document.querySelector('#origin')
const destinationSelect = document.querySelector('#destination')
const swapButton = document.querySelector('#swap-locations')

const originMobile = document.querySelector('#origin-mobile')
const destinationMobile = document.querySelector('#destination-mobile')
const swapLocationsMobile = document.querySelector('#swap-locations-mobile')

// ============================================================
// HELPERS
// ============================================================

function swapSelectValues(origin, destination) {
  if (!origin || !destination) return

  const originValue = origin.value
  const destinationValue = destination.value

  origin.value = destinationValue
  destination.value = originValue
}

// ============================================================
// DESKTOP
// ============================================================

swapButton?.addEventListener('click', () => {
  swapSelectValues(originSelect, destinationSelect)
})

// ============================================================
// MOBILE
// ============================================================

swapLocationsMobile?.addEventListener('click', () => {
  swapSelectValues(originMobile, destinationMobile)
})
