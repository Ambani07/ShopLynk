<script setup>
import { RouterLink } from 'vue-router'
import ProductCard from './ProductCard.vue'
import ScrollArrows from './ScrollArrows.vue'
import { useScrollRow } from '@/composables/useScrollRow'

defineProps({
  title: { type: String, required: true },
  // Link for the default header; not needed when the `header` slot is used.
  to: { type: String, default: '' },
  products: { type: Array, required: true },
})

const { track, canPrev, canNext, update, scroll } = useScrollRow()
</script>

<template>
  <section class="mx-auto max-w-[110rem] py-6" :aria-label="title">
    <slot name="header">
      <RouterLink
        :to="to"
        class="mx-4 mb-3 inline-flex items-center gap-1.5 text-lg font-semibold text-gray-900 hover:underline md:mx-10"
      >
        {{ title }}
        <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
          <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
        </svg>
      </RouterLink>
    </slot>

    <div class="relative">
      <ul
        ref="track"
        class="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:scroll-px-10 md:px-10"
        @scroll.passive="update"
      >
        <li
          v-for="product in products"
          :key="product.slug"
          class="w-[44vw] max-w-68 shrink-0 snap-start sm:w-68"
        >
          <ProductCard :product="product" />
        </li>
      </ul>

      <!-- Centre the arrows on the images (17rem tall on desktop) rather than the whole card -->
      <div class="pointer-events-none absolute inset-x-0 top-0 h-68 [&>*]:pointer-events-auto">
        <ScrollArrows :can-prev="canPrev" :can-next="canNext" label="products" @scroll="scroll" />
      </div>
    </div>
  </section>
</template>
