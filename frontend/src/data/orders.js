// Sample order history for the Orders page. Shop and product names are placeholders.
// Set `logo` on a shop or `image` on an item to show real photos instead of placeholders.
import { icons } from './categories'
import { tints } from './products'

// Delivery steps, in order. `cancelled` orders sit outside this sequence.
export const orderSteps = [
  { status: 'processing', label: 'Ordered' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'out-for-delivery', label: 'Out for delivery' },
  { status: 'delivered', label: 'Delivered' },
]

const shops = {
  'glow-theory': {
    slug: 'glow-theory',
    name: 'Glow Theory',
    rating: 4.7,
    reviews: 8200,
    color: 'bg-rose-700',
  },
  'morning-ritual': {
    slug: 'morning-ritual',
    name: 'Morning Ritual',
    rating: 4.8,
    reviews: 3100,
    color: 'bg-amber-800',
  },
  'kit-classics': {
    slug: 'kit-classics',
    name: 'Kit Classics',
    rating: 4.6,
    reviews: 4600,
    color: 'bg-gray-900',
  },
  'cubby-bear': {
    slug: 'cubby-bear',
    name: 'Cubby Bear',
    rating: 4.9,
    reviews: 920,
    color: 'bg-gray-900',
  },
  'hearth-and-co': {
    slug: 'hearth-and-co',
    name: 'Hearth & Co',
    rating: 4.9,
    reviews: 8900,
    color: 'bg-orange-700',
  },
}

// `tint` picks the placeholder colours.
const item = ({ tint, ...rest }) => {
  const [background, accent] = tints[tint]
  return { quantity: 1, ...rest, background, accent }
}

// Dates are ISO days. In-progress orders have `eta`; delivered ones have `deliveredOn`.
export const orders = [
  {
    number: '1048',
    shop: shops['glow-theory'],
    placedOn: '2026-10-21',
    status: 'shipped',
    eta: '2026-10-27',
    items: [
      {
        id: 'dew-drops-serum',
        name: 'Dew Drops Hydrating Serum',
        options: '50 ml',
        price: 539,
        icon: icons.dropper,
        tint: 'pink',
      },
      {
        id: 'sunscreen-spf50',
        name: 'Invisible Sunscreen SPF 50',
        options: '2 pack',
        price: 499,
        quantity: 2,
        icon: icons.tube,
        tint: 'amber',
      },
    ],
  },
  {
    number: '1046',
    shop: shops['morning-ritual'],
    placedOn: '2026-10-20',
    status: 'out-for-delivery',
    eta: '2026-10-23',
    items: [
      {
        id: 'house-blend-beans',
        name: 'House Blend Whole Bean Coffee 2 lb',
        options: 'Medium roast',
        price: 439,
        icon: icons.cup,
        tint: 'amber',
      },
    ],
  },
  {
    number: '1045',
    shop: shops['cubby-bear'],
    placedOn: '2026-10-22',
    status: 'processing',
    eta: '2026-10-29',
    items: [
      {
        id: 'holiday-boxer-briefs',
        name: "Boy's Holiday Boxer Brief Underwear 3-Pack",
        options: 'Size 6',
        price: 519,
        icon: icons.shorts,
        tint: 'rose',
      },
      {
        id: 'blocks-boxer-briefs',
        name: "Pixel Blocks Bamboo Boys' Boxer Brief 3-Pack",
        options: 'Size 6',
        price: 519,
        icon: icons.shorts,
        tint: 'lime',
      },
    ],
  },
  {
    number: '1039',
    shop: shops['kit-classics'],
    placedOn: '2026-10-02',
    status: 'delivered',
    deliveredOn: '2026-10-08',
    items: [
      {
        id: 'retro-away-jersey-2008',
        name: 'Retro Away Jersey 2008/09',
        options: 'M',
        price: 609,
        icon: icons.tshirt,
        tint: 'blue',
      },
    ],
  },
  {
    number: '1031',
    shop: shops['hearth-and-co'],
    placedOn: '2026-09-14',
    status: 'delivered',
    deliveredOn: '2026-09-19',
    items: [
      {
        id: 'ceramic-nonstick-pot',
        name: 'Ceramic Nonstick Perfect Pot 6.5 qt.',
        options: 'Terracotta',
        price: 2679,
        icon: icons.pan,
        tint: 'orange',
      },
      {
        id: 'paper-lantern-lamp',
        name: 'Paper Lantern Table Lamp',
        price: 2319,
        icon: icons.lamp,
        tint: 'yellow',
      },
    ],
  },
  {
    number: '1027',
    shop: shops['glow-theory'],
    placedOn: '2026-09-03',
    status: 'cancelled',
    items: [
      {
        id: 'body-mist',
        name: 'Coconut Vanilla Body Mist',
        price: 379,
        icon: icons.perfume,
        tint: 'violet',
      },
    ],
  },
].map((order) => {
  const items = order.items.map(item)
  return {
    ...order,
    items,
    total: items.reduce((sum, { price, quantity }) => sum + price * quantity, 0),
  }
})
