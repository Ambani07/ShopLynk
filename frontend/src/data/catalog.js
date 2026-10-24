// Product lookup for the product page: every sample product (category pages and deals)
// with its category and shop. Shops for category products are built from brand names.
import { dealShops } from './deals'
import { browseCategories } from './explore'
import { categoryProducts } from './products'
import { hash, slugify } from '@/utils/hash'

// Which category each deals shop sells in.
const dealCategories = {
  'cubby-bear': 'baby-toddler',
  'rooted-remedies': 'fitness-nutrition',
  'morning-ritual': 'food-drinks',
  'glow-theory': 'beauty',
}

const shopColors = [
  'bg-gray-900',
  'bg-rose-700',
  'bg-blue-900',
  'bg-green-800',
  'bg-amber-800',
  'bg-violet-800',
  'bg-teal-800',
  'bg-orange-700',
]

// Shop rating: the review-weighted average of its products.
const rate = (shop, products) => {
  const rated = products.filter((p) => p.reviews)
  const reviews = rated.reduce((sum, p) => sum + p.reviews, 0)
  const rating = reviews ? rated.reduce((sum, p) => sum + p.rating * p.reviews, 0) / reviews : 0
  return { ...shop, rating: Math.round(rating * 10) / 10 || undefined, reviews }
}

const categoryOf = (slug) => browseCategories.find((c) => c.slug === slug)

const entries = new Map()

const byBrand = new Map()
for (const [category, products] of Object.entries(categoryProducts)) {
  for (const product of products) {
    if (!byBrand.has(product.brand)) byBrand.set(product.brand, [])
    byBrand.get(product.brand).push({ product, category })
  }
}
for (const [brand, items] of byBrand) {
  const slug = slugify(brand)
  const shop = rate(
    { slug, name: brand, color: shopColors[hash(slug) % shopColors.length] },
    items.map((item) => item.product),
  )
  for (const { product, category } of items) {
    entries.set(product.slug, { product, category: categoryOf(category), shop })
  }
}

for (const { products, ...dealShop } of dealShops) {
  const shop = rate(dealShop, products)
  for (const product of products) {
    if (entries.has(product.slug)) continue
    entries.set(product.slug, {
      product: { ...product, brand: shop.name },
      category: categoryOf(dealCategories[shop.slug]),
      shop,
    })
  }
}

// slug → { product, category?, shop }, or undefined
export const findProduct = (slug) => entries.get(slug)

// Other products from the same category: same subcategory first, then the rest.
export const relatedProducts = (slug, limit = 12) => {
  const entry = entries.get(slug)
  if (!entry?.category) return []
  const others = (categoryProducts[entry.category.slug] ?? []).filter((p) => p.slug !== slug)
  const sub = entry.product.sub
  return [
    ...others.filter((p) => sub && p.sub === sub),
    ...others.filter((p) => !sub || p.sub !== sub),
  ].slice(0, limit)
}
