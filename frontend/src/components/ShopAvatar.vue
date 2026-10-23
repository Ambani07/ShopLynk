<script setup>
import { computed } from 'vue'

const props = defineProps({
  // { name, logo?, color }
  shop: { type: Object, required: true },
})

// Placeholder logo: the shop's initials.
const initials = computed(() =>
  props.shop.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join(''),
)
</script>

<template>
  <img
    v-if="shop.logo"
    :src="shop.logo"
    alt=""
    class="size-12 shrink-0 rounded-full object-cover ring-1 ring-black/5"
  />
  <span
    v-else
    :class="[
      'flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
      shop.color,
    ]"
    aria-hidden="true"
  >
    {{ initials }}
  </span>
</template>
