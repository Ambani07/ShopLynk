<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatCount, formatPrice } from '@/utils/format'

const props = defineProps({
  // { slug, brand, name, rating, reviews, price, image?, icon, background, accent }
  product: { type: Object, required: true },
})

const formattedPrice = computed(() => formatPrice(props.product.price))
const formattedReviews = computed(() => formatCount(props.product.reviews))

const star = 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.6z'
</script>

<template>
  <article class="group">
    <RouterLink :to="`/products/${product.slug}`" class="block">
      <div
        :class="[
          'relative aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5',
          product.background,
        ]"
      >
        <img
          v-if="product.image"
          :src="product.image"
          alt=""
          class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <svg
          v-else
          viewBox="0 0 24 24"
          :class="[
            'absolute inset-[25%] transition-transform duration-500 group-hover:scale-105',
            product.accent,
          ]"
          fill="currentColor"
          fill-rule="evenodd"
          aria-hidden="true"
        >
          <path :d="product.icon" />
        </svg>
      </div>

      <div class="mt-3 px-1">
        <p class="truncate text-xs text-gray-600">{{ product.brand }}</p>
        <h3 class="truncate text-sm font-semibold text-gray-900">{{ product.name }}</h3>

        <div class="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
          <!-- Grey stars underneath, filled stars clipped to the rating on top -->
          <span
            class="relative inline-flex"
            role="img"
            :aria-label="`${product.rating} out of 5 stars`"
          >
            <span class="flex text-gray-300">
              <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" class="size-3.5" fill="currentColor">
                <path :d="star" />
              </svg>
            </span>
            <span
              class="absolute inset-y-0 left-0 flex overflow-hidden text-gray-900"
              :style="{ width: `${(product.rating / 5) * 100}%` }"
            >
              <svg
                v-for="i in 5"
                :key="i"
                viewBox="0 0 24 24"
                class="size-3.5 shrink-0"
                fill="currentColor"
              >
                <path :d="star" />
              </svg>
            </span>
          </span>
          <span>({{ formattedReviews }})</span>
        </div>

        <p class="mt-1 text-sm text-gray-900">{{ formattedPrice }}</p>
      </div>
    </RouterLink>
  </article>
</template>
