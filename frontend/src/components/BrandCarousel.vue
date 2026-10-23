<script setup>
import { RouterLink } from 'vue-router'
import ScrollArrows from './ScrollArrows.vue'
import { useScrollRow } from '@/composables/useScrollRow'

defineProps({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  brands: { type: Array, required: true },
})

const { track, canPrev, canNext, update, scroll } = useScrollRow()
</script>

<template>
  <section class="mx-auto max-w-[110rem] py-6" :aria-label="`${title} brands`">
    <RouterLink
      :to="`/categories/${slug}`"
      class="mx-4 mb-3 inline-flex items-center gap-1.5 text-lg font-semibold text-gray-900 hover:underline md:mx-10"
    >
      {{ title }}
      <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
        <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
      </svg>
    </RouterLink>

    <div class="relative">
      <div
        ref="track"
        class="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:scroll-px-10 md:px-10"
        @scroll.passive="update"
      >
        <article
          v-for="brand in brands"
          :key="brand.slug"
          :class="[
            'group relative aspect-[2/3] w-[78vw] max-w-80 shrink-0 snap-start overflow-hidden rounded-3xl bg-gradient-to-b sm:w-80',
            brand.background,
          ]"
        >
          <RouterLink
            :to="`/brands/${brand.slug}`"
            class="absolute inset-0"
            :aria-label="brand.name"
          >
            <img
              v-if="brand.image"
              :src="brand.image"
              alt=""
              class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <svg
              v-else
              viewBox="0 0 24 24"
              class="absolute top-[8%] -right-[18%] w-[95%] rotate-[-10deg] text-white/20 transition-transform duration-700 group-hover:scale-105"
              fill="currentColor"
              fill-rule="evenodd"
              aria-hidden="true"
            >
              <path :d="brand.art" />
            </svg>
            <!-- Darken the top for the name, soften the bottom behind the products -->
            <div
              class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/25"
            />
          </RouterLink>

          <div class="pointer-events-none absolute top-4 left-4 text-white drop-shadow">
            <p class="text-sm font-semibold">{{ brand.name }}</p>
            <p class="text-xs">★ {{ brand.rating }} ({{ brand.reviews }})</p>
          </div>

          <div
            class="pointer-events-none absolute inset-x-0 top-[40%] flex justify-center px-4 text-center"
          >
            <span :class="['text-white drop-shadow-lg', brand.wordmark]">{{ brand.name }}</span>
          </div>

          <ul class="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-2">
            <li v-for="product in brand.products" :key="product.name">
              <RouterLink
                :to="`/brands/${brand.slug}`"
                :aria-label="product.name"
                :title="product.name"
                class="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  v-if="product.image"
                  :src="product.image"
                  alt=""
                  class="size-full object-cover"
                />
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  class="w-1/2"
                  :style="{ color: brand.accent }"
                  fill="currentColor"
                  fill-rule="evenodd"
                  aria-hidden="true"
                >
                  <path :d="product.icon" />
                </svg>
              </RouterLink>
            </li>
          </ul>
        </article>
      </div>

      <ScrollArrows :can-prev="canPrev" :can-next="canNext" label="brands" @scroll="scroll" />
    </div>
  </section>
</template>
