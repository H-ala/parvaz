const heroImage = document.querySelector('#heroImage')
const serviceTabs = document.querySelector('#serviceTabs')
const serviceButtons = document.querySelectorAll('.service-btn')
const serviceIndicator = document.querySelector('#service-indicator')

function moveServiceIndicator(button, animate = true) {
  if (!serviceTabs || !serviceIndicator || !button) return

  const buttonRect = button.getBoundingClientRect()
  const tabsRect = serviceTabs.getBoundingClientRect()

  const indicatorWidth = serviceIndicator.offsetWidth
  const indicatorHeight = serviceIndicator.offsetHeight

  const right =
    tabsRect.right - buttonRect.right + (buttonRect.width - indicatorWidth) / 2

  // align indicator's bottom edge with the button's bottom edge
  const top = buttonRect.bottom - tabsRect.top - indicatorHeight

  if (!animate) serviceIndicator.style.transition = 'none'

  serviceIndicator.style.right = `${right}px`
  serviceIndicator.style.top = `${top}px`
  serviceIndicator.style.bottom = 'auto'

  if (!animate) {
    // force reflow, then restore the CSS transition
    serviceIndicator.offsetHeight
    serviceIndicator.style.transition = ''
  }
}

function updateIndicator(animate = false) {
  const activeButton =
    document.querySelector('.service-btn.active') || serviceButtons[0]
  moveServiceIndicator(activeButton, animate)
}

if (heroImage) {
  // ==========================================================
  // INITIAL IMAGE
  // ==========================================================

  heroImage.dataset.currentImage = heroImage.getAttribute('src')

  // ==========================================================
  // SERVICE BUTTONS
  // ==========================================================

  serviceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      serviceButtons.forEach((item) => {
        item.classList.remove('active')
      })

      button.classList.add('active')

      // حرکت indicator
      moveServiceIndicator(button)

      const newSrc = button.dataset.image

      if (!newSrc || heroImage.dataset.currentImage === newSrc) {
        return
      }

      heroImage.dataset.currentImage = newSrc

      // --------------------------------------------------------
      // PRELOAD IMAGE
      // --------------------------------------------------------

      const preload = new Image()

      preload.onload = () => {
        heroImage.src = newSrc
        heroImage.style.opacity = '1'
      }

      preload.onerror = () => {
        heroImage.src = newSrc
      }

      preload.src = newSrc

      heroImage.style.opacity = '0.4'
    })
  })

  // ==========================================================
  // INITIAL SERVICE
  // ==========================================================

  // INITIAL SERVICE
  if (serviceButtons.length > 0) {
    serviceButtons[0].classList.add('active')
    requestAnimationFrame(() => updateIndicator(false))
  }

  // Re-position whenever the tabs container changes size
  // (icons rendering, font swap, breakpoint change, etc.)
  if (serviceTabs && 'ResizeObserver' in window) {
    new ResizeObserver(() => updateIndicator(false)).observe(serviceTabs)
  }

  // Extra safety nets
  document.fonts?.ready.then(() => updateIndicator(false))
  window.addEventListener('load', () => updateIndicator(false))
  window.addEventListener('resize', () => updateIndicator(false))

  // ==========================================================
  // RESIZE
  // ==========================================================

  window.addEventListener('resize', () => {
    const activeButton =
      document.querySelector('.service-btn.active') || serviceButtons[0]

    moveServiceIndicator(activeButton)
  })

  // ==========================================================
  // FALLBACK
  // ==========================================================

  heroImage.addEventListener('error', () => {
    if (heroImage.dataset.fallbackApplied) return

    heroImage.dataset.fallbackApplied = 'true'

    const fallbackImage = `${import.meta.env.BASE_URL}images/home/hero.png`

    heroImage.src = fallbackImage
    heroImage.dataset.currentImage = fallbackImage
  })

  // ==========================================================
  // LOAD
  // ==========================================================

  heroImage.addEventListener('load', () => {
    delete heroImage.dataset.fallbackApplied
  })
}
