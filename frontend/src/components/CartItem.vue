<script setup>
import ProductThumb from './ProductThumb.vue'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/format'

defineProps({
  item: { type: Object, required: true },
})

const cart = useCartStore()

const pill = 'inline-flex h-10 items-center rounded-full ring-1 ring-gray-200'
const iconButton =
  'flex size-10 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100'
</script>

<template>
  <li class="flex gap-4">
    <ProductThumb :item="item" class="size-24 shrink-0 sm:size-28" />

    <div class="min-w-0 flex-1">
      <div class="flex justify-between gap-4">
        <div class="min-w-0">
          <h3 class="font-semibold text-gray-900">{{ item.name }}</h3>
          <p v-if="item.options" class="mt-1 text-xs text-gray-500">{{ item.options }}</p>
        </div>
        <div class="shrink-0 text-right">
          <p class="font-semibold text-gray-900">{{ formatPrice(item.price) }}</p>
          <p v-if="item.originalPrice" class="text-sm text-gray-500 line-through">
            {{ formatPrice(item.originalPrice) }}
          </p>
        </div>
      </div>

      <div v-if="item.discount" class="mt-3 flex justify-between gap-4 text-xs text-gray-500">
        <span>Discount applied</span>
        <span>-{{ formatPrice(item.discount * item.quantity) }}</span>
      </div>

      <div class="mt-3 flex flex-wrap gap-3">
        <div :class="pill">
          <button
            type="button"
            :class="iconButton"
            :aria-label="item.quantity === 1 ? `Remove ${item.name}` : 'Decrease quantity'"
            @click="cart.setQuantity(item.id, item.quantity - 1)"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
              <path
                v-if="item.quantity === 1"
                d="M9 3h6l1 1h4v2H4V4h4zM6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2zm3 3v9h2v-9zm4 0v9h2v-9z"
              />
              <path v-else d="M5 11h14v2H5z" />
            </svg>
          </button>
          <span class="w-5 text-center text-sm font-medium" aria-live="polite">
            {{ item.quantity }}
          </span>
          <button
            type="button"
            :class="iconButton"
            aria-label="Increase quantity"
            @click="cart.setQuantity(item.id, item.quantity + 1)"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
              <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          :class="[
            pill,
            'px-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50',
          ]"
          @click="cart.saveForLater(item.id)"
        >
          Save for later
        </button>
      </div>
    </div>
  </li>
</template>
