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
  },
})

const mobileMenuBtn = document.querySelector('#mobileMenuBtn')
const bottomMenuBtn = document.querySelector('#bottomMenuBtn')
const closeSidebarBtn = document.querySelector('#closeSidebarBtn')
const mobileSidebar = document.querySelector('#mobileSidebar')
const mobileMenuOverlay = document.querySelector('#mobileMenuOverlay')

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

function closeSearchPopupFn() {
  searchPopup.classList.add('opacity-0', 'pointer-events-none', 'scale-95')
  searchPopupOverlay.classList.add('opacity-0', 'pointer-events-none')
  document.body.style.overflow = ''
}

if (searchPopup && window.innerWidth < 1024) {
  setTimeout(openSearchPopup, 5000)
}

closeSearchPopup?.addEventListener('click', closeSearchPopupFn)
searchPopupOverlay?.addEventListener('click', closeSearchPopupFn)

swapLocationsMobile?.addEventListener('click', () => {
  const originValue = originMobile.value
  const destinationValue = destinationMobile.value
  originMobile.value = destinationValue
  destinationMobile.value = originValue
})
