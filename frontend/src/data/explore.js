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
