const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })

// 149 → "$149.00"
export const formatPrice = (amount) => currency.format(amount)

// 8900 → "8.9k"
export const formatCount = (count) => compact.format(count).toLowerCase()
