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
} from 'lucide'

const swiperOptions = {
  modules: [Scrollbar, Navigation],
  loop: true,

  slidesPerView: 4,
  spaceBetween: 24,

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

function updateRange() {
  const min = Number(range.min) || 0
  const max = Number(range.max) || 100
  const value = Number(range.value)

  const percent = ((value - min) / (max - min)) * 100

  range.style.background = `
    linear-gradient(
      to left,
      var(--primary) 0%,
      var(--primary) ${percent}%,
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
  },
})
