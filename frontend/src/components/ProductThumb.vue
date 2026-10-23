<script setup>
// Square product thumbnail: the photo if there is one, otherwise the placeholder icon.
defineProps({
  // { image?, icon, background, accent }
  item: { type: Object, required: true },
})
</script>

<template>
  <div :class="['relative overflow-hidden rounded-xl ring-1 ring-black/5', item.background]">
    <img
      v-if="item.image"
      :src="item.image"
      alt=""
      class="absolute inset-0 size-full object-cover"
    />
    <svg
      v-else
      viewBox="0 0 24 24"
      :class="['absolute inset-[22%]', item.accent]"
      fill="currentColor"
      fill-rule="evenodd"
      aria-hidden="true"
    >
      <path :d="item.icon" />
    </svg>
  </div>
</template>
