// Product and shop lookup: every sample product (category pages and deals) with its
// category and shop, and every shop with its products and page theme.
// Shops for category products are built from brand names.
import { brandSections } from './brands'
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

// Muted page colours for shops without a brand colour of their own.
const pageColors = [
  '#5b4450',
  '#3f4f5f',
  '#4a5a45',
  '#6b4a3a',
  '#3e3a5c',
  '#2f5050',
  '#5a3f2f',
  '#4b4b55',
]

// Brands from the home page carousel keep their slug, colour and wordmark style.
const carouselBrands = new Map(
  brandSections.flatMap((section) => section.brands).map((brand) => [brand.name, brand]),
)

// Shop rating: the review-weighted average of its products.
const rate = (shop, products) => {
  const rated = products.filter((p) => p.reviews)
  const reviews = rated.reduce((sum, p) => sum + p.reviews, 0)
  const rating = reviews ? rated.reduce((sum, p) => sum + p.rating * p.reviews, 0) / reviews : 0
  return { ...shop, rating: Math.round(rating * 10) / 10 || undefined, reviews }
}

// The icon most of a shop's products use, for the page's background art.
const commonIcon = (products) => {
  const counts = new Map()
  for (const { icon } of products) counts.set(icon, (counts.get(icon) ?? 0) + 1)
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0]
}

const themeFor = (shop, products) => {
  const brand = carouselBrands.get(shop.name)
  return {
    background: brand?.accent ?? pageColors[hash(shop.slug) % pageColors.length],
    wordmark: brand?.wordmark ?? 'text-5xl font-bold tracking-tight',
    art: brand?.art ?? commonIcon(products),
  }
}

const categoryOf = (slug) => browseCategories.find((c) => c.slug === slug)

const entries = new Map()
const shops = new Map()

const addShop = (shop, products) => {
  shops.set(shop.slug, { shop, products, theme: themeFor(shop, products) })
}

const byBrand = new Map()
for (const [category, products] of Object.entries(categoryProducts)) {
  for (const product of products) {
    if (!byBrand.has(product.brand)) byBrand.set(product.brand, [])
    byBrand.get(product.brand).push({ product, category })
  }
}
for (const [brand, items] of byBrand) {
  const slug = carouselBrands.get(brand)?.slug ?? slugify(brand)
  const products = items.map((item) => item.product)
  const shop = rate(
    { slug, name: brand, color: shopColors[hash(slug) % shopColors.length] },
    products,
  )
  addShop(shop, products)
  for (const { product, category } of items) {
    entries.set(product.slug, { product, category: categoryOf(category), shop })
  }
}

for (const { products: dealProducts, ...dealShop } of dealShops) {
  const products = dealProducts.map((product) => ({ ...product, brand: dealShop.name }))
  const shop = rate(dealShop, products)
  addShop(shop, products)
  for (const product of products) {
    if (entries.has(product.slug)) continue
    entries.set(product.slug, {
      product,
      category: categoryOf(dealCategories[shop.slug]),
      shop,
    })
  }
}

// slug → { product, category?, shop }, or undefined
export const findProduct = (slug) => entries.get(slug)

// slug → { shop, products, theme: { background, wordmark, art } }, or undefined
export const findShop = (slug) => shops.get(slug)

// Sample stock: a stable one in seven products is sold out until real stock data exists.
export const isInStock = (product) => hash(`stock:${product.slug}`) % 7 !== 0

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
