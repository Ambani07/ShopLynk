<script setup>
import { nextTick, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from './ProductCard.vue'
import ScrollArrows from './ScrollArrows.vue'
import { useScrollRow } from '@/composables/useScrollRow'

const props = defineProps({
  title: { type: String, required: true },
  // Link for the default header (plain heading without one); unused with the `header` slot.
  to: { type: String, default: '' },
  products: { type: Array, required: true },
  // Tighter padding for rows inside a panel; `compact` also uses smaller cards.
  inset: Boolean,
  compact: Boolean,
  // Light text, for rows on a dark background.
  onDark: Boolean,
})

const { track, canPrev, canNext, update, scroll } = useScrollRow()

// When the products change (e.g. a subcategory filter), start from the left again
// and re-check which arrows are needed once the new cards have rendered.
watch(
  () => props.products,
  async () => {
    await nextTick()
    if (track.value) track.value.scrollLeft = 0
    update()
  },
)
</script>

<template>
  <section :class="inset || compact ? '' : 'mx-auto max-w-[110rem] py-6'" :aria-label="title">
    <slot name="header">
      <RouterLink
        v-if="to"
        :to="to"
        class="mx-4 mb-3 inline-flex items-center gap-1.5 text-lg font-semibold text-gray-900 hover:underline md:mx-10"
      >
        {{ title }}
        <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
          <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
        </svg>
      </RouterLink>
      <h2 v-else class="mx-4 mb-3 text-lg font-semibold text-gray-900 md:mx-10">{{ title }}</h2>
    </slot>

    <div class="relative">
      <ul
        ref="track"
        :class="[
          'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none]',
          inset || compact
            ? 'scroll-px-5 px-5 sm:scroll-px-6 sm:px-6'
            : 'scroll-px-4 px-4 md:scroll-px-10 md:px-10',
        ]"
        @scroll.passive="update"
      >
        <li
          v-for="product in products"
          :key="product.slug"
          :class="[
            'shrink-0 snap-start',
            compact ? 'w-[40vw] max-w-48 sm:w-48' : 'w-[44vw] max-w-68 sm:w-68',
          ]"
        >
          <ProductCard :product="product" :on-dark="onDark" />
        </li>
      </ul>

      <!-- Centre the arrows on the images (their desktop height) rather than the whole card -->
      <div
        :class="[
          'pointer-events-none absolute inset-x-0 top-0 [&>*]:pointer-events-auto',
          compact ? 'h-48' : 'h-68',
        ]"
      >
        <ScrollArrows :can-prev="canPrev" :can-next="canNext" label="products" @scroll="scroll" />
      </div>
    </div>
  </section>
</template>
