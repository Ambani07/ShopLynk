<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { formatWholePrice } from '@/utils/format'

// Slide-in "Filters" panel. Changes apply as you make them; Done just closes it.
const props = defineProps({
  sortOptions: { type: Array, required: true }, // [{ value, label }]
  // Top of the price slider in Rand; the top end means "this much or more".
  ceiling: { type: Number, required: true },
})
defineEmits(['reset'])

const open = defineModel('open', { type: Boolean, default: false })
const sort = defineModel('sort', { type: String, required: true })
const onSale = defineModel('onSale', { type: Boolean, default: false })
const inStock = defineModel('inStock', { type: Boolean, default: false })
const priceMin = defineModel('priceMin', { type: Number, default: 0 })
const priceMax = defineModel('priceMax', { type: Number, default: null }) // null: no upper limit

const closeButton = ref(null)
let opener = null

const close = () => (open.value = false)
const onKey = (event) => {
  if (event.key === 'Escape') close()
}

// While open: stop the page scrolling, listen for Escape, and move focus into the panel;
// when closed, hand focus back to whatever opened it.
watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    opener = document.activeElement
    document.addEventListener('keydown', onKey)
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.removeEventListener('keydown', onKey)
    opener?.focus?.()
  }
})
onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKey)
})

// Slider positions; the upper handle sits at the ceiling when there's no upper limit.
const low = computed(() => Math.min(priceMin.value, props.ceiling))
const high = computed(() => priceMax.value ?? props.ceiling)

const setLow = (value) => {
  priceMin.value = Math.max(0, Math.min(value, high.value))
}
const setHigh = (value) => {
  const next = Math.max(value, low.value)
  priceMax.value = next >= props.ceiling ? null : next
}

// Typed values: blank or non-numbers reset that end of the range.
const readNumber = (event) => {
  const number = Number(event.target.value.replace(/[^\d.]/g, ''))
  return event.target.value.trim() && Number.isFinite(number) ? number : null
}
const typeLow = (event) => {
  setLow(readNumber(event) ?? 0)
  event.target.value = priceMin.value
}
const typeHigh = (event) => {
  setHigh(readNumber(event) ?? props.ceiling)
  event.target.value = priceMax.value ?? `${props.ceiling}+`
}

const percent = (value) => `${(value / props.ceiling) * 100}%`

const chip = (on) =>
  [
    'h-10 rounded-full px-4 text-sm font-semibold transition-colors',
    on ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50',
  ].join(' ')

// Range inputs stacked on one track: only their thumbs take the pointer.
const range =
  'pointer-events-none absolute inset-0 h-5 w-full appearance-none bg-transparent focus-visible:outline-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#5433eb] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5433eb] focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-[#5433eb]/30'
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
    >
      <div v-if="open" class="fixed inset-0 z-50 bg-black/40" aria-hidden="true" @click="close" />
    </Transition>

    <Transition
      enter-from-class="-translate-x-[110%]"
      leave-to-class="-translate-x-[110%]"
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
    >
      <div
        v-if="open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-title"
        class="fixed inset-y-2 left-2 z-50 flex w-[min(30rem,calc(100%-1rem))] flex-col rounded-3xl bg-white text-gray-900 shadow-2xl"
      >
        <header class="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 id="filters-title" class="text-2xl font-semibold tracking-tight">Filters</h2>
          <button
            ref="closeButton"
            type="button"
            aria-label="Close filters"
            class="flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
            @click="close"
          >
            <svg viewBox="0 0 24 24" class="size-6" fill="currentColor" aria-hidden="true">
              <path
                d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"
              />
            </svg>
          </button>
        </header>

        <div class="flex-1 divide-y divide-gray-100 overflow-y-auto px-5">
          <div class="flex flex-wrap gap-2 pb-5">
            <button
              type="button"
              :aria-pressed="onSale"
              :class="chip(onSale)"
              @click="onSale = !onSale"
            >
              On sale
            </button>
            <button
              type="button"
              :aria-pressed="inStock"
              :class="chip(inStock)"
              @click="inStock = !inStock"
            >
              In stock
            </button>
          </div>

          <fieldset class="py-5">
            <legend class="text-sm text-gray-900">Sort by</legend>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="option in sortOptions"
                :key="option.value"
                type="button"
                :aria-pressed="sort === option.value"
                :class="chip(sort === option.value)"
                @click="sort = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </fieldset>

          <fieldset class="py-5">
            <legend class="text-sm text-gray-900">Price</legend>
            <div class="relative mx-2.5 mt-4 h-5">
              <div
                class="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-200"
              />
              <div
                class="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#5433eb]"
                :style="{ left: percent(low), right: `calc(100% - ${percent(high)})` }"
              />
              <input
                type="range"
                min="0"
                :max="ceiling"
                step="10"
                :value="low"
                aria-label="Minimum price"
                :class="[range, '-mx-2.5 w-[calc(100%+1.25rem)]', low > ceiling / 2 && 'z-10']"
                @input="setLow(Number($event.target.value))"
              />
              <input
                type="range"
                min="0"
                :max="ceiling"
                step="10"
                :value="high"
                aria-label="Maximum price"
                :aria-valuetext="
                  priceMax === null
                    ? `${formatWholePrice(ceiling)} or more`
                    : formatWholePrice(high)
                "
                :class="[range, '-mx-2.5 w-[calc(100%+1.25rem)]']"
                @input="setHigh(Number($event.target.value))"
              />
            </div>
            <div class="mt-4 flex items-center gap-4">
              <label class="relative flex-1">
                <span class="sr-only">Minimum price in Rand</span>
                <span
                  class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-500"
                  >R</span
                >
                <input
                  :value="priceMin"
                  inputmode="numeric"
                  class="h-10 w-full rounded-lg pr-3 pl-7 text-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-[#5433eb] focus:outline-none"
                  @change="typeLow"
                />
              </label>
              <span class="text-gray-300" aria-hidden="true">–</span>
              <label class="relative flex-1">
                <span class="sr-only">Maximum price in Rand</span>
                <span
                  class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-500"
                  >R</span
                >
                <input
                  :value="priceMax ?? `${ceiling}+`"
                  inputmode="numeric"
                  class="h-10 w-full rounded-lg pr-3 pl-7 text-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-[#5433eb] focus:outline-none"
                  @change="typeHigh"
                />
              </label>
            </div>
          </fieldset>
        </div>

        <footer class="grid grid-cols-2 gap-3 p-5">
          <button
            type="button"
            class="h-12 rounded-full bg-gray-100 font-semibold text-gray-900 transition-colors hover:bg-gray-200"
            @click="$emit('reset')"
          >
            Reset
          </button>
          <button
            type="button"
            class="h-12 rounded-full bg-gray-900 font-semibold text-white transition-colors hover:bg-gray-700"
            @click="close"
          >
            Done
          </button>
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>
