<script setup>
import { RouterLink } from 'vue-router'
import CartShop from '@/components/CartShop.vue'
import ProductThumb from '@/components/ProductThumb.vue'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/format'

const cart = useCartStore()
</script>

<template>
  <main class="flex-1 bg-canvas px-4 pt-8 pb-16">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900">Cart</h1>

      <div v-if="cart.shopGroups.length" class="mt-8 space-y-8">
        <CartShop
          v-for="group in cart.shopGroups"
          :key="group.shop.slug"
          :shop="group.shop"
          :items="group.items"
          :subtotal="group.subtotal"
        />

        <section
          class="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6"
          aria-label="Order summary"
        >
          <div class="flex justify-between px-2 text-lg text-gray-900">
            <span>Total ({{ cart.count }} {{ cart.count === 1 ? 'item' : 'items' }})</span>
            <span class="font-bold">{{ formatPrice(cart.total) }}</span>
          </div>
          <RouterLink
            to="/checkout"
            class="mt-4 block rounded-full bg-[#5433eb] py-3 text-center font-semibold text-white transition-colors hover:bg-[#4526d9]"
          >
            Continue to checkout
          </RouterLink>
        </section>
      </div>

      <div
        v-else
        class="mt-8 rounded-3xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-black/5"
      >
        <p class="font-semibold text-gray-900">Your cart is empty</p>
        <RouterLink
          to="/explore"
          class="mt-4 inline-block rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Explore products
        </RouterLink>
      </div>

      <section v-if="cart.saved.length" class="mt-12" aria-labelledby="saved-heading">
        <h2 id="saved-heading" class="text-xl font-bold tracking-tight text-gray-900">
          Saved for later
        </h2>
        <ul
          class="mt-4 divide-y divide-gray-100 rounded-3xl bg-white px-5 shadow-sm ring-1 ring-black/5 sm:px-6"
        >
          <li v-for="item in cart.saved" :key="item.id" class="flex items-center gap-4 py-4">
            <ProductThumb :item="item" class="size-16 shrink-0" />
            <div class="min-w-0 flex-1">
              <p class="truncate font-semibold text-gray-900">{{ item.name }}</p>
              <p class="text-sm text-gray-700">{{ formatPrice(item.price) }}</p>
            </div>
            <div class="flex shrink-0 flex-col gap-1 text-sm font-semibold sm:flex-row sm:gap-4">
              <button
                type="button"
                class="text-[#5433eb] hover:underline"
                @click="cart.moveToCart(item.id)"
              >
                Move to cart
              </button>
              <button
                type="button"
                class="text-gray-500 hover:underline"
                @click="cart.removeSaved(item.id)"
              >
                Remove
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
