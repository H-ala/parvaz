const range = document.querySelector('input[type="range"]')
const budgetValue = document.querySelector('#budget-value')

function updateBudgetRange() {
  if (!range || !budgetValue) return

  const min = Number(range.min) || 0
  const max = Number(range.max) || 100
  const value = Number(range.value)

  const percent = ((value - min) / (max - min)) * 100
  const isRtl = document.documentElement.dir === 'rtl'

  budgetValue.textContent = value

  range.style.background = `
    linear-gradient(
      to ${isRtl ? 'left' : 'right'},
      var(--light-primary) 0%,
      var(--light-primary) ${percent}%,
      color-mix(in srgb, var(--primary) 10%, transparent) ${percent}%,
      color-mix(in srgb, var(--primary) 10%, transparent) 100%
    )
  `
}

range?.addEventListener('input', updateBudgetRange)

updateBudgetRange()
