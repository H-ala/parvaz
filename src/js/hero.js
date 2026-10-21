const heroImage = document.querySelector('#heroImage')
const heroSource = document.querySelector('#heroSource')
const serviceTabs = document.querySelector('#serviceTabs')
const serviceButtons = document.querySelectorAll('.service-btn')
const serviceIndicator = document.querySelector('#service-indicator')

const desktopQuery = window.matchMedia('(min-width: 1024px)')
const FADE_MS = 200 // keep in sync with duration-200 on the <img>

// Resolve the %BASE_URL% placeholder in case it isn't replaced at build time
const resolveSrc = (src) =>
  src ? src.replace('%BASE_URL%', import.meta.env.BASE_URL) : src

const toMobile = (desktopSrc) => desktopSrc.replace('/desktop/', '/mobile/')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Keep references so the browser doesn't drop the decoded images
const preloadedImages = new Map()

function preloadImage(src) {
  if (!src) return null
  if (preloadedImages.has(src)) return preloadedImages.get(src)

  const img = new Image()
  img.decoding = 'async'
  img.src = src
  preloadedImages.set(src, img)

  return img
}

// Only preload the variant this viewport will actually display
function preloadServiceImages() {
  serviceButtons.forEach((button) => {
    const desktopSrc = resolveSrc(button.dataset.image)
    if (!desktopSrc) return

    preloadImage(desktopQuery.matches ? desktopSrc : toMobile(desktopSrc))
  })
}

/* ---------- Indicator ---------- */

function moveServiceIndicator(button, animate = true) {
  if (!serviceTabs || !serviceIndicator || !button) return

  const buttonRect = button.getBoundingClientRect()
  const tabsRect = serviceTabs.getBoundingClientRect()

  const indicatorWidth = serviceIndicator.offsetWidth
  const indicatorHeight = serviceIndicator.offsetHeight

  const right =
    tabsRect.right - buttonRect.right + (buttonRect.width - indicatorWidth) / 2

  const top = buttonRect.bottom - tabsRect.top - indicatorHeight

  if (!animate) serviceIndicator.style.transition = 'none'

  serviceIndicator.style.right = `${right}px`
  serviceIndicator.style.top = `${top}px`
  serviceIndicator.style.bottom = 'auto'

  if (!animate) {
    serviceIndicator.offsetHeight // force reflow
    serviceIndicator.style.transition = ''
  }
}

function updateIndicator(animate = false) {
  const activeButton =
    document.querySelector('.service-btn.active') || serviceButtons[0]

  moveServiceIndicator(activeButton, animate)
}

/* ---------- Hero image ---------- */

let heroRequestId = 0

async function updateHeroImage(desktopSrc) {
  const requestId = ++heroRequestId
  const mobileSrc = toMobile(desktopSrc)

  heroImage.dataset.currentImage = desktopSrc

  // 1. Load + decode the variant this viewport shows, without touching the DOM
  let loaded = true
  try {
    await preloadImage(desktopQuery.matches ? desktopSrc : mobileSrc).decode()
  } catch {
    loaded = false
  }
  if (requestId !== heroRequestId) return // a newer tab was clicked

  if (!loaded) {
    // Keep the current image rather than swapping to a broken one
    heroImage.dataset.currentImage = heroImage.dataset.shownImage || ''
    return
  }

  // 2. Fade out
  heroImage.style.opacity = '0'
  await wait(FADE_MS)
  if (requestId !== heroRequestId) return

  // 3. Swap while invisible, and wait for the element to decode it
  heroSource.srcset = desktopSrc
  heroImage.src = mobileSrc
  heroImage.dataset.shownImage = desktopSrc
  delete heroImage.dataset.fallbackApplied
  try {
    await heroImage.decode()
  } catch {}
  if (requestId !== heroRequestId) return

  // 4. Fade in
  heroImage.style.opacity = '1'
}

if (heroImage && heroSource) {
  // INITIAL SERVICE
  if (serviceButtons.length > 0) {
    serviceButtons[0].classList.add('active')
    const initialSrc = resolveSrc(serviceButtons[0].dataset.image) || ''
    heroImage.dataset.currentImage = initialSrc
    heroImage.dataset.shownImage = initialSrc
    requestAnimationFrame(() => updateIndicator(false))
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadServiceImages)
  } else {
    window.addEventListener('load', () => setTimeout(preloadServiceImages, 200))
  }

  // SERVICE BUTTONS
  serviceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      serviceButtons.forEach((item) => item.classList.remove('active'))
      button.classList.add('active')

      moveServiceIndicator(button)

      const newSrc = resolveSrc(button.dataset.image)
      if (!newSrc) return
      if (heroImage.dataset.currentImage === newSrc) return

      updateHeroImage(newSrc)
    })
  })

  // If the viewport crosses the 1024px breakpoint, make sure the new variant is ready
  desktopQuery.addEventListener('change', preloadServiceImages)

  // Re-position indicator when tabs change size
  if (serviceTabs && 'ResizeObserver' in window) {
    new ResizeObserver(() => updateIndicator(false)).observe(serviceTabs)
  }

  document.fonts?.ready.then(() => updateIndicator(false))
  window.addEventListener('load', () => updateIndicator(false))
  window.addEventListener('resize', () => updateIndicator(false))

  // FALLBACK
  const fallbackImage = `${import.meta.env.BASE_URL}images/home/hero.png`

  heroImage.addEventListener('error', () => {
    if (heroImage.dataset.fallbackApplied) return
    heroImage.dataset.fallbackApplied = 'true'

    heroSource.srcset = fallbackImage
    heroImage.src = fallbackImage
    heroImage.dataset.currentImage = fallbackImage
    heroImage.style.opacity = '1'
  })
}
