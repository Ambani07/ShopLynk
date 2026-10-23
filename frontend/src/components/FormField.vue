<script setup>
import { computed, ref, useId } from 'vue'

// Labelled input with an optional hint and error message.
// Password fields get a show/hide toggle. Use the `label-action` slot for a link beside the label.
const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  autocomplete: { type: String, default: undefined },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
})
const model = defineModel({ type: String, default: '' })

const id = useId()
const showPassword = ref(false)
const inputType = computed(() =>
  props.type === 'password' && showPassword.value ? 'text' : props.type,
)
const describedBy = computed(() =>
  props.error ? `${id}-error` : props.hint ? `${id}-hint` : undefined,
)
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between gap-4">
      <label :for="id" class="text-sm font-semibold text-gray-900">{{ label }}</label>
      <slot name="label-action" />
    </div>

    <div class="relative mt-1.5">
      <input
        :id="id"
        v-model="model"
        :type="inputType"
        :autocomplete="autocomplete"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        :class="[
          'block h-12 w-full rounded-xl bg-white px-4 text-gray-900 ring-1 transition placeholder:text-gray-400 focus:ring-2 focus:outline-none',
          error ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-[#5433eb]',
          type === 'password' && 'pr-12',
        ]"
      />
      <button
        v-if="type === 'password'"
        type="button"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :aria-pressed="showPassword"
        class="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition-colors hover:text-gray-900"
        @click="showPassword = !showPassword"
      >
        <svg
          viewBox="0 0 24 24"
          class="size-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
          <path v-if="showPassword" d="M4 4l16 16" />
        </svg>
      </button>
    </div>

    <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" :id="`${id}-hint`" class="mt-1.5 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>
