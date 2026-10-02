const registry = new Set()

export function registerDropdowns(...dropdowns) {
  dropdowns.forEach((dropdown) => {
    if (dropdown) registry.add(dropdown)
  })
}

export function setActiveOption(options, value, dataKey) {
  options.forEach((option) => {
    option.classList.toggle('bg-white/30', option.dataset[dataKey] === value)
  })
}

export function toggleDropdown(currentDropdown) {
  if (!currentDropdown) return

  const isOpen = !currentDropdown.classList.contains('hidden')

  // close every dropdown, then reopen the current one if it was closed
  closeAllDropdowns()

  if (!isOpen) {
    currentDropdown.classList.remove('hidden')
  }
}

export function closeDropdown(dropdown) {
  dropdown?.classList.add('hidden')
}

export function closeDropdowns(...dropdowns) {
  dropdowns.forEach((dropdown) => {
    dropdown?.classList.add('hidden')
  })
}

export function closeAllDropdowns() {
  registry.forEach((dropdown) => dropdown.classList.add('hidden'))
}

export function initDropdownCloseHandlers() {
  document.addEventListener('click', closeAllDropdowns)

  window.addEventListener('scroll', closeAllDropdowns, { passive: true })

  window.addEventListener('pagehide', closeAllDropdowns)

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) closeAllDropdowns()
  })
}
