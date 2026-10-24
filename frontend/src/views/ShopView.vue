<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import ProductRow from '@/components/ProductRow.vue'
import FilterMenu from '@/components/FilterMenu.vue'
import ProductFilters from '@/components/ProductFilters.vue'
import { findShop, isInStock } from '@/data/catalog'
import { usePageThemeStore } from '@/stores/pageTheme'
import { formatCount, formatWholePrice } from '@/utils/format'
import { hash } from '@/utils/hash'

const route = useRoute()

const entry = computed(() => findShop(route.params.slug))
const shop = computed(() => entry.value?.shop)
const theme = computed(() => entry.value?.theme)

// The header, tab bar and footer take on the brand colour while this page is open.
const pageTheme = usePageThemeStore()
watch(theme, (value) => pageTheme.set(value?.background), { immediate: true })
onUnmounted(pageTheme.clear)

const query = ref('')
const active = ref(null) // selected collection key; null shows "For you"
const following = ref(false)

// "Products" grid filters
const sort = ref('featured')
const priceMin = ref(0)
const priceMax = ref(null) // null: no upper limit
const onSale = ref(false)
const inStockOnly = ref(false)
const filtersOpen = ref(false)

watch(
  () => route.params.slug,
  () => {
    query.value = ''
    active.value = null
    following.value = false
    clearFilters()
  },
)

// Collections shown as chips; empty ones are left out. "Shop all" jumps to the Products grid.
const collections = computed(() => {
  const products = entry.value?.products ?? []
  return [
    { key: 'all', label: 'Shop all', products },
    { key: 'new', label: 'New arrivals', products: products.filter((p) => p.isNew) },
    {
      key: 'bestsellers',
      label: 'Bestsellers',
      products: products.filter((p) => p.reviews).sort((a, b) => b.reviews - a.reviews),
    },
    {
      key: 'last-call',
      label: 'Last call',
      products: products.filter((p) => p.originalPrice > p.price),
    },
  ].filter((c) => c.products.length)
})

// A stable shuffle, standing in for personal recommendations.
const forYou = computed(() =>
  [...(entry.value?.products ?? [])].sort((a, b) => hash(a.slug) - hash(b.slug)),
)

const shown = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (q) {
    return {
      title: `Results for “${query.value.trim()}”`,
      products: entry.value.products.filter((p) => p.name.toLowerCase().includes(q)),
      grid: true,
    }
  }
  const collection = collections.value.find((c) => c.key === active.value)
  return collection
    ? { title: collection.label, products: collection.products, grid: false }
    : { title: 'For you', products: forYou.value, grid: false }
})

const toggle = (key) => {
  if (key === 'all') {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  active.value = active.value === key ? null : key
  query.value = ''
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'reviews', label: 'Most reviewed' },
  { value: 'new', label: 'Newest' },
]
const sorters = {
  featured: (a, b) => hash(a.slug) - hash(b.slug),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  reviews: (a, b) => (b.reviews ?? 0) - (a.reviews ?? 0),
  new: (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
}

// Top of the price slider: the shop's highest price, rounded up to the next R100.
const priceCeiling = computed(() =>
  Math.max(
    100,
    Math.ceil(Math.max(0, ...(entry.value?.products ?? []).map((p) => p.price)) / 100) * 100,
  ),
)

const priceLabel = computed(() => {
  const min = priceMin.value
  const max = priceMax.value
  if (max !== null) {
    return min
      ? `${formatWholePrice(min)}–${formatWholePrice(max)}`
      : `Under ${formatWholePrice(max)}`
  }
  return min ? `${formatWholePrice(min)}+` : 'Price'
})

const filtered = computed(() =>
  (entry.value?.products ?? [])
    .filter((p) => !onSale.value || p.originalPrice > p.price)
    .filter((p) => !inStockOnly.value || isInStock(p))
    .filter(
      (p) => p.price >= priceMin.value && (priceMax.value === null || p.price <= priceMax.value),
    )
    .sort(sorters[sort.value]),
)

const hasPriceFilter = computed(() => priceMin.value > 0 || priceMax.value !== null)
const hasFilters = computed(
  () => sort.value !== 'featured' || hasPriceFilter.value || onSale.value || inStockOnly.value,
)

function clearFilters() {
  sort.value = 'featured'
  priceMin.value = 0
  priceMax.value = null
  onSale.value = false
  inStockOnly.value = false
}

const toggleClass = (on) =>
  on
    ? 'bg-white text-gray-900 ring-white'
    : 'bg-white/15 text-white ring-white/20 hover:bg-white/25'
</script>

<template>
  <main
    v-if="entry"
    class="relative flex-1 overflow-hidden pb-16 text-white"
    :style="{ backgroundColor: theme.background }"
  >
    <!-- Soft, blurred product art standing in for a hero photo -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[36rem]" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        class="absolute -top-16 -left-24 w-[34rem] rotate-[-14deg] text-white/15 blur-2xl"
        fill="currentColor"
        fill-rule="evenodd"
      >
        <path :d="theme.art" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        class="absolute -top-10 -right-20 w-[28rem] rotate-[18deg] text-black/20 blur-2xl"
        fill="currentColor"
        fill-rule="evenodd"
      >
        <path :d="theme.art" />
      </svg>
      <div class="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />
    </div>

    <div class="relative mx-auto max-w-[110rem] px-4 pt-5 md:px-10">
      <div class="flex items-center justify-between gap-3">
        <form
          role="search"
          class="flex h-11 w-full max-w-72 items-center gap-2 rounded-full bg-white/15 px-4 ring-1 ring-white/20 backdrop-blur focus-within:ring-2 focus-within:ring-white/60"
          @submit.prevent
        >
          <svg
            viewBox="0 0 24 24"
            class="size-5 shrink-0 text-white/80"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            v-model="query"
            type="search"
            :aria-label="`Search ${shop.name}`"
            :placeholder="`Search ${shop.name}…`"
            class="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/70 focus:outline-none"
          />
        </form>
        <button
          type="button"
          :aria-pressed="following"
          class="h-11 shrink-0 rounded-full bg-white/15 px-5 text-sm font-semibold ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/25"
          @click="following = !following"
        >
          {{ following ? 'Following' : 'Follow' }}
        </button>
      </div>

      <header class="mt-10 flex flex-col items-center text-center">
        <svg
          viewBox="0 0 24 24"
          class="size-24 text-white drop-shadow-lg sm:size-28"
          fill="currentColor"
          fill-rule="evenodd"
          aria-hidden="true"
        >
          <path :d="theme.art" />
        </svg>
        <h1 :class="['mt-4 drop-shadow-md', theme.wordmark]">{{ shop.name }}</h1>
        <p v-if="shop.rating" class="mt-3 text-xs font-semibold text-white/90">
          {{ shop.rating }} ★ {{ formatCount(shop.reviews) }} Reviews
        </p>
      </header>

      <nav
        :aria-label="`${shop.name} collections`"
        class="-mx-4 mt-14 flex gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
      >
        <button
          v-for="collection in collections"
          :key="collection.key"
          type="button"
          :aria-pressed="collection.key === 'all' ? undefined : active === collection.key"
          :class="[
            'flex shrink-0 items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-semibold ring-1 backdrop-blur transition-colors',
            active === collection.key
              ? 'bg-white text-gray-900 ring-white'
              : 'bg-white/15 text-white ring-white/20 hover:bg-white/25',
          ]"
          @click="toggle(collection.key)"
        >
          <span
            :class="[
              'flex size-7 items-center justify-center rounded-full',
              collection.products[0].background,
            ]"
          >
            <svg
              viewBox="0 0 24 24"
              :class="['size-4', collection.products[0].accent]"
              fill="currentColor"
              fill-rule="evenodd"
              aria-hidden="true"
            >
              <path :d="collection.products[0].icon" />
            </svg>
          </span>
          {{ collection.label }}
        </button>
      </nav>

      <section
        class="mt-4 rounded-3xl bg-white/10 py-5 ring-1 ring-white/15 backdrop-blur sm:py-6"
        :aria-label="shown.title"
      >
        <template v-if="!shown.products.length">
          <h2 class="mx-5 text-xl font-semibold sm:mx-6">{{ shown.title }}</h2>
          <p class="mx-5 mt-4 text-sm text-white/80 sm:mx-6">No products match.</p>
        </template>

        <template v-else-if="shown.grid">
          <h2 class="mx-5 mb-4 text-xl font-semibold sm:mx-6">{{ shown.title }}</h2>
          <ul class="grid grid-cols-2 gap-4 px-5 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
            <li v-for="product in shown.products" :key="product.slug">
              <ProductCard :product="product" on-dark />
            </li>
          </ul>
        </template>

        <ProductRow v-else :title="shown.title" :products="shown.products" inset on-dark>
          <template #header>
            <h2 class="mx-5 mb-4 text-xl font-semibold sm:mx-6">{{ shown.title }}</h2>
          </template>
        </ProductRow>
      </section>

      <section id="products" class="mt-12 scroll-mt-24" aria-labelledby="products-heading">
        <h2 id="products-heading" class="text-xl font-semibold">Products</h2>

        <div class="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            aria-label="All filters"
            title="All filters"
            aria-haspopup="dialog"
            :class="[
              'relative flex size-10 items-center justify-center rounded-full ring-1 transition-colors',
              toggleClass(hasFilters),
            ]"
            @click="filtersOpen = true"
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
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
              <circle cx="16" cy="7" r="2" />
              <circle cx="10" cy="17" r="2" />
            </svg>
          </button>
          <FilterMenu v-model="sort" label="Sort by" :options="sortOptions" on-dark />
          <button
            type="button"
            :aria-pressed="onSale"
            :class="[
              'h-10 rounded-full px-4 text-sm font-semibold ring-1 transition-colors',
              toggleClass(onSale),
            ]"
            @click="onSale = !onSale"
          >
            On sale
          </button>
          <button
            type="button"
            aria-haspopup="dialog"
            :class="[
              'flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold ring-1 transition-colors',
              toggleClass(hasPriceFilter),
            ]"
            @click="filtersOpen = true"
          >
            {{ priceLabel }}
            <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          <button
            type="button"
            :aria-pressed="inStockOnly"
            :class="[
              'h-10 rounded-full px-4 text-sm font-semibold ring-1 transition-colors',
              toggleClass(inStockOnly),
            ]"
            @click="inStockOnly = !inStockOnly"
          >
            In stock
          </button>
        </div>

        <ul
          v-if="filtered.length"
          class="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          <li v-for="product in filtered" :key="product.slug">
            <ProductCard :product="product" :sold-out="!isInStock(product)" on-dark />
          </li>
        </ul>
        <div
          v-else
          class="mt-6 rounded-3xl bg-white/10 px-6 py-10 text-center ring-1 ring-white/15"
        >
          <p class="font-semibold">No products match these filters.</p>
          <button
            type="button"
            class="mt-4 h-10 rounded-full bg-white px-5 text-sm font-semibold text-gray-900 transition-colors hover:bg-white/90"
            @click="clearFilters"
          >
            Clear filters
          </button>
        </div>

        <ProductFilters
          v-model:open="filtersOpen"
          v-model:sort="sort"
          v-model:on-sale="onSale"
          v-model:in-stock="inStockOnly"
          v-model:price-min="priceMin"
          v-model:price-max="priceMax"
          :sort-options="sortOptions"
          :ceiling="priceCeiling"
          @reset="clearFilters"
        />
      </section>
    </div>
  </main>

  <main v-else class="flex-1 bg-canvas px-4 pt-16 pb-16 text-center">
    <h1 class="text-2xl font-bold text-gray-900">Shop not found</h1>
    <RouterLink
      to="/explore"
      class="mt-6 inline-block rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
    >
      Explore products
    </RouterLink>
  </main>
</template>
