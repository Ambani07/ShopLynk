import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { cartItems, shops } from '@/data/cart'

// `discount` is per unit, so an item's total is (price - discount) × quantity.
export const itemTotal = (item) => (item.price - (item.discount ?? 0)) * item.quantity

export const useCartStore = defineStore('cart', () => {
  const items = ref(cartItems.map((item) => ({ ...item })))
  const saved = ref([])
  // Shops by slug; grows as items from other shops are added.
  const shopIndex = ref({ ...shops })

  // Items grouped by shop, in the order each shop was first added.
  const shopGroups = computed(() => {
    const groups = new Map()
    for (const item of items.value) {
      if (!groups.has(item.shop))
        groups.set(item.shop, { shop: shopIndex.value[item.shop], items: [] })
      groups.get(item.shop).items.push(item)
    }
    return [...groups.values()].map((group) => ({
      ...group,
      subtotal: group.items.reduce((sum, item) => sum + itemTotal(item), 0),
    }))
  })

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + itemTotal(item), 0))

  const take = (list, id) => {
    const index = list.findIndex((item) => item.id === id)
    return index === -1 ? null : list.splice(index, 1)[0]
  }

  const setQuantity = (id, quantity) => {
    if (quantity < 1) return remove(id)
    const item = items.value.find((item) => item.id === id)
    if (item) item.quantity = quantity
  }

  // Adds an item from `shop`, or bumps its quantity if it's already in the cart.
  const addItem = (item, shop) => {
    shopIndex.value[shop.slug] ??= shop
    const quantity = item.quantity ?? 1
    const existing = items.value.find((entry) => entry.id === item.id)
    if (existing) existing.quantity += quantity
    else items.value.push({ ...item, shop: shop.slug, quantity })
  }

  const remove = (id) => take(items.value, id)

  const saveForLater = (id) => {
    const item = take(items.value, id)
    if (item) saved.value.unshift(item)
  }

  const moveToCart = (id) => {
    const item = take(saved.value, id)
    if (item) items.value.push(item)
  }

  const removeSaved = (id) => take(saved.value, id)

  return {
    items,
    saved,
    shopGroups,
    count,
    total,
    setQuantity,
    addItem,
    remove,
    saveForLater,
    moveToCart,
    removeSaved,
  }
})
