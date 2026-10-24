<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductPanel from '@/components/ProductPanel.vue'
import ProductRow from '@/components/ProductRow.vue'
import StoryCard from '@/components/StoryCard.vue'
import { categoryPages } from '@/data/categoryPages'
import { browseCategories } from '@/data/explore'
import { categoryProducts } from '@/data/products'

const route = useRoute()

const category = computed(() => browseCategories.find((c) => c.slug === route.params.slug))
const page = computed(() => categoryPages[route.params.slug])
// The selected subcategory, if the URL names one we know.
const sub = computed(() => page.value?.subcategories.find((s) => s.slug === route.params.sub))

const base = computed(() => `/categories/${route.params.slug}`)

const products = computed(() =>
  (categoryProducts[route.params.slug] ?? []).filter(
    (product) => !sub.value || product.sub === sub.value.slug,
  ),
)
const topRated = computed(() =>
  products.value
    .filter((product) => product.rating)
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews),
)
const newThisWeek = computed(() => products.value.filter((product) => product.isNew))
// Most reviewed first, as a stand-in for sales until there's real order data.
const bestsellers = computed(() =>
  products.value
    .filter((product) => product.reviews)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 12),
)
</script>

<template>
  <main v-if="category && page" class="flex-1 bg-canvas pt-8 pb-16">
    <header class="px-4 text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">
        {{ sub ? sub.name : category.name }}
      </h1>
      <nav aria-label="Breadcrumb" class="mt-3">
        <ol class="flex flex-wrap items-center justify-center gap-1.5 text-sm">
          <li>
            <RouterLink to="/explore" class="text-gray-500 hover:text-gray-900 hover:underline">
              All categories
            </RouterLink>
          </li>
          <li class="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              class="size-3.5 text-gray-400"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
            </svg>
            <RouterLink
              v-if="sub"
              :to="base"
              class="text-gray-500 hover:text-gray-900 hover:underline"
            >
              {{ category.name }}
            </RouterLink>
            <span v-else class="text-gray-900" aria-current="page">{{ category.name }}</span>
          </li>
          <li v-if="sub" class="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              class="size-3.5 text-gray-400"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z" />
            </svg>
            <span class="text-gray-900" aria-current="page">{{ sub.name }}</span>
          </li>
        </ol>
      </nav>
    </header>

    <!-- Subcategory filter: the selected chip links back to the whole category -->
    <nav
      :aria-label="`${category.name} subcategories`"
      class="mt-8 flex gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-auto md:max-w-6xl md:flex-wrap md:justify-center md:overflow-visible"
    >
      <RouterLink
        v-for="chip in page.subcategories"
        :key="chip.slug"
        :to="sub?.slug === chip.slug ? base : `${base}/${chip.slug}`"
        :aria-current="sub?.slug === chip.slug ? 'page' : undefined"
        :class="[
          'flex shrink-0 items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-medium text-gray-900 shadow-sm transition hover:shadow-md',
          sub?.slug === chip.slug
            ? 'bg-gray-100 ring-2 ring-gray-900'
            : 'bg-white ring-1 ring-black/5',
        ]"
      >
        <span :class="['flex size-8 items-center justify-center rounded-full', chip.color]">
          <svg
            viewBox="0 0 24 24"
            class="size-4 text-white"
            fill="currentColor"
            fill-rule="evenodd"
          >
            <path :d="chip.icon" />
          </svg>
        </span>
        {{ chip.name }}
      </RouterLink>
    </nav>

    <ul class="mx-auto mt-8 grid max-w-6xl gap-4 px-4 md:grid-cols-2">
      <li v-for="story in page.stories" :key="story.slug">
        <StoryCard :story="story" />
      </li>
    </ul>

    <div class="mx-auto mt-10 grid max-w-[110rem] gap-4 px-4 md:px-10 lg:grid-cols-2">
      <ProductPanel title="Top rated" :products="topRated" empty="No rated products here yet." />
      <ProductPanel
        title="New this week"
        :products="newThisWeek"
        empty="Nothing new here this week."
      />
    </div>

    <ProductRow
      v-if="bestsellers.length"
      title="Bestsellers"
      :products="bestsellers"
      class="mt-6"
    />
  </main>

  <main v-else class="flex-1 bg-canvas px-4 pt-16 pb-16 text-center">
    <h1 class="text-2xl font-bold text-gray-900">Category not found</h1>
    <RouterLink
      to="/explore"
      class="mt-6 inline-block rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
    >
      Browse all categories
    </RouterLink>
  </main>
</template>
