// Sample product page details, generated from a product and its category until real
// product data exists. The same product always gets the same details.
import { icons } from './categories'
import { hash } from '@/utils/hash'

const apparel = [icons.tshirt, icons.shirt, icons.dress, icons.pants, icons.hoodie, icons.shorts]

const sizeChart = (product, category) => {
  if (category?.slug === 'baby-toddler' && [icons.onesie, ...apparel].includes(product.icon)) {
    return ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M']
  }
  if (product.icon === icons.sneaker) return ['6', '7', '8', '9', '10', '11', '12']
  if (apparel.includes(product.icon)) return ['XS', 'S', 'M', 'L', 'XL', '2XL']
  return null
}

// [{ label, available }]; roughly one size in four is sold out, but never the first.
const sizesFor = (product, category) =>
  sizeChart(product, category)?.map((label, i) => ({
    label,
    available: i === 0 || hash(`${product.slug}:${label}`) % 4 !== 0,
  })) ?? null

// Per-category copy. `p` is the product.
const templates = {
  beauty: {
    highlights: (p) => [
      `${p.name} is formulated for everyday use on all skin types`,
      'Dermatologist tested and free from parabens and sulfates',
      'Lightweight texture that absorbs quickly without residue',
      'Cruelty-free, with recyclable packaging',
    ],
    description: (p) =>
      `${p.brand} made ${p.name} for routines that need to work hard without feeling heavy. Each formula is tested on a wide range of skin types and kept as simple as possible, so it layers easily with the rest of your shelf.\n\nApply morning or night as needed. Patch test before first use, and store somewhere cool and dry, away from direct sunlight.`,
    specs: () => [
      ['Skin type', 'All skin types'],
      ['Finish', 'Natural'],
      ['Free from', 'Parabens, sulfates'],
      ['Cruelty-free', 'Yes'],
    ],
  },
  women: {
    highlights: (p) => [
      `${p.name} is cut for an easy, flattering fit`,
      'Soft, breathable fabric that holds its shape wash after wash',
      'Designed to dress up or down',
      'Available in a full range of sizes',
    ],
    description: (p) =>
      `The ${p.name} from ${p.brand} is the kind of piece you reach for again and again. It's made from a soft, durable fabric with just enough structure, and finished with clean seams that last.\n\nMachine wash cold with similar colours and hang to dry to keep it looking new. Our model is 5'9" and wears a size S.`,
    specs: () => [
      ['Fit', 'Regular'],
      ['Material', 'Cotton blend'],
      ['Care', 'Machine wash cold'],
      ['Origin', 'Imported'],
    ],
  },
  men: {
    highlights: (p) => [
      `${p.name} has a relaxed fit with room to move`,
      'Durable fabric that softens with every wash',
      'Reinforced seams for everyday wear',
      'Available in a full range of sizes',
    ],
    description: (p) =>
      `${p.brand} built the ${p.name} to be a dependable part of your week. It uses a hard-wearing fabric that gets better with age and a fit that works on its own or layered.\n\nMachine wash cold and tumble dry low. Our model is 6'1" and wears a size M.`,
    specs: () => [
      ['Fit', 'Relaxed'],
      ['Material', 'Cotton blend'],
      ['Care', 'Machine wash cold'],
      ['Origin', 'Imported'],
    ],
  },
  home: {
    highlights: (p) => [
      `${p.name} is designed by ${p.brand} for everyday use`,
      'Made from durable, easy-care materials',
      'Pairs well with a wide range of interior styles',
      'Carefully packed to arrive in perfect condition',
    ],
    description: (p) =>
      `${p.brand} designs pieces that look good and work hard, and the ${p.name} is no exception. It's made from considered materials chosen to last for years of daily use.\n\nSee the care guide included in the box for cleaning instructions. Colours may vary slightly from screen to screen.`,
    specs: () => [
      ['Material', 'Mixed materials'],
      ['Care', 'See care guide'],
      ['Assembly', 'None required'],
      ['Warranty', '1 year'],
    ],
  },
  'fitness-nutrition': {
    highlights: (p) => [
      `${p.name} supports an active, balanced routine`,
      'Third-party tested for quality and purity',
      'Made without artificial colours or fillers',
      'Easy to fit into your daily routine',
    ],
    description: (p) =>
      `The ${p.name} from ${p.brand} is made for people who train consistently and want gear and nutrition they can trust. Every batch is tested, and every product is designed around what actually helps.\n\nThese statements have not been evaluated as medical advice. Speak to a healthcare professional before starting any new supplement.`,
    specs: () => [
      ['Use', 'Daily'],
      ['Tested', 'Third-party'],
      ['Dietary', 'Gluten-free'],
      ['Origin', 'Made in USA'],
    ],
  },
  'baby-toddler': {
    highlights: (p) => [
      `${p.name} is made with little ones' sensitive skin in mind`,
      'Free from BPA, phthalates and harsh dyes',
      'Easy to clean and built to be passed down',
      'Tested to meet child safety standards',
    ],
    description: (p) =>
      `${p.brand} makes thoughtful essentials for the early years, and the ${p.name} is a parent favourite. It's made from gentle, non-toxic materials and designed to make busy days a little easier.\n\nAlways supervise young children during use. Check the label for age guidance.`,
    specs: () => [
      ['Age', '0-3 years'],
      ['Material', 'Non-toxic'],
      ['BPA-free', 'Yes'],
      ['Care', 'Machine washable'],
    ],
  },
  'sporting-goods': {
    highlights: (p) => [
      `${p.name} is built for training and game day`,
      'Durable construction tested by athletes',
      'Lightweight design that will not slow you down',
      'Suitable for beginners and seasoned players',
    ],
    description: (p) =>
      `The ${p.name} from ${p.brand} is made to keep up with you, whether you're on court, on the trail or in the gym. It's tested by athletes and built from materials that hold up to hard use.\n\nWipe clean after use and store out of direct sunlight to extend its life.`,
    specs: () => [
      ['Level', 'All levels'],
      ['Use', 'Indoor and outdoor'],
      ['Weight', 'Lightweight'],
      ['Warranty', '1 year'],
    ],
  },
  'food-drinks': {
    highlights: (p) => [
      `${p.name} is made in small batches for full flavour`,
      'Simple ingredients you can pronounce',
      'No artificial preservatives or flavours',
      'Great for gifting or keeping in the pantry',
    ],
    description: (p) =>
      `${p.brand} sources ingredients from small producers and makes everything in small batches. The ${p.name} is one of their most loved products, and a pantry staple for good reason.\n\nStore in a cool, dry place and enjoy within the best-by date printed on the pack.`,
    specs: () => [
      ['Dietary', 'Vegetarian'],
      ['Preservatives', 'None'],
      ['Storage', 'Cool, dry place'],
      ['Origin', 'Small batch'],
    ],
  },
  'toys-games': {
    highlights: (p) => [
      `${p.name} encourages creative, open-ended play`,
      'Made from sustainably sourced, child-safe materials',
      'Built to survive years of enthusiastic play',
      'Tested to meet toy safety standards',
    ],
    description: (p) =>
      `The ${p.name} from ${p.brand} is designed to grow with your child, keeping them curious and busy without a screen in sight. It's made from durable, child-safe materials and finished with non-toxic paints.\n\nNot suitable for children under 3 years due to small parts, unless stated otherwise.`,
    specs: () => [
      ['Age', '3+ years'],
      ['Material', 'Wood and non-toxic paint'],
      ['Batteries', 'Not required'],
      ['Safety', 'Tested to toy standards'],
    ],
  },
  'pet-supplies': {
    highlights: (p) => [
      `${p.name} is designed with comfort and safety in mind`,
      'Pet-safe, non-toxic materials',
      'Easy to clean and built to last',
      'Loved by dogs and cats alike',
    ],
    description: (p) =>
      `${p.brand} makes everyday essentials for pets and the people who love them. The ${p.name} is made from pet-safe materials and designed to stand up to daily use.\n\nSupervise pets with new products at first, and replace if damaged.`,
    specs: () => [
      ['Pet type', 'Dogs and cats'],
      ['Material', 'Pet-safe'],
      ['Care', 'Easy to clean'],
      ['Warranty', '6 months'],
    ],
  },
}

const reviewPool = [
  { rating: 5, body: 'Exactly as pictured and arrived quickly. Really happy with it.' },
  { rating: 5, body: 'Great quality for the price. I would buy this again.' },
  { rating: 4, body: 'Really nice, just took a little longer to arrive than I hoped.' },
  { rating: 5, body: 'Bought this as a gift and it went down a treat.' },
  { rating: 1, body: 'Not what I expected, sadly. Returning it.' },
  { rating: 5, body: 'I use it every day. Five stars.' },
  { rating: 4, body: 'Good value. The packaging could be better but the product is great.' },
  { rating: 3, body: 'It is fine. Does the job, nothing special.' },
  { rating: 5, body: 'Second time ordering. Still love it.' },
]
const reviewers = ['Jordan', 'Austin', 'Priya', 'Thandi', 'Sam', 'Lerato', 'Chris', 'Mia', 'Noah']
const avatarColors = ['bg-pink-400', 'bg-green-400', 'bg-sky-400', 'bg-amber-400', 'bg-violet-400']

const reviewsFor = (product) => {
  const count = product.reviews ?? 0
  if (!count) return { average: 0, count: 0, distribution: [], items: [] }

  // Share of 5★ rises with the average; the rest is split across 4★ to 1★.
  const five = Math.min(0.95, Math.max(0.3, (product.rating - 3) / 2))
  const rest = 1 - five
  const distribution = [five, rest * 0.55, rest * 0.2, rest * 0.1, rest * 0.15].map((share, i) => ({
    stars: 5 - i,
    share,
  }))

  // Up to six sample reviews, oldest last.
  const seed = hash(product.slug)
  const items = Array.from({ length: Math.min(6, count) }, (_, i) => {
    const review = reviewPool[(seed + i * 4) % reviewPool.length]
    const date = new Date(Date.UTC(2026, 9, 20) - (i * 9 + (seed % 7)) * 86400000)
    return {
      id: i,
      ...review,
      name: reviewers[(seed + i) % reviewers.length],
      color: avatarColors[(seed + i) % avatarColors.length],
      date: date.toISOString().slice(0, 10),
    }
  })

  return { average: product.rating, count, distribution, items }
}

export const productDetails = ({ product, category }) => {
  const copy = templates[category?.slug] ?? templates.home
  return {
    sizes: sizesFor(product, category),
    highlights: copy.highlights(product),
    description: copy.description(product),
    specs: copy.specs(product).map(([label, value]) => ({ label, value })),
    reviews: reviewsFor(product),
  }
}
