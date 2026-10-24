<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

// A pill button that opens a single-choice list, e.g. "Sort by" or "Price".
const props = defineProps({
  label: { type: String, required: true },
  // [{ value, label }]; the first option is the default ("no filter")
  options: { type: Array, required: true },
  // Light text and pills, for dark backgrounds.
  onDark: Boolean,
})
const model = defineModel({ type: String, default: null })

const open = ref(false)
const root = ref(null)

const selected = computed(() => props.options.find((o) => o.value === model.value))
const isActive = computed(() => selected.value && selected.value !== props.options[0])

const choose = (value) => {
  model.value = value
  open.value = false
}

// Close on a click outside or on Escape.
const onClick = (event) => {
  if (root.value && !root.value.contains(event.target)) open.value = false
}
const onKey = (event) => {
  if (event.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :class="[
        'flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold ring-1 transition-colors',
        isActive
          ? 'bg-white text-gray-900 ring-white'
          : onDark
            ? 'bg-white/15 text-white ring-white/20 hover:bg-white/25'
            : 'bg-white text-gray-900 ring-gray-200 hover:bg-gray-50',
      ]"
      @click="open = !open"
    >
      {{ isActive ? selected.label : label }}
      <svg
        viewBox="0 0 24 24"
        :class="['size-4 transition-transform', open && 'rotate-180']"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>

    <ul
      v-if="open"
      role="listbox"
      :aria-label="label"
      class="absolute top-12 left-0 z-30 w-56 overflow-hidden rounded-2xl bg-white py-1 text-gray-900 shadow-lg ring-1 ring-black/5"
    >
      <li
        v-for="option in options"
        :key="option.value ?? 'default'"
        role="option"
        :aria-selected="option.value === model"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50"
          @click="choose(option.value)"
        >
          {{ option.label }}
          <svg
            v-if="option.value === model"
            viewBox="0 0 24 24"
            class="size-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
