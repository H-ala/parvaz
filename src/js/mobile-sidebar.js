const mobileMenuButton = document.querySelector('#mobileMenuBtn')

const bottomMenuButton = document.querySelector('#bottomMenuBtn')

const closeSidebarButton = document.querySelector('#closeSidebarBtn')

const mobileSidebar = document.querySelector('#mobileSidebar')

const mobileMenuOverlay = document.querySelector('#mobileMenuOverlay')

// ============================================================
// OPEN
// ============================================================

function openSidebar() {
  if (!mobileSidebar || !mobileMenuOverlay) {
    return
  }

  mobileSidebar.classList.remove('translate-x-full')

  mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none')

  document.body.style.overflow = 'hidden'
}

// ============================================================
// CLOSE
// ============================================================

function closeSidebar() {
  if (!mobileSidebar || !mobileMenuOverlay) {
    return
  }

  mobileSidebar.classList.add('translate-x-full')

  mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none')

  document.body.style.overflow = ''
}

// ============================================================
// EVENTS
// ============================================================

mobileMenuButton?.addEventListener('click', openSidebar)

bottomMenuButton?.addEventListener('click', openSidebar)

closeSidebarButton?.addEventListener('click', closeSidebar)

mobileMenuOverlay?.addEventListener('click', closeSidebar)

// ============================================================
// CLOSE ON LINK CLICK
// ============================================================

mobileSidebar?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeSidebar)
})
