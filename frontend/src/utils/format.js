// Prices are South African Rand, written the South African way.
const currency = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' })
const wholeCurrency = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
})
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

// 1234.5 → "R 1 234,50"
export const formatPrice = (amount) => currency.format(amount)

// 1299 → "R 1 299", for price ranges and filters
export const formatWholePrice = (amount) => wholeCurrency.format(amount)

// 8900 → "8.9k"
export const formatCount = (count) => compact.format(count).toLowerCase()

// "2026-10-18" → "Oct 18, 2026"
export const formatDate = (iso) => longDate.format(new Date(`${iso}T00:00`))

// "2026-10-30" → "Fri, Oct 30"
export const formatDay = (iso) => shortDate.format(new Date(`${iso}T00:00`))
