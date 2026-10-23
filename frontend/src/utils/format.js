const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
const longDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
const shortDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

// 149 → "$149.00"
export const formatPrice = (amount) => currency.format(amount)

// 8900 → "8.9k"
export const formatCount = (count) => compact.format(count).toLowerCase()

// "2026-10-18" → "Oct 18, 2026"
export const formatDate = (iso) => longDate.format(new Date(`${iso}T00:00`))

// "2026-10-30" → "Fri, Oct 30"
export const formatDay = (iso) => shortDate.format(new Date(`${iso}T00:00`))
