import Swiper from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

import { Navigation, Scrollbar } from 'swiper/modules'

// ============================================================
// DEFAULT SWIPER
// ============================================================

const defaultSwiperOptions = {
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

document.querySelectorAll('.mySwiper').forEach((swiperElement) => {
  const parent = swiperElement.parentElement

  new Swiper(swiperElement, {
    ...defaultSwiperOptions,

    scrollbar: {
      el: swiperElement.querySelector('.swiper-scrollbar'),
      draggable: true,
    },

    navigation: {
      nextEl: parent?.querySelector('.swiper-button-next'),
      prevEl: parent?.querySelector('.swiper-button-prev'),
    },
  })
})

// ============================================================
// BUDGET SWIPER
// ============================================================

new Swiper('.budgetSwiper', {
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

// ============================================================
// BLOG SWIPER
// ============================================================

new Swiper('.blogSwiper', {
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
