// Sample cart contents. Shop and product names are placeholders.
// Set `image` on an item (or `logo` on a shop) to show a real photo instead of the placeholder.
import { icons } from './categories'

export const shops = {
  'kit-classics': {
    slug: 'kit-classics',
    name: 'Kit Classics',
    rating: 4.6,
    reviews: 4600,
    color: 'bg-gray-900',
  },
  'national-team-store': {
    slug: 'national-team-store',
    name: 'National Team Store',
    rating: 4.7,
    reviews: 1100,
    color: 'bg-blue-900',
  },
}

export const cartItems = [
  {
    id: 'retro-home-jersey-2012',
    shop: 'kit-classics',
    name: 'Retro Home Jersey 2012/13',
    options:
      'S / Custom Name and Number (Leave Note At Checkout) / Patch (Leave Patch Name At Checkout)',
    price: 609,
    originalPrice: 899,
    discount: 122,
    quantity: 1,
    icon: icons.tshirt,
    background: 'bg-red-50',
    accent: 'text-red-400',
  },
  {
    id: 'away-replica-jersey-stars',
    shop: 'national-team-store',
    name: "Men's 2026 Away Replica Jersey - Stars",
    options: 'XL',
    price: 1799,
    quantity: 1,
    icon: icons.tshirt,
    background: 'bg-stone-100',
    accent: 'text-gray-700',
  },
]
