<script setup>
import { RouterLink } from 'vue-router'
import { categories } from '@/data/categories'
</script>

<template>
  <nav
    aria-label="Categories"
    class="flex gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-auto md:max-w-5xl md:flex-wrap md:justify-center md:overflow-visible"
  >
    <RouterLink
      v-for="category in categories"
      :key="category.slug"
      :to="`/categories/${category.slug}`"
      class="flex shrink-0 items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
    >
      <span :class="['flex size-8 items-center justify-center rounded-full', category.color]">
        <svg viewBox="0 0 24 24" class="size-4 text-white" fill="currentColor">
          <path :d="category.icon" />
        </svg>
      </span>
      {{ category.name }}
    </RouterLink>
  </nav>
</template>
