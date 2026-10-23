// Sample editorial stories for the Explore page. Brand names are placeholders.
// Set `image` on a story to show a real photo instead of the illustration.
import { icons } from './categories'

export const stories = [
  {
    slug: 'korean-beauty-edit',
    title: 'The Korean Beauty Edit',
    description: 'Shop cult favourites from serums to SPF.',
    background: 'from-pink-200 via-rose-300 to-rose-400',
    art: [icons.tube, icons.dropper, icons.jar, icons.perfume],
  },
  {
    slug: 'autumn-workwear-edit',
    badge: 'Guest editor',
    title: 'The Autumn Workwear Edit',
    description: 'Corporate or creative, consider your 9-to-5 handled.',
    background: 'from-amber-800 via-stone-700 to-violet-900',
    art: [icons.shirt, icons.dress, icons.pants],
  },
  {
    slug: 'brand-spotlight-salt-and-stone',
    title: 'Brand Spotlight: Salt & Stone',
    background: 'from-sky-300 via-slate-500 to-slate-700',
    art: [icons.sneaker],
  },
]

// "Browse categories" cards: two product tiles each.
// Set `image` on a product to show a real photo instead of the icon.
export const browseCategories = [
  {
    slug: 'beauty',
    name: 'Beauty',
    color: 'bg-[#b9445a]',
    products: [{ icon: icons.tube }, { icon: icons.dropper }],
  },
  {
    slug: 'women',
    name: 'Women',
    color: 'bg-[#a3a8ad]',
    products: [{ icon: icons.tshirt }, { icon: icons.pants }],
  },
  {
    slug: 'men',
    name: 'Men',
    color: 'bg-[#003b8e]',
    products: [{ icon: icons.shirt }, { icon: icons.pants }],
  },
  {
    slug: 'home',
    name: 'Home',
    color: 'bg-[#d06000]',
    products: [{ icon: icons.lamp }, { icon: icons.pan }],
  },
  {
    slug: 'fitness-nutrition',
    name: 'Fitness & nutrition',
    color: 'bg-[#9fbe98]',
    products: [{ icon: icons.jar }, { icon: icons.shorts }],
  },
  {
    slug: 'baby-toddler',
    name: 'Baby & toddler',
    color: 'bg-[#95a99a]',
    products: [{ icon: icons.onesie }, { icon: icons.stroller }],
  },
  {
    slug: 'sporting-goods',
    name: 'Sporting goods',
    color: 'bg-[#6550a6]',
    products: [{ icon: icons.racket }, { icon: icons.kettlebell }],
  },
  {
    slug: 'food-drinks',
    name: 'Food & drinks',
    color: 'bg-[#ad1a24]',
    products: [{ icon: icons.snack }, { icon: icons.sauce }],
  },
  {
    slug: 'toys-games',
    name: 'Toys & games',
    color: 'bg-[#00672f]',
    products: [{ icon: icons.block }, { icon: icons.bear }],
  },
  {
    slug: 'pet-supplies',
    name: 'Pet supplies',
    color: 'bg-[#a87670]',
    products: [{ icon: icons.bowl }, { icon: icons.paw }],
  },
]
