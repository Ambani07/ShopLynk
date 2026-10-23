<script setup>
import BrowseCategories from '@/components/BrowseCategories.vue'
import ExploreStories from '@/components/ExploreStories.vue'
import ProductRow from '@/components/ProductRow.vue'
import { productSections } from '@/data/products'
</script>

<template>
  <main class="flex-1 bg-canvas">
    <ExploreStories />
    <BrowseCategories />
    <ProductRow
      v-for="section in productSections"
      :key="section.slug"
      :title="section.title"
      :to="section.to"
      :products="section.products"
      class="last:pb-16"
    />
  </main>
</template>
