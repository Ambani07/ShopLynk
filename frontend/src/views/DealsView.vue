<script setup>
import { computed, ref } from 'vue'
import DealShopRow from '@/components/DealShopRow.vue'
import { dealShops } from '@/data/deals'

const hidden = ref(new Set())
const shops = computed(() => dealShops.filter((shop) => !hidden.value.has(shop.slug)))

const hide = (slug) => {
  hidden.value = new Set(hidden.value).add(slug)
}
</script>

<template>
  <main class="flex-1 bg-canvas pt-8 pb-16">
    <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900">Deals</h1>

    <div class="mt-4">
      <DealShopRow v-for="shop in shops" :key="shop.slug" :shop="shop" @hide="hide(shop.slug)" />
    </div>

    <p v-if="!shops.length" class="mt-8 text-center text-gray-500">No deals to show right now.</p>
  </main>
</template>
