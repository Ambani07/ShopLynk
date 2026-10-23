// Sample brand carousels for the home page. Brand names are placeholders.
// Set `image` on a brand (hero) or a product (thumbnail) to use real photos.
import { icons } from './categories'

export const brandSections = [
  {
    slug: 'baby-toddler',
    title: 'Baby & toddler',
    brands: [
      {
        slug: 'little-fern',
        name: 'Little Fern',
        rating: 4.9,
        reviews: '48.2k',
        background: 'from-emerald-300 via-teal-500 to-teal-700',
        art: icons.onesie,
        wordmark: 'font-serif text-4xl italic',
        accent: '#0f766e',
        products: [
          { name: 'Organic onesie', icon: icons.onesie },
          { name: 'Glass bottle', icon: icons.bottle },
          { name: 'Stacking blocks', icon: icons.block },
        ],
      },
      {
        slug: 'nestling',
        name: 'Nestling',
        rating: 4.8,
        reviews: '12.6k',
        background: 'from-stone-300 via-stone-400 to-stone-600',
        art: icons.stroller,
        wordmark: 'border-2 border-white px-4 py-2 text-2xl font-bold tracking-[0.35em] uppercase',
        accent: '#57534e',
        products: [
          { name: 'Travel stroller', icon: icons.stroller },
          { name: 'Sleep suit', icon: icons.onesie },
          { name: 'Snack cup', icon: icons.cup },
        ],
      },
      {
        slug: 'puddle-pine',
        name: 'Puddle & Pine',
        rating: 4.9,
        reviews: '36.1k',
        background: 'from-sky-300 via-sky-500 to-indigo-600',
        art: icons.block,
        wordmark: 'text-4xl font-light tracking-tight',
        accent: '#4338ca',
        products: [
          { name: 'Soft blocks', icon: icons.block },
          { name: 'Rain suit', icon: icons.hoodie },
          { name: 'Little sneakers', icon: icons.sneaker },
        ],
      },
      {
        slug: 'tiny-atlas',
        name: 'Tiny Atlas',
        rating: 4.5,
        reviews: '9.4k',
        background: 'from-amber-200 via-amber-400 to-orange-500',
        art: icons.bottle,
        wordmark: 'text-4xl font-black lowercase',
        accent: '#c2410c',
        products: [
          { name: 'Anti-colic bottle', icon: icons.bottle },
          { name: 'Weaning cup', icon: icons.cup },
          { name: 'Snack pouch', icon: icons.snack },
        ],
      },
      {
        slug: 'moonbeam',
        name: 'Moonbeam',
        rating: 4.9,
        reviews: '7.7k',
        background: 'from-violet-300 via-purple-500 to-purple-700',
        art: icons.onesie,
        wordmark: 'font-serif text-4xl tracking-wide',
        accent: '#7e22ce',
        products: [
          { name: 'Sleep sack', icon: icons.onesie },
          { name: 'Night-light jar', icon: icons.candle },
          { name: 'Cosy blanket', icon: icons.blanket },
        ],
      },
      {
        slug: 'hopscotch',
        name: 'Hopscotch',
        rating: 4.7,
        reviews: '21.3k',
        background: 'from-rose-300 via-pink-500 to-pink-700',
        art: icons.sneaker,
        wordmark: 'text-4xl font-extrabold italic',
        accent: '#be185d',
        products: [
          { name: 'First walkers', icon: icons.sneaker },
          { name: 'Play pants', icon: icons.pants },
          { name: 'Activity cube', icon: icons.block },
        ],
      },
    ],
  },
]
