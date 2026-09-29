const mobileSearchButton = document.querySelector('#mobileSearchBtn')

const searchPopup = document.querySelector('#searchPopup')

const searchPopupOverlay = document.querySelector('#searchPopupOverlay')

const closeSearchPopupButton = document.querySelector('#closeSearchPopup')

// ============================================================
// OPEN
// ============================================================

function openSearchPopup() {
  if (!searchPopup || !searchPopupOverlay) {
    return
  }

  searchPopup.classList.remove('opacity-0', 'pointer-events-none', 'scale-95')

  searchPopupOverlay.classList.remove('opacity-0', 'pointer-events-none')

  document.body.style.overflow = 'hidden'
}

// ============================================================
// CLOSE
// ============================================================

function closeSearchPopup() {
  if (!searchPopup || !searchPopupOverlay) {
    return
  }

  searchPopup.classList.add('opacity-0', 'pointer-events-none', 'scale-95')

  searchPopupOverlay.classList.add('opacity-0', 'pointer-events-none')

  document.body.style.overflow = ''
}

// ============================================================
// EVENTS
// ============================================================

mobileSearchButton?.addEventListener('click', openSearchPopup)

closeSearchPopupButton?.addEventListener('click', closeSearchPopup)

searchPopupOverlay?.addEventListener('click', closeSearchPopup)

// ============================================================
// CLOSE BY CLICKING OUTSIDE
// ============================================================

searchPopup?.addEventListener('click', (event) => {
  if (event.target === searchPopup) {
    closeSearchPopup()
  }
})
