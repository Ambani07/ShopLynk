<script setup>
import { ref, useId } from 'vue'

// A titled section that opens and closes; closed unless `defaultOpen` is set.
const props = defineProps({
  title: { type: String, required: true },
  defaultOpen: Boolean,
})

const isOpen = ref(props.defaultOpen)
const id = useId()

// Lets a parent open the section, e.g. before jumping to it from a link.
defineExpose({ open: () => (isOpen.value = true) })
</script>

<template>
  <section class="border-t border-gray-200 py-6 first:border-t-0">
    <h2>
      <button
        type="button"
        :aria-expanded="isOpen"
        :aria-controls="id"
        class="flex w-full items-center justify-between gap-4 text-left text-xl font-semibold tracking-tight text-gray-900"
        @click="isOpen = !isOpen"
      >
        {{ title }}
        <svg
          viewBox="0 0 24 24"
          :class="['size-5 shrink-0 transition-transform', !isOpen && 'rotate-180']"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6 15l6-6 6 6-1.4 1.4-4.6-4.6-4.6 4.6z" />
        </svg>
      </button>
    </h2>
    <div v-show="isOpen" :id="id" class="mt-4">
      <slot />
    </div>
  </section>
</template>
