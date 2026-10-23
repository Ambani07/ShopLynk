<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductRow from './ProductRow.vue'
import ShopAvatar from './ShopAvatar.vue'

defineProps({
  // { slug, name, discount, logo?, color, products }
  shop: { type: Object, required: true },
})
defineEmits(['hide'])

const menuOpen = ref(false)
const menu = ref(null)

// Close the menu on a click outside it or on Escape.
const onClick = (event) => {
  if (menu.value && !menu.value.contains(event.target)) menuOpen.value = false
}
const onKey = (event) => {
  if (event.key === 'Escape') menuOpen.value = false
}
onMounted(() => {
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onClick)
  document.removeEventListener('keydown', onKey)
})

const menuItem =
  'block w-full px-4 py-2.5 text-left text-sm text-gray-900 transition-colors hover:bg-gray-50'
</script>

<template>
  <ProductRow :title="`${shop.name} deals`" :products="shop.products">
    <template #header>
      <div class="mx-4 mb-4 flex items-center justify-between gap-4 md:mx-10">
        <RouterLink :to="`/shops/${shop.slug}`" class="group flex min-w-0 items-center gap-3">
          <ShopAvatar :shop="shop" />
          <div class="min-w-0">
            <h2 class="truncate text-lg font-semibold text-gray-900 group-hover:underline">
              {{ shop.name }}
            </h2>
            <p class="text-sm text-gray-500">{{ shop.discount }}% off</p>
          </div>
        </RouterLink>

        <div ref="menu" class="relative">
          <button
            type="button"
            :aria-label="`More options for ${shop.name}`"
            :aria-expanded="menuOpen"
            aria-haspopup="menu"
            class="flex size-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-gray-50"
            @click="menuOpen = !menuOpen"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
              <path
                d="M6 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
              />
            </svg>
          </button>

          <div
            v-if="menuOpen"
            role="menu"
            class="absolute top-12 right-0 z-30 w-56 overflow-hidden rounded-2xl bg-white py-1 shadow-lg ring-1 ring-black/5"
          >
            <RouterLink :to="`/shops/${shop.slug}`" role="menuitem" :class="menuItem">
              Visit shop
            </RouterLink>
            <button type="button" role="menuitem" :class="menuItem" @click="$emit('hide')">
              Hide deals from this shop
            </button>
          </div>
        </div>
      </div>
    </template>
  </ProductRow>
</template>
