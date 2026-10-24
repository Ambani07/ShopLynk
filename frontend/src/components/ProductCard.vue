<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import StarRating from './StarRating.vue'
import { formatCount, formatPrice } from '@/utils/format'

const props = defineProps({
  // { slug, name, price, icon, background, accent,
  //   brand?, rating?, reviews?, originalPrice?, image? }
  product: { type: Object, required: true },
  // Light text, for cards on a dark background.
  onDark: Boolean,
  // Fades the image and shows a "Sold out" badge.
  soldOut: Boolean,
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
        <template v-if="soldOut">
          <div class="absolute inset-0 bg-white/50" />
          <span
            class="absolute top-2.5 right-2.5 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-900 ring-1 ring-black/10"
          >
            Sold out
          </span>
        </template>
      </div>

      <div :class="['mt-3 px-1', onDark ? 'text-white' : 'text-gray-900']">
        <p
          v-if="product.brand"
          :class="['truncate text-xs', onDark ? 'text-white/70' : 'text-gray-600']"
        >
          {{ product.brand }}
        </p>
        <h3 class="truncate text-sm font-semibold">{{ product.name }}</h3>

        <div
          v-if="product.rating"
          :class="[
            'mt-0.5 flex items-center gap-1.5 text-xs',
            onDark ? 'text-white/80' : 'text-gray-600',
          ]"
        >
          <StarRating :rating="product.rating" :on-dark="onDark" />
          <span>({{ formattedReviews }})</span>
        </div>

        <p class="mt-1 text-sm">
          {{ formattedPrice }}
          <span
            v-if="percentOff"
            :class="['ml-1 line-through', onDark ? 'text-white/60' : 'text-gray-500']"
          >
            {{ formatPrice(product.originalPrice) }}
          </span>
        </p>
      </div>
    </RouterLink>
  </article>
</template>
