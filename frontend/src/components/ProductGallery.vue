<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  // { slug, name, image?, icon, background, accent }
  product: { type: Object, required: true },
})

// Placeholder "photos": the product icon framed a few different ways.
// A real photo, when there is one, comes first.
const views = computed(() => {
  const { image, background, accent } = props.product
  const icons = [
    { background, accent, pose: '' },
    { background, accent, pose: 'scale-[1.35] -rotate-6' },
    { background: 'bg-gray-100', accent: 'text-gray-500', pose: '' },
    { background, accent, pose: 'scale-75 rotate-12' },
    { background: 'bg-stone-100', accent: 'text-stone-500', pose: 'scale-[1.6] translate-y-[10%]' },
  ]
  return image ? [{ image, background }, ...icons] : icons
})

const index = ref(0)
watch(
  () => props.product.slug,
  () => (index.value = 0),
)

const go = (step) => {
  index.value = (index.value + step + views.value.length) % views.value.length
}

const arrow =
  'absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg ring-1 ring-black/5 transition hover:scale-105'
</script>

<template>
  <div class="flex justify-center gap-4" role="region" :aria-label="`${product.name} photos`">
    <ul class="hidden shrink-0 flex-col gap-2 md:flex">
      <li v-for="(view, i) in views" :key="i">
        <button
          type="button"
          :aria-label="`Photo ${i + 1} of ${views.length}`"
          :aria-current="i === index ? 'true' : undefined"
          :class="[
            'relative block size-12 overflow-hidden rounded-lg transition',
            view.background,
            i === index
              ? 'ring-2 ring-gray-900 ring-offset-2'
              : 'ring-1 ring-black/5 hover:ring-gray-400',
          ]"
          @click="index = i"
        >
          <img v-if="view.image" :src="view.image" alt="" class="size-full object-cover" />
          <svg
            v-else
            viewBox="0 0 24 24"
            :class="['absolute inset-[22%]', view.accent, view.pose]"
            fill="currentColor"
            fill-rule="evenodd"
            aria-hidden="true"
          >
            <path :d="product.icon" />
          </svg>
        </button>
      </li>
    </ul>

    <!-- On desktop, keep the square photo short enough to fit on screen beside the details -->
    <div class="min-w-0 flex-1 lg:max-w-[calc(100svh-8rem)]">
      <div
        :class="[
          'relative aspect-square overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5 transition-colors',
          views[index].background,
        ]"
      >
        <img
          v-if="views[index].image"
          :src="views[index].image"
          :alt="product.name"
          class="absolute inset-0 size-full object-cover"
        />
        <svg
          v-else
          viewBox="0 0 24 24"
          :class="[
            'absolute inset-[22%] transition-transform duration-500',
            views[index].accent,
            views[index].pose,
          ]"
          fill="currentColor"
          fill-rule="evenodd"
          role="img"
          :aria-label="product.name"
        >
          <path :d="product.icon" />
        </svg>

        <button
          type="button"
          aria-label="Previous photo"
          :class="[arrow, 'left-4']"
          @click="go(-1)"
        >
          <svg viewBox="0 0 24 24" class="size-6" fill="currentColor" aria-hidden="true">
            <path d="M15 6l-6 6 6 6 1.4-1.4-4.6-4.6 4.6-4.6z" />
          </svg>
        </button>
        <button type="button" aria-label="Next photo" :class="[arrow, 'right-4']" @click="go(1)">
          <svg viewBox="0 0 24 24" class="size-6" fill="currentColor" aria-hidden="true">
            <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
          </svg>
        </button>
      </div>

      <!-- Phones: dots instead of the thumbnail column -->
      <div class="mt-3 flex justify-center gap-1.5 md:hidden" aria-hidden="true">
        <span
          v-for="(view, i) in views"
          :key="i"
          :class="['size-1.5 rounded-full', i === index ? 'bg-gray-900' : 'bg-gray-300']"
        />
      </div>
    </div>
  </div>
</template>
