<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import ProductArt from './ProductArt.vue'
import { brands, featureSets, products } from '@/data/showcase'

// Fixed positions in the row; their content rotates through the pools above.
const slots = [
  { type: 'product', offset: 'mt-16' },
  { type: 'product', offset: '-mt-20' },
  { type: 'brand', offset: '-mt-8' },
  { type: 'feature' },
  { type: 'product', offset: '-mt-16' },
  { type: 'brand', offset: 'mt-12 -ml-20', behind: true },
  { type: 'product', offset: '-mt-4' },
]

const pools = { product: products, brand: brands, feature: featureSets }
const slotsPerType = {}
const indexed = slots.map((slot, index) => {
  const order = slotsPerType[slot.type] ?? 0
  slotsPerType[slot.type] = order + 1
  return { ...slot, index, order }
})

const featureAt = slots.findIndex((slot) => slot.type === 'feature')
const groups = [
  { key: 'left', align: 'justify-end', items: indexed.slice(0, featureAt) },
  { key: 'center', align: 'justify-center', items: [indexed[featureAt]] },
  { key: 'right', align: 'justify-start', items: indexed.slice(featureAt + 1) },
]

const featureSizes = ['w-28 md:w-40', 'mb-10 w-20 md:w-28', 'w-28 md:w-40']

// Each round shows the next batch from every pool.
const round = ref(0)
const contentFor = (slot) => {
  const pool = pools[slot.type]
  return pool[(round.value * slotsPerType[slot.type] + slot.order) % pool.length]
}

// Cards enter and leave right to left: the rightmost card moves first.
const step = 150
const fromRight = (slot) => slots.length - 1 - slot.index
const logoDelay = `${slots.length * step + 300}ms`

const ROTATE_EVERY = 5000
const paused = ref(false)
let timer
onMounted(() => {
  timer = setInterval(() => {
    if (!paused.value && !document.hidden) round.value++
  }, ROTATE_EVERY)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section
    class="relative overflow-hidden bg-canvas pt-8 pb-4 md:pb-14"
    aria-label="Featured products"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- Three columns keep the feature panel centred however wide the side groups are -->
    <div class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-10 lg:gap-14">
      <div
        v-for="group in groups"
        :key="group.key"
        :class="['flex items-center gap-10 lg:gap-14', group.align]"
      >
        <div
          v-for="slot in group.items"
          :key="slot.index"
          :class="[
            'slide-in relative shrink-0',
            slot.offset,
            slot.type === 'feature' ? 'z-20' : slot.behind ? 'z-0' : 'z-10',
          ]"
          :style="{
            '--delay': `${fromRight(slot) * step}ms`,
            '--leave-delay': `${fromRight(slot) * 90}ms`,
            '--float-delay': `${slot.index * -1.3}s`,
          }"
        >
          <div class="float">
            <!-- Product card -->
            <Transition v-if="slot.type === 'product'" name="swap" mode="out-in">
              <article
                :key="contentFor(slot).name"
                class="w-44 rounded-2xl bg-white p-2.5 shadow-xl shadow-black/5 md:w-52"
              >
                <img
                  v-if="contentFor(slot).image"
                  :src="contentFor(slot).image"
                  :alt="contentFor(slot).name"
                  class="aspect-[4/5] w-full rounded-xl object-cover"
                />
                <div
                  v-else
                  :class="[
                    'flex aspect-[4/5] items-end justify-center rounded-xl bg-gradient-to-br pb-4',
                    contentFor(slot).background,
                  ]"
                >
                  <ProductArt v-bind="contentFor(slot).art" class="w-3/4" />
                </div>
                <h3 class="mt-2.5 truncate px-0.5 text-sm text-gray-900">
                  {{ contentFor(slot).name }}
                </h3>
                <p class="flex items-center gap-1 px-0.5 pb-1 text-xs text-gray-600">
                  <span class="tracking-tight text-black" aria-label="5 out of 5 stars">★★★★★</span>
                  ({{ contentFor(slot).reviews }})
                </p>
              </article>
            </Transition>

            <!-- Brand tile -->
            <Transition v-else-if="slot.type === 'brand'" name="swap" mode="out-in">
              <div
                :key="contentFor(slot).name"
                :class="[
                  'relative size-32 overflow-hidden rounded-2xl bg-gradient-to-br shadow-xl shadow-black/10 md:size-40',
                  contentFor(slot).background,
                ]"
              >
                <img
                  v-if="contentFor(slot).image"
                  :src="contentFor(slot).image"
                  :alt="contentFor(slot).name"
                  class="size-full object-cover"
                />
                <template v-else>
                  <ProductArt
                    v-bind="contentFor(slot).art"
                    class="absolute -right-3 -bottom-4 w-3/4 rotate-[-8deg]"
                  />
                  <span
                    class="absolute top-3 left-3 text-base font-semibold tracking-wide text-white drop-shadow md:text-lg"
                  >
                    {{ contentFor(slot).name }}
                  </span>
                </template>
              </div>
            </Transition>

            <!-- Feature panel, with the logo floating over its bottom edge -->
            <div v-else class="relative">
              <div
                class="flex aspect-[16/10] w-72 items-end justify-center rounded-3xl bg-gradient-to-b from-white to-stone-100 px-6 pb-10 md:w-[30rem]"
              >
                <Transition name="swap" mode="out-in">
                  <div :key="round % featureSets.length" class="flex items-end gap-2 md:gap-4">
                    <ProductArt
                      v-for="(art, i) in contentFor(slot)"
                      :key="i"
                      v-bind="art"
                      :class="featureSizes[i]"
                    />
                  </div>
                </Transition>
              </div>
              <div
                class="pointer-events-none absolute inset-x-0 -bottom-7 flex justify-center md:-bottom-9"
              >
                <img
                  src="/suplynk-logo-transparent.png"
                  alt="SupLynk"
                  class="logo-in h-12 w-auto drop-shadow-xl md:h-16"
                  :style="{ '--delay': logoDelay }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(160px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes logo-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* First load: the whole row slides in */
.slide-in {
  animation: slide-in 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: var(--delay);
}

.logo-in {
  animation: logo-in 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: var(--delay);
}

.float {
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--float-delay);
}

/* Each rotation: the old card exits left, then the new one slides in from the right */
.swap-leave-active {
  transition:
    opacity 0.4s ease-in,
    transform 0.4s ease-in;
  transition-delay: var(--leave-delay);
}

.swap-enter-active {
  transition:
    opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.swap-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

@media (prefers-reduced-motion: reduce) {
  .slide-in,
  .logo-in,
  .float {
    animation: none;
  }

  .swap-enter-active,
  .swap-leave-active {
    transition: none;
  }
}
</style>
