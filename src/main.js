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
} from 'lucide'

const swiper = new Swiper('.mySwiper', {
  modules: [Scrollbar, Navigation],
  loop: true,

  slidesPerView: 4,
  spaceBetween: 24,

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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

    1280: {
      slidesPerView: 4,
      spaceBetween: 18,
    },
  },
})

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
  },
})
