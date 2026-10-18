<script setup>
import CategoryChips from '@/components/CategoryChips.vue'
import CategoryGrid from '@/components/CategoryGrid.vue'
import HeroShowcase from '@/components/HeroShowcase.vue'
import HomeSearch from '@/components/HomeSearch.vue'
</script>

<template>
  <main class="flex-1 bg-canvas">
    <!-- Half the visible height (minus the top bar, the mobile tab bar and half the search bar),
         so the search bar lands in the middle of the screen. The showcase sits on the bottom
         edge; any extra height is clipped off the top. -->
    <div
      class="flex h-[calc(50svh-6.25rem-env(safe-area-inset-bottom)/2)] min-h-64 flex-col justify-end overflow-hidden md:h-[calc(50svh-3.75rem)]"
    >
      <HeroShowcase class="shrink-0" />
    </div>
    <HomeSearch />
    <div class="pt-8">
      <CategoryChips />
    </div>
    <CategoryGrid />
  </main>
</template>
