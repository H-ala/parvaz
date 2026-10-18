const heroImage = document.querySelector('#heroImage')
const serviceTabs = document.querySelector('#serviceTabs')
const serviceButtons = document.querySelectorAll('.service-btn')
const serviceIndicator = document.querySelector('#service-indicator')

// Resolve the %BASE_URL% placeholder in case it isn't replaced at build time
const resolveSrc = (src) =>
  src ? src.replace('%BASE_URL%', import.meta.env.BASE_URL) : src

// Keep references so the browser doesn't drop the decoded images
const preloadedImages = new Map()

function preloadImage(src) {
  if (!src) return null
  if (preloadedImages.has(src)) return preloadedImages.get(src)

  const img = new Image()
  img.decoding = 'async'
  img.src = src
  preloadedImages.set(src, img)

  // Decode ahead of time so the swap is instant
  img.decode?.().catch(() => {})
  return img
}

function preloadServiceImages() {
  serviceButtons.forEach((button) => {
    preloadImage(resolveSrc(button.dataset.image))
  })
}

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

  // Preload the other tab images once the page is idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadServiceImages)
  } else {
    window.addEventListener('load', () => setTimeout(preloadServiceImages, 200))
  }

  // ==========================================================
  // SERVICE BUTTONS
  // ==========================================================

  serviceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      serviceButtons.forEach((item) => item.classList.remove('active'))
      button.classList.add('active')

      // move indicator
      moveServiceIndicator(button)

      const newSrc = resolveSrc(button.dataset.image)

      if (!newSrc || heroImage.dataset.currentImage === newSrc) return

      heroImage.dataset.currentImage = newSrc
      heroImage.style.opacity = '0.4'

      const swap = () => {
        // Ignore if the user already clicked another tab
        if (heroImage.dataset.currentImage !== newSrc) return
        heroImage.src = newSrc
        heroImage.style.opacity = '1'
      }

      // Uses the preloaded image if available, otherwise starts loading now
      const img = preloadImage(newSrc)

      if (img.complete && img.naturalWidth > 0) {
        requestAnimationFrame(swap)
      } else {
        img.addEventListener('load', swap, { once: true })
        img.addEventListener('error', swap, { once: true })
      }
    })
  })

  // ==========================================================
  // INITIAL SERVICE
  // ==========================================================

  if (serviceButtons.length > 0) {
    serviceButtons[0].classList.add('active')
    requestAnimationFrame(() => updateIndicator(false))
  }

  // Re-position whenever the tabs container changes size
  if (serviceTabs && 'ResizeObserver' in window) {
    new ResizeObserver(() => updateIndicator(false)).observe(serviceTabs)
  }

  // Extra safety nets (one resize listener only)
  document.fonts?.ready.then(() => updateIndicator(false))
  window.addEventListener('load', () => updateIndicator(false))
  window.addEventListener('resize', () => updateIndicator(false))

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
