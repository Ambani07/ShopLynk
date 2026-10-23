<script setup>
// Desktop-only previous/next buttons for a horizontally scrolling row.
// Place inside a `relative` container; they centre vertically on it.
defineProps({
  canPrev: Boolean,
  canNext: Boolean,
  label: { type: String, default: 'items' },
})
defineEmits(['scroll'])

const button =
  'absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg ring-1 ring-black/5 transition hover:scale-105 md:flex'
</script>

<template>
  <button
    v-show="canPrev"
    type="button"
    :aria-label="`Previous ${label}`"
    :class="[button, 'left-4']"
    @click="$emit('scroll', -1)"
  >
    <svg viewBox="0 0 24 24" class="size-6" fill="currentColor" aria-hidden="true">
      <path d="M15 6l-6 6 6 6 1.4-1.4-4.6-4.6 4.6-4.6z" />
    </svg>
  </button>
  <button
    v-show="canNext"
    type="button"
    :aria-label="`More ${label}`"
    :class="[button, 'right-4']"
    @click="$emit('scroll', 1)"
  >
    <svg viewBox="0 0 24 24" class="size-6" fill="currentColor" aria-hidden="true">
      <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
    </svg>
  </button>
</template>
