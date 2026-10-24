<script setup>
import { computed, ref, useTemplateRef, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AccordionSection from '@/components/AccordionSection.vue'
import ProductGallery from '@/components/ProductGallery.vue'
import ProductRow from '@/components/ProductRow.vue'
import ProductReviews from '@/components/ProductReviews.vue'
import ShopAvatar from '@/components/ShopAvatar.vue'
import StarRating from '@/components/StarRating.vue'
import { findProduct, isInStock, relatedProducts } from '@/data/catalog'
import { productDetails } from '@/data/productDetails'
import { useCartStore } from '@/stores/cart'
import { formatCount, formatPrice } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const entry = computed(() => findProduct(route.params.slug))
const product = computed(() => entry.value?.product)
const shop = computed(() => entry.value?.shop)
const details = computed(() => entry.value && productDetails(entry.value))
const related = computed(() => relatedProducts(route.params.slug))
const inStock = computed(() => product.value && isInStock(product.value))
const reviewsSection = useTemplateRef('reviewsSection')

const size = ref(null)
const quantity = ref(1)
const added = ref(false)
const saved = ref(false)
const shareNote = ref('')
const descriptionOpen = ref(false)
const following = ref(false)
const postcode = ref('')
const editingPostcode = ref(false)

// Fresh choices for each product: the first available size, quantity 1.
watch(
  entry,
  () => {
    size.value = details.value?.sizes?.find((s) => s.available)?.label ?? null
    quantity.value = 1
    added.value = false
    saved.value = false
    descriptionOpen.value = false
  },
  { immediate: true },
)

const percentOff = computed(() => {
  const { price, originalPrice } = product.value ?? {}
  return originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0
})

const addToCart = () => {
  const p = product.value
  cart.addItem(
    {
      id: size.value ? `${p.slug}:${size.value}` : p.slug,
      name: p.name,
      options: size.value ? `Size ${size.value}` : undefined,
      price: p.price,
      originalPrice: percentOff.value ? p.originalPrice : undefined,
      quantity: quantity.value,
      image: p.image,
      icon: p.icon,
      background: p.background,
      accent: p.accent,
    },
    shop.value,
  )
  added.value = true
}

const buyNow = () => {
  addToCart()
  router.push('/cart')
}

const share = async () => {
  const url = window.location.href
  try {
    if (navigator.share) {
      await navigator.share({ title: product.value.name, url })
      return
    }
    await navigator.clipboard.writeText(url)
    shareNote.value = 'Link copied'
  } catch {
    // The share sheet was dismissed or the clipboard is blocked; nothing to report.
    return
  }
  setTimeout(() => (shareNote.value = ''), 2000)
}

const savePostcode = (event) => {
  postcode.value = event.target.value.trim()
  editingPostcode.value = false
}

const pill =
  'flex h-11 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-black/5 transition hover:bg-gray-50'
const softButton =
  'flex h-11 items-center justify-center gap-2 rounded-full bg-gray-100 px-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200'
</script>

<template>
  <main v-if="product" class="flex-1 bg-canvas pb-16">
    <div
      class="mx-auto grid max-w-[110rem] gap-8 px-4 pt-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-16 lg:pt-10"
    >
      <!-- Gallery stays in view while the details scroll -->
      <div class="lg:sticky lg:top-24 lg:self-start">
        <ProductGallery :product="product" />
      </div>

      <div>
        <RouterLink :to="`/shops/${shop.slug}`" class="group inline-flex items-center gap-3">
          <ShopAvatar :shop="shop" class="size-9!" />
          <span>
            <span class="block text-sm font-semibold text-gray-900 group-hover:underline">
              {{ shop.name }}
            </span>
            <span v-if="shop.rating" class="block text-xs text-gray-700">
              {{ shop.rating }} ★ ({{ formatCount(shop.reviews) }})
            </span>
          </span>
        </RouterLink>

        <h1 class="mt-4 text-3xl leading-tight font-semibold tracking-tight text-gray-900">
          {{ product.name }}
        </h1>
        <a
          v-if="product.rating"
          href="#reviews"
          class="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-900"
          @click="reviewsSection?.open()"
        >
          <StarRating :rating="product.rating" size="size-4" />
          <span class="underline">
            {{ product.reviews.toLocaleString('en-US') }}
            {{ product.reviews === 1 ? 'rating' : 'ratings' }}
          </span>
        </a>

        <p class="mt-5 flex items-center gap-2 text-lg font-semibold text-gray-900">
          {{ formatPrice(product.price) }}
          <span v-if="percentOff" class="text-base font-normal text-gray-500 line-through">
            {{ formatPrice(product.originalPrice) }}
          </span>
          <span
            v-if="percentOff"
            class="rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white"
          >
            {{ percentOff }}% off
          </span>
        </p>

        <fieldset v-if="details.sizes" class="mt-8">
          <legend class="text-xs font-semibold text-gray-900">
            Size <span class="font-normal">{{ size }}</span>
          </legend>
          <div class="mt-2 flex flex-wrap gap-2">
            <button
              v-for="option in details.sizes"
              :key="option.label"
              type="button"
              :disabled="!option.available"
              :aria-pressed="size === option.label"
              :aria-label="
                option.available ? `Size ${option.label}` : `Size ${option.label}, sold out`
              "
              :class="[
                'flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-xs font-medium transition',
                size === option.label
                  ? 'bg-white text-gray-900 ring-2 ring-gray-900'
                  : option.available
                    ? 'bg-white text-gray-900 ring-1 ring-gray-200 hover:ring-gray-400'
                    : 'cursor-not-allowed bg-gray-100 text-gray-400 line-through',
              ]"
              @click="size = option.label"
            >
              {{ option.label }}
            </button>
          </div>
        </fieldset>

        <div class="mt-5">
          <p class="text-xs font-semibold text-gray-900" id="quantity-label">Quantity</p>
          <div
            class="mt-2 inline-flex h-10 items-center rounded-full bg-white ring-1 ring-gray-200"
            role="group"
            aria-labelledby="quantity-label"
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              :disabled="quantity === 1"
              class="flex size-10 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              @click="quantity--"
            >
              <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
                <path d="M5 11h14v2H5z" />
              </svg>
            </button>
            <span class="w-6 text-center text-sm font-medium" aria-live="polite">{{
              quantity
            }}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              class="flex size-10 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100"
              @click="quantity++"
            >
              <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
                <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="mt-6 space-y-3">
          <button
            type="button"
            :disabled="!inStock"
            class="block h-12 w-full rounded-full bg-[#5433eb] font-semibold text-white transition-colors hover:bg-[#4526d9] disabled:bg-gray-300 disabled:text-gray-600"
            @click="addToCart"
          >
            {{ inStock ? 'Add to cart' : 'Sold out' }}
          </button>
          <button
            v-if="inStock"
            type="button"
            class="block h-12 w-full rounded-full bg-gray-900 font-semibold text-white transition-colors hover:bg-gray-700"
            @click="buyNow"
          >
            Buy now
          </button>
          <p v-if="added" class="text-center text-sm text-gray-700" role="status">
            Added to your cart.
            <RouterLink to="/cart" class="font-semibold text-[#5433eb] hover:underline">
              View cart
            </RouterLink>
          </p>
          <div class="grid grid-cols-2 gap-3">
            <button type="button" :aria-pressed="saved" :class="pill" @click="saved = !saved">
              <svg
                viewBox="0 0 24 24"
                :class="['size-5', saved && 'text-rose-600']"
                :fill="saved ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M12 20s-7-4.4-9-8.6C1.6 8.5 3.4 5 6.8 5c2 0 3.4 1.1 5.2 3 1.8-1.9 3.2-3 5.2-3 3.4 0 5.2 3.5 3.8 6.4C19 15.6 12 20 12 20z"
                />
              </svg>
              {{ saved ? 'Saved' : 'Save' }}
            </button>
            <button type="button" :class="pill" @click="share">
              <svg
                viewBox="0 0 24 24"
                class="size-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
              </svg>
              <span aria-live="polite">{{ shareNote || 'Share' }}</span>
            </button>
          </div>
        </div>

        <!-- Keyed so each product starts with the default open/closed sections -->
        <div :key="product.slug" class="mt-8">
          <AccordionSection title="Highlights">
            <ul class="list-disc space-y-2 pl-5 text-sm text-gray-900">
              <li v-for="line in details.highlights" :key="line">{{ line }}</li>
            </ul>
          </AccordionSection>

          <AccordionSection title="Description" default-open>
            <div class="relative">
              <div
                :class="[
                  'space-y-3 text-sm whitespace-pre-line text-gray-900',
                  !descriptionOpen && 'max-h-28 overflow-hidden',
                ]"
              >
                {{ details.description }}
              </div>
              <div
                v-if="!descriptionOpen"
                class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-canvas"
              />
            </div>
            <button
              type="button"
              :aria-expanded="descriptionOpen"
              :class="[softButton, 'mt-3 w-full']"
              @click="descriptionOpen = !descriptionOpen"
            >
              {{ descriptionOpen ? 'Read less' : 'Read more' }}
            </button>
          </AccordionSection>

          <AccordionSection title="Specifications">
            <dl class="grid grid-cols-2">
              <div
                v-for="spec in details.specs"
                :key="spec.label"
                class="border-b border-gray-200 py-3 pr-4 [&:nth-last-child(-n+2)]:border-b-0"
              >
                <dt class="text-xs text-gray-500">{{ spec.label }}</dt>
                <dd class="mt-0.5 text-sm text-gray-900">{{ spec.value }}</dd>
              </div>
              <div
                v-if="details.sizes"
                class="border-b border-gray-200 py-3 pr-4 [&:nth-last-child(-n+2)]:border-b-0"
              >
                <dt class="text-xs text-gray-500">Available sizes</dt>
                <dd class="mt-0.5 text-sm text-gray-900">
                  {{ details.sizes.map((s) => s.label).join(', ') }}
                </dd>
              </div>
            </dl>
          </AccordionSection>

          <AccordionSection id="reviews" ref="reviewsSection" title="Reviews" class="scroll-mt-24">
            <ProductReviews :reviews="details.reviews" />
          </AccordionSection>

          <AccordionSection title="Delivery & Returns">
            <ul class="space-y-3 text-sm text-gray-900">
              <li class="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  class="mt-0.5 size-4 shrink-0"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"
                  />
                </svg>
                <span v-if="editingPostcode" class="flex items-center gap-2">
                  <label for="postcode">Ships to</label>
                  <input
                    id="postcode"
                    :value="postcode"
                    inputmode="numeric"
                    autocomplete="postal-code"
                    placeholder="Postcode"
                    class="h-8 w-28 rounded-lg px-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#5433eb] focus:outline-none"
                    @keydown.enter.prevent="savePostcode"
                    @blur="savePostcode"
                  />
                </span>
                <span v-else>
                  Ships to
                  <button
                    type="button"
                    class="inline-flex items-center gap-0.5 font-semibold hover:underline"
                    @click="editingPostcode = true"
                  >
                    {{ postcode || 'add postcode' }}
                    <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>
                </span>
              </li>
              <li class="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  class="mt-0.5 size-4 shrink-0"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6h12v9h1.5a3 3 0 0 1 5.5 0H22v-4l-3-4h-4V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1zm4.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm12 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM2 15h2a3 3 0 0 1 5 0h3v-1H2z"
                  />
                </svg>
                Shipping calculated at checkout
              </li>
              <li class="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  class="mt-0.5 size-4 shrink-0"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 4h16v5H4zm1 6h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm4 2v2h6v-2z" />
                </svg>
                <span>
                  Returns accepted within 30 days
                  <span class="block text-xs text-gray-500">
                    Exclusions may apply. See the full policy.
                  </span>
                </span>
              </li>
            </ul>
            <div class="mt-5 grid grid-cols-2 gap-3">
              <RouterLink :to="`/shops/${shop.slug}/policies#returns`" :class="softButton">
                Return policy
              </RouterLink>
              <RouterLink :to="`/shops/${shop.slug}/policies#shipping`" :class="softButton">
                Shipping policy
              </RouterLink>
              <RouterLink :to="`/shops/${shop.slug}`" :class="[softButton, 'col-span-2']">
                Visit {{ shop.name }}
              </RouterLink>
            </div>
          </AccordionSection>
        </div>

        <!-- Shop banner -->
        <div :class="['relative mt-4 overflow-hidden rounded-3xl p-5 text-white', shop.color]">
          <div class="absolute inset-0 bg-gradient-to-br from-white/15 to-black/30" />
          <div class="relative flex min-h-36 flex-col justify-between gap-6">
            <ShopAvatar :shop="shop" class="self-center ring-2 ring-white/40" />
            <div class="flex items-end justify-between gap-4">
              <div class="min-w-0">
                <span
                  v-if="shop.discount"
                  class="rounded-full bg-black/70 px-2 py-0.5 text-[0.65rem] font-semibold"
                >
                  Extra savings
                </span>
                <RouterLink
                  :to="`/shops/${shop.slug}`"
                  class="mt-1 block truncate font-semibold hover:underline"
                >
                  {{ shop.name }}
                </RouterLink>
                <p v-if="shop.rating" class="text-xs">
                  ★ {{ shop.rating }} ({{ formatCount(shop.reviews) }})
                </p>
              </div>
              <button
                type="button"
                :aria-pressed="following"
                class="h-10 shrink-0 rounded-full bg-white/15 px-5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25"
                @click="following = !following"
              >
                {{ following ? 'Following' : 'Follow' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProductRow
      v-if="related.length"
      title="You may also like"
      :to="entry.category ? `/categories/${entry.category.slug}` : ''"
      :products="related"
      class="mt-10"
    />
  </main>

  <main v-else class="flex-1 bg-canvas px-4 pt-16 pb-16 text-center">
    <h1 class="text-2xl font-bold text-gray-900">Product not found</h1>
    <RouterLink
      to="/explore"
      class="mt-6 inline-block rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
    >
      Explore products
    </RouterLink>
  </main>
</template>
