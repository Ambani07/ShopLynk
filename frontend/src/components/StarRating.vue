<script setup>
// Five stars filled to `rating`: grey stars underneath, filled stars clipped on top.
defineProps({
  rating: { type: Number, required: true },
  // Tailwind size class for each star
  size: { type: String, default: 'size-3.5' },
  // White stars, for dark backgrounds.
  onDark: Boolean,
})

const star = 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.6z'
</script>

<template>
  <span class="relative inline-flex" role="img" :aria-label="`${rating} out of 5 stars`">
    <span :class="['flex', onDark ? 'text-white/30' : 'text-gray-300']">
      <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="size" fill="currentColor">
        <path :d="star" />
      </svg>
    </span>
    <span
      :class="[
        'absolute inset-y-0 left-0 flex overflow-hidden',
        onDark ? 'text-white' : 'text-gray-900',
      ]"
      :style="{ width: `${(rating / 5) * 100}%` }"
    >
      <svg
        v-for="i in 5"
        :key="i"
        viewBox="0 0 24 24"
        :class="[size, 'shrink-0']"
        fill="currentColor"
      >
        <path :d="star" />
      </svg>
    </span>
  </span>
</template>
