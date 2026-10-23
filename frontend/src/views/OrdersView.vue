<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import OrderCard from '@/components/OrderCard.vue'
import { orders } from '@/data/orders'

const filters = [
  { key: 'all', label: 'All', match: () => true },
  {
    key: 'active',
    label: 'In progress',
    match: (o) => !['delivered', 'cancelled'].includes(o.status),
  },
  { key: 'delivered', label: 'Delivered', match: (o) => o.status === 'delivered' },
  { key: 'cancelled', label: 'Cancelled', match: (o) => o.status === 'cancelled' },
]

const active = ref('all')
const shown = computed(() => orders.filter(filters.find((f) => f.key === active.value).match))
</script>

<template>
  <main class="flex-1 bg-canvas px-4 pt-8 pb-16">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900">Orders</h1>

      <div
        class="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:justify-center"
        role="group"
        aria-label="Filter orders"
      >
        <button
          v-for="filter in filters"
          :key="filter.key"
          type="button"
          :aria-pressed="active === filter.key"
          :class="[
            'h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors',
            active === filter.key
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50',
          ]"
          @click="active = filter.key"
        >
          {{ filter.label }}
        </button>
      </div>

      <div v-if="shown.length" class="mt-8 space-y-6">
        <OrderCard v-for="order in shown" :key="order.number" :order="order" />
      </div>

      <div
        v-else
        class="mt-8 rounded-3xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-black/5"
      >
        <p class="font-semibold text-gray-900">No orders here</p>
        <RouterLink
          to="/explore"
          class="mt-4 inline-block rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Explore products
        </RouterLink>
      </div>
    </div>
  </main>
</template>
