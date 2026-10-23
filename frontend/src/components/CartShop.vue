<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CartItem from './CartItem.vue'
import { formatCount, formatPrice } from '@/utils/format'

const props = defineProps({
  shop: { type: Object, required: true },
  items: { type: Array, required: true },
  subtotal: { type: Number, required: true },
})

// Placeholder logo: the shop's initials.
const initials = computed(() =>
  props.shop.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join(''),
)
</script>

<template>
  <section
    class="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
    :aria-label="`${shop.name} cart`"
  >
    <header class="flex items-center gap-3">
      <img
        v-if="shop.logo"
        :src="shop.logo"
        alt=""
        class="size-12 rounded-full object-cover ring-1 ring-black/5"
      />
      <span
        v-else
        :class="[
          'flex size-12 items-center justify-center rounded-full text-sm font-bold text-white',
          shop.color,
        ]"
        aria-hidden="true"
      >
        {{ initials }}
      </span>
      <div>
        <RouterLink :to="`/shops/${shop.slug}`" class="font-semibold text-gray-900 hover:underline">
          {{ shop.name }}
        </RouterLink>
        <p class="text-xs text-gray-700">{{ shop.rating }} ★ ({{ formatCount(shop.reviews) }})</p>
      </div>
    </header>

    <ul class="mt-6 space-y-8">
      <CartItem v-for="item in items" :key="item.id" :item="item" />
    </ul>

    <div class="mt-10 flex justify-between px-2 text-gray-900">
      <span>Subtotal</span>
      <span class="font-semibold">{{ formatPrice(subtotal) }}</span>
    </div>
  </section>
</template>
