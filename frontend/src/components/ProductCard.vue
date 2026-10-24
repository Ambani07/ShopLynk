<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import StarRating from './StarRating.vue'
import { formatCount, formatPrice } from '@/utils/format'

const props = defineProps({
  // { slug, name, price, icon, background, accent,
  //   brand?, rating?, reviews?, originalPrice?, image? }
  product: { type: Object, required: true },
})

const formattedPrice = computed(() => formatPrice(props.product.price))
const formattedReviews = computed(() => formatCount(props.product.reviews))
const percentOff = computed(() => {
  const { price, originalPrice } = props.product
  return originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0
})
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
        <span
          v-if="percentOff"
          class="absolute top-2.5 left-2.5 rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white"
        >
          {{ percentOff }}% off
        </span>
      </div>

      <div class="mt-3 px-1">
        <p v-if="product.brand" class="truncate text-xs text-gray-600">{{ product.brand }}</p>
        <h3 class="truncate text-sm font-semibold text-gray-900">{{ product.name }}</h3>

        <div v-if="product.rating" class="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
          <StarRating :rating="product.rating" />
          <span>({{ formattedReviews }})</span>
        </div>

        <p class="mt-1 text-sm text-gray-900">
          {{ formattedPrice }}
          <span v-if="percentOff" class="ml-1 text-gray-500 line-through">
            {{ formatPrice(product.originalPrice) }}
          </span>
        </p>
      </div>
    </RouterLink>
  </article>
</template>
