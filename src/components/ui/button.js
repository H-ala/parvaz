const variants = {
    lightBlue: `bg-light-primary text-white hover:bg-light-primary/80`,
  blue: `bg-blue-600 text-white hover:bg-blue-700`,

  yellow: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,

  outline: `border border-border bg-transparent text-foreground`,

  ghost: `bg-transparent text-foreground`,
}

const baseClasses = `
inline-flex
items-center
justify-center
gap-2
rounded-full
px-4
py-2
text-sm
font-medium
transition-colors
outline-none
disabled:pointer-events-none
disabled:opacity-50
    `

export function Button({
  children = "",
  variant = "blue",
  type = "button",
  disabled = false,
  className = "",
  ...attributes
} = {}) {
  const variantClasses = variants[variant] ?? variants.blue

  const attributeString = Object.entries(attributes)
    .map(([key, value]) => {
      if (value === false || value == null) return ""

      if (value === true) {
        return key
      }

      return `${key}="${String(value).replace(/"/g, "&quot;")}"`
})
.filter(Boolean)
    .join(" ")

return `
    <button
      type="${type}"
      ${disabled ? "disabled" : ""}
      ${attributeString}
      class="${baseClasses} ${variantClasses} ${className}"
    >
      ${children}
    </button>
  `
}
