<script setup>
import { RouterLink } from 'vue-router'
import ScrollArrows from './ScrollArrows.vue'
import { useScrollRow } from '@/composables/useScrollRow'
import { categories } from '@/data/categories'

const { track, canPrev, canNext, update, scroll } = useScrollRow()
</script>

<template>
  <section class="relative mx-auto max-w-[110rem] pt-10 pb-6" aria-label="Shop by category">
    <div
      ref="track"
      class="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:scroll-px-10 md:px-10"
      @scroll.passive="update"
    >
      <div
        v-for="category in categories"
        :key="category.slug"
        class="w-[78vw] max-w-80 shrink-0 snap-start sm:w-80"
      >
        <RouterLink
          :to="`/categories/${category.slug}`"
          class="mb-3 inline-flex items-center gap-1.5 text-lg font-semibold text-gray-900 hover:underline"
        >
          {{ category.name }}
          <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
            <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
          </svg>
        </RouterLink>

        <div class="grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl bg-white">
          <RouterLink
            v-for="sub in category.subcategories"
            :key="sub.slug"
            :to="`/categories/${category.slug}/${sub.slug}`"
            :class="['group relative aspect-[10/9] overflow-hidden', sub.color]"
          >
            <img
              v-if="sub.image"
              :src="sub.image"
              alt=""
              class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <svg
              v-else
              viewBox="0 0 24 24"
              class="absolute -top-[6%] -right-[12%] w-[80%] rotate-[-8deg] text-white/30 transition-transform duration-500 group-hover:scale-105"
              fill="currentColor"
              fill-rule="evenodd"
              aria-hidden="true"
            >
              <path :d="sub.icon" />
            </svg>
            <span
              class="absolute inset-x-3 bottom-2.5 text-sm leading-tight font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            >
              {{ sub.name }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>

    <ScrollArrows :can-prev="canPrev" :can-next="canNext" label="categories" @scroll="scroll" />
  </section>
</template>
