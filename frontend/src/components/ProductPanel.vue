<script setup>
import ProductRow from './ProductRow.vue'

// A titled card holding a compact, scrolling product row.
defineProps({
  title: { type: String, required: true },
  products: { type: Array, required: true },
  empty: { type: String, default: 'Nothing here yet.' },
})
</script>

<template>
  <div class="min-w-0 rounded-3xl bg-white py-5 shadow-sm ring-1 ring-black/5 sm:py-6">
    <ProductRow v-if="products.length" :title="title" :products="products" compact>
      <template #header>
        <h2 class="mx-5 mb-4 text-2xl font-semibold tracking-tight text-gray-900 sm:mx-6">
          {{ title }}
        </h2>
      </template>
    </ProductRow>

    <template v-else>
      <h2 class="mx-5 text-2xl font-semibold tracking-tight text-gray-900 sm:mx-6">{{ title }}</h2>
      <p class="mx-5 mt-4 text-sm text-gray-500 sm:mx-6">{{ empty }}</p>
    </template>
  </div>
</template>
