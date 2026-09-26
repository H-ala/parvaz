import './style.css'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Scrollbar } from 'swiper/modules'
import { Navigation } from 'swiper/modules'

import {
  createIcons,
  BadgeDollarSign,
  ChevronDown,
  Earth,
  ShoppingBag,
  CircleUser,
  MoveLeft,
  LineSquiggle,
  Plane,
  Search,
  ChevronRight,
  ChevronLeft,
  ArrowLeftRight,
  Lock,
  Flame,
  Megaphone,
  Star,
  Zap,
  Hotel,
  CircleCheck,
  ClipboardList,
  ChevronsUp,
  PhoneCall,
  Smartphone,
  AtSign,
  Camera,
  Send,
  Menu,
  House,
  User,
  X,
  Globe,
  Map,
  Bus,
  ShieldCheck,
  Headset,
  BadgeCheck,
} from 'lucide'

const originSelect = document.querySelector('#origin')
const destinationSelect = document.querySelector('#destination')
const swapButton = document.querySelector('#swap-locations')

swapButton.addEventListener('click', () => {
  const originValue = originSelect.value
  const destinationValue = destinationSelect.value

  originSelect.value = destinationValue
  destinationSelect.value = originValue
})

const swiperOptions = {
  modules: [Scrollbar, Navigation],
  loop: true,

  slidesPerView: 1.3,
  spaceBetween: 12,

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 18,
    },

    1280: {
      slidesPerView: 4,
      spaceBetween: 18,
    },
  },
}

document.querySelectorAll('.mySwiper').forEach((swiperEl) => {
  const parent = swiperEl.parentElement

  new Swiper(swiperEl, {
    ...swiperOptions,

    scrollbar: {
      el: swiperEl.querySelector('.swiper-scrollbar'),
      draggable: true,
    },

    navigation: {
      nextEl: parent.querySelector('.swiper-button-next'),
      prevEl: parent.querySelector('.swiper-button-prev'),
    },
  })
})

const budgetSwiper = new Swiper('.budgetSwiper', {
  modules: [Scrollbar],
  loop: true,

  slidesPerView: 1.7,
  spaceBetween: 16,

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 18,
    },
  },
})

const blogSwiper = new Swiper('.blogSwiper', {
  modules: [Scrollbar],
  loop: true,

  slidesPerView: 1,
  spaceBetween: 24,

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 18,
    },
  },
})

const range = document.querySelector('input[type="range"]')
const budgetValue = document.querySelector('#budget-value')

function updateRange() {
  const min = Number(range.min) || 0
  const max = Number(range.max) || 100
  const value = Number(range.value)

  const percent = ((value - min) / (max - min)) * 100

  // نمایش مقدار بودجه
  budgetValue.textContent = value

  // نمایش رنگ پس‌زمینه اسلایدر
  range.style.background = `
    linear-gradient(
      to left,
      var(--light-primary) 0%,
      var(--light-primary) ${percent}%,
      color-mix(in srgb, var(--primary) 10%, transparent) ${percent}%,
      color-mix(in srgb, var(--primary) 10%, transparent) 100%
    )
  `
}

range.addEventListener('input', updateRange)

updateRange()

createIcons({
  icons: {
    BadgeDollarSign,
    ChevronDown,
    Earth,
    ShoppingBag,
    CircleUser,
    MoveLeft,
    LineSquiggle,
    Plane,
    Search,
    ChevronRight,
    ChevronLeft,
    ArrowLeftRight,
    Lock,
    Flame,
    Megaphone,
    Star,
    Zap,
    Hotel,
    CircleCheck,
    ClipboardList,
    ChevronsUp,
    PhoneCall,
    Smartphone,
    AtSign,
    Send,
    Camera,
    Menu,
    House,
    User,
    X,
    Globe,
    Map,
    Bus,
    ShieldCheck,
    Headset,
    BadgeCheck,
  },
})

const mobileMenuBtn = document.querySelector('#mobileMenuBtn')
const bottomMenuBtn = document.querySelector('#bottomMenuBtn')
const closeSidebarBtn = document.querySelector('#closeSidebarBtn')
const mobileSidebar = document.querySelector('#mobileSidebar')
const mobileMenuOverlay = document.querySelector('#mobileMenuOverlay')
const mobileSearchBtn = document.querySelector('#mobileSearchBtn')
const heroImage = document.getElementById('heroImage')
const buttons = document.querySelectorAll('.service-btn')

// track the *intended* image, not the resolved src
heroImage.dataset.currentImage = heroImage.getAttribute('src')

let fadeTimeout = null

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')

    const newSrc = btn.dataset.image
    if (!newSrc || heroImage.dataset.currentImage === newSrc) return

    heroImage.dataset.currentImage = newSrc

    // preload so the fade-in only starts once the image is actually ready
    const preload = new Image()
    preload.onload = () => {
      heroImage.src = newSrc
      heroImage.style.opacity = '1'
    }
    preload.onerror = () => {
      // let the existing error handler on heroImage deal with the fallback
      heroImage.src = newSrc
    }
    preload.src = newSrc

    heroImage.style.opacity = '0.4' // brief dim instead of a full blank-out
  })
})

// fallback if an image 404s, so you don't get a broken-icon dead end
heroImage.addEventListener('error', () => {
  if (heroImage.dataset.fallbackApplied) return
  heroImage.dataset.fallbackApplied = 'true'
  heroImage.src = `${import.meta.env.BASE_URL}images/home/hero.png`
  heroImage.dataset.currentImage = `${import.meta.env.BASE_URL}images/home/hero.png`
})

heroImage.addEventListener('load', () => {
  delete heroImage.dataset.fallbackApplied
})

document
  .querySelectorAll('#footerLinksSelect, #quickAccessSelect')
  .forEach((select) => {
    select.addEventListener('change', () => {
      if (select.value) {
        window.location.href = `${import.meta.env.BASE_URL}${select.value.replace(/^\//, '')}`
      }
    })
  })

function openSidebar() {
  mobileSidebar.classList.remove('translate-x-full')
  mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none')
  document.body.style.overflow = 'hidden'
}

function closeSidebar() {
  mobileSidebar.classList.add('translate-x-full')
  mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none')
  document.body.style.overflow = ''
}

mobileMenuBtn?.addEventListener('click', openSidebar)
bottomMenuBtn?.addEventListener('click', openSidebar)
closeSidebarBtn.addEventListener('click', closeSidebar)
mobileMenuOverlay.addEventListener('click', closeSidebar)

mobileSidebar.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeSidebar)
})

// mobile search popup — opens 5s after load
const searchPopup = document.querySelector('#searchPopup')
const searchPopupOverlay = document.querySelector('#searchPopupOverlay')
const closeSearchPopup = document.querySelector('#closeSearchPopup')
const swapLocationsMobile = document.querySelector('#swap-locations-mobile')
const originMobile = document.querySelector('#origin-mobile')
const destinationMobile = document.querySelector('#destination-mobile')

function openSearchPopup() {
  searchPopup.classList.remove('opacity-0', 'pointer-events-none', 'scale-95')
  searchPopupOverlay.classList.remove('opacity-0', 'pointer-events-none')
  document.body.style.overflow = 'hidden'
}

mobileSearchBtn?.addEventListener('click', openSearchPopup)

searchPopup?.addEventListener('click', (event) => {
  if (event.target === searchPopup) {
    closeSearchPopupFn()
  }
})

function closeSearchPopupFn() {
  searchPopup.classList.add('opacity-0', 'pointer-events-none', 'scale-95')
  searchPopupOverlay.classList.add('opacity-0', 'pointer-events-none')
  document.body.style.overflow = ''
}

closeSearchPopup?.addEventListener('click', closeSearchPopupFn)
searchPopupOverlay?.addEventListener('click', closeSearchPopupFn)

swapLocationsMobile?.addEventListener('click', () => {
  const originValue = originMobile.value
  const destinationValue = destinationMobile.value
  originMobile.value = destinationValue
  destinationMobile.value = originValue
})
