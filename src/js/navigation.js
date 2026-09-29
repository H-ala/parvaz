const navigationSelects = document.querySelectorAll(
  '#footerLinksSelect, #quickAccessSelect'
)

navigationSelects.forEach((select) => {
  select.addEventListener('change', () => {
    if (!select.value) return

    const path = select.value.replace(/^\//, '')

    window.location.href = `${import.meta.env.BASE_URL}${path}`
  })
})

// Main navigation
const navigation = document.querySelector('#mainNavigation')
const navItems = document.querySelectorAll('.nav-item')
const navIndicator = document.querySelector('#nav-indicator')

function moveNavIndicator(item) {
  if (!navigation || !navIndicator || !item) return

  const itemRect = item.getBoundingClientRect()
  const navigationRect = navigation.getBoundingClientRect()

  const right =
    navigationRect.right -
    itemRect.right +
    (itemRect.width - navIndicator.offsetWidth) / 2

  navIndicator.style.right = `${right}px`
}

// Navigation click
navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((navItem) => {
      navItem.classList.remove('active')
    })

    item.classList.add('active')

    moveNavIndicator(item)
  })
})

// First item active by default
if (navItems.length > 0) {
  navItems[0].classList.add('active')

  // بعد از render شدن کامل صفحه
  requestAnimationFrame(() => {
    moveNavIndicator(navItems[0])
  })
}

// Keep indicator position correct after resize
window.addEventListener('resize', () => {
  const activeItem = document.querySelector('.nav-item.active') || navItems[0]

  moveNavIndicator(activeItem)
})
