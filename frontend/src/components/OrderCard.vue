<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductThumb from './ProductThumb.vue'
import ShopAvatar from './ShopAvatar.vue'
import { orderSteps } from '@/data/orders'
import { useCartStore } from '@/stores/cart'
import { formatDate, formatDay, formatPrice } from '@/utils/format'

const props = defineProps({
  // { number, shop, placedOn, status, eta?, deliveredOn?, items, total }
  order: { type: Object, required: true },
})

const cart = useCartStore()

const badges = {
  processing: ['Processing', 'bg-amber-100 text-amber-800'],
  shipped: ['Shipped', 'bg-blue-100 text-blue-800'],
  'out-for-delivery': ['Out for delivery', 'bg-violet-100 text-violet-800'],
  delivered: ['Delivered', 'bg-green-100 text-green-800'],
  cancelled: ['Cancelled', 'bg-gray-100 text-gray-600'],
}

const badge = computed(() => badges[props.order.status])
const step = computed(() => orderSteps.findIndex((s) => s.status === props.order.status))
const inProgress = computed(() => step.value >= 0 && step.value < orderSteps.length - 1)

const headline = computed(() => {
  const { status, eta, deliveredOn } = props.order
  if (status === 'delivered') return `Delivered ${formatDate(deliveredOn)}`
  if (status === 'cancelled') return 'This order was cancelled'
  if (status === 'out-for-delivery') return 'Arriving today'
  return `Arriving ${formatDay(eta)}`
})

const added = ref(false)
const buyAgain = () => {
  for (const item of props.order.items) cart.addItem(item, props.order.shop)
  added.value = true
}

const button =
  'inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors'
</script>

<template>
  <article
    class="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
    :aria-label="`Order #${order.number}`"
  >
    <header class="flex items-start justify-between gap-4">
      <div class="flex min-w-0 items-center gap-3">
        <ShopAvatar :shop="order.shop" />
        <div class="min-w-0">
          <RouterLink
            :to="`/shops/${order.shop.slug}`"
            class="font-semibold text-gray-900 hover:underline"
          >
            {{ order.shop.name }}
          </RouterLink>
          <p class="text-xs text-gray-500">
            Order #{{ order.number }} · Placed {{ formatDate(order.placedOn) }}
          </p>
        </div>
      </div>
      <span :class="['shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold', badge[1]]">
        {{ badge[0] }}
      </span>
    </header>

    <p class="mt-5 text-lg font-semibold text-gray-900">{{ headline }}</p>

    <ol v-if="inProgress" class="mt-3 grid grid-cols-4 gap-1.5" aria-label="Delivery progress">
      <li v-for="(s, i) in orderSteps" :key="s.status">
        <div :class="['h-1.5 rounded-full', i <= step ? 'bg-[#5433eb]' : 'bg-gray-200']" />
        <p
          :class="['mt-1.5 text-xs', i === step ? 'font-semibold text-gray-900' : 'text-gray-500']"
          :aria-current="i === step ? 'step' : undefined"
        >
          {{ s.label }}
        </p>
      </li>
    </ol>

    <ul class="mt-6 space-y-4">
      <li v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
        <ProductThumb :item="item" class="size-16 shrink-0 sm:size-20" />
        <div class="min-w-0 flex-1">
          <p class="truncate font-semibold text-gray-900">{{ item.name }}</p>
          <p v-if="item.options" class="text-xs text-gray-500">{{ item.options }}</p>
          <p class="mt-1 text-sm text-gray-700">
            <span v-if="item.quantity > 1">{{ item.quantity }} × </span
            >{{ formatPrice(item.price) }}
          </p>
        </div>
      </li>
    </ul>

    <footer
      class="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5"
    >
      <p class="text-gray-900">
        Total <span class="ml-1 font-semibold">{{ formatPrice(order.total) }}</span>
      </p>
      <div class="flex gap-3">
        <RouterLink
          v-if="inProgress"
          :to="`/orders/${order.number}/track`"
          :class="[button, 'bg-[#5433eb] text-white hover:bg-[#4526d9]']"
        >
          Track package
        </RouterLink>
        <template v-else>
          <RouterLink
            v-if="added"
            to="/cart"
            :class="[button, 'text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50']"
          >
            Added · View cart
          </RouterLink>
          <button
            v-else
            type="button"
            :class="[button, 'bg-[#5433eb] text-white hover:bg-[#4526d9]']"
            @click="buyAgain"
          >
            Buy again
          </button>
        </template>
      </div>
    </footer>
  </article>
</template>
