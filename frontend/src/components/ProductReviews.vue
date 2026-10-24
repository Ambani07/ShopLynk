<script setup>
import { ref } from 'vue'
import StarRating from './StarRating.vue'
import { formatDate } from '@/utils/format'

defineProps({
  // { average, count, distribution: [{ stars, share }], items: [{ id, rating, body, name, color, date }] }
  reviews: { type: Object, required: true },
})

const showAll = ref(false)
</script>

<template>
  <p v-if="!reviews.count" class="text-sm text-gray-500">No reviews yet.</p>

  <template v-else>
    <div class="flex items-center gap-8">
      <div class="shrink-0">
        <p class="text-4xl font-bold tracking-tight text-gray-900">{{ reviews.average }}</p>
        <StarRating :rating="reviews.average" size="size-5" class="mt-1" />
        <p class="mt-1 text-xs text-gray-600">
          {{ reviews.count.toLocaleString('en-US') }}
          {{ reviews.count === 1 ? 'rating' : 'ratings' }}
        </p>
      </div>
      <ul class="min-w-0 flex-1 space-y-1" aria-label="Rating breakdown">
        <li
          v-for="row in reviews.distribution"
          :key="row.stars"
          class="flex items-center gap-2 text-[0.65rem] text-gray-600"
        >
          <span class="w-2 text-right">{{ row.stars }}</span>
          <span class="sr-only">stars:</span>
          <span class="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
            <span
              class="block h-full min-w-1.5 rounded-full bg-gray-900"
              :style="{ width: `${row.share * 100}%` }"
            />
          </span>
          <span class="sr-only">{{ Math.round(row.share * 100) }}%</span>
        </li>
      </ul>
    </div>

    <ul
      :class="[
        'mt-6 gap-3',
        showAll
          ? 'grid sm:grid-cols-2'
          : '-mx-1 flex snap-x snap-mandatory overflow-x-auto px-1 pb-1 [scrollbar-width:none]',
      ]"
    >
      <li
        v-for="review in reviews.items"
        :key="review.id"
        :class="[
          'flex flex-col rounded-2xl bg-white p-4 ring-1 ring-black/10',
          !showAll && 'w-64 shrink-0 snap-start',
        ]"
      >
        <StarRating :rating="review.rating" size="size-3" />
        <p class="mt-2 flex-1 text-sm text-gray-900">{{ review.body }}</p>
        <p class="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <span
            :class="[
              'flex size-6 items-center justify-center rounded-full text-[0.65rem] font-bold text-white',
              review.color,
            ]"
            aria-hidden="true"
          >
            {{ review.name[0] }}
          </span>
          {{ review.name }} · {{ formatDate(review.date) }}
        </p>
      </li>
    </ul>

    <button
      v-if="reviews.items.length > 2"
      type="button"
      class="mt-4 h-11 w-full rounded-full bg-gray-100 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
      @click="showAll = !showAll"
    >
      {{ showAll ? 'Show fewer reviews' : 'Read more reviews' }}
    </button>
  </template>
</template>
