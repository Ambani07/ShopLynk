// Category page content, keyed by the Browse categories slug (data/explore.js):
// the subcategory chips and two editorial stories. Story titles are placeholders.
// Subcategory slugs match the links on the home page category grid (data/categories.js).
import { icons } from './categories'

export const categoryPages = {
  beauty: {
    subcategories: [
      { slug: 'makeup', name: 'Makeup', icon: icons.tube, color: 'bg-rose-500' },
      { slug: 'lotion', name: 'Lotion & moisturizer', icon: icons.jar, color: 'bg-emerald-600' },
      { slug: 'anti-aging', name: 'Anti-aging', icon: icons.dropper, color: 'bg-blue-600' },
      { slug: 'bath-body', name: 'Bath & body', icon: icons.bottle, color: 'bg-lime-600' },
      { slug: 'hair-styling', name: 'Hair styling', icon: icons.can, color: 'bg-blue-800' },
      { slug: 'perfume', name: 'Perfume & cologne', icon: icons.perfume, color: 'bg-stone-400' },
    ],
    stories: [
      {
        slug: 'korean-beauty-edit',
        title: 'The Korean Beauty Edit',
        description: 'Shop cult favourites from serums to SPF.',
        background: 'from-pink-200 via-rose-300 to-rose-400',
        art: [icons.tube, icons.dropper, icons.jar, icons.perfume],
      },
      {
        slug: 'fragrance-for-fall',
        title: 'Fragrance for fall',
        description: 'Warm amber, smoky woods and soft vanilla.',
        background: 'from-amber-700 via-orange-800 to-stone-800',
        art: [icons.perfume],
      },
    ],
  },
  women: {
    subcategories: [
      { slug: 'dresses', name: 'Dresses', icon: icons.dress, color: 'bg-slate-500' },
      { slug: 'shirts', name: 'Shirts & tops', icon: icons.shirt, color: 'bg-stone-400' },
      { slug: 'pants', name: 'Pants', icon: icons.pants, color: 'bg-sky-400' },
      { slug: 'hoodies', name: 'Hoodies & sweats', icon: icons.hoodie, color: 'bg-violet-500' },
      { slug: 'sneakers', name: 'Sneakers', icon: icons.sneaker, color: 'bg-red-700' },
    ],
    stories: [
      {
        slug: 'autumn-workwear-edit',
        title: 'The Autumn Workwear Edit',
        description: 'Corporate or creative, consider your 9-to-5 handled.',
        background: 'from-amber-800 via-stone-700 to-violet-900',
        art: [icons.shirt, icons.dress, icons.pants],
      },
      {
        slug: 'denim-guide',
        title: 'Find your fit: denim',
        description: 'Wide leg, straight or barrel, made simple.',
        background: 'from-sky-300 via-blue-500 to-blue-800',
        art: [icons.pants],
      },
    ],
  },
  men: {
    subcategories: [
      { slug: 'shirts', name: 'Shirts', icon: icons.shirt, color: 'bg-stone-500' },
      { slug: 't-shirts', name: 'T-shirts', icon: icons.tshirt, color: 'bg-rose-900' },
      { slug: 'pants', name: 'Pants', icon: icons.pants, color: 'bg-orange-700' },
      { slug: 'hoodies', name: 'Hoodies', icon: icons.hoodie, color: 'bg-zinc-500' },
      { slug: 'shorts', name: 'Shorts', icon: icons.shorts, color: 'bg-amber-600' },
      { slug: 'sneakers', name: 'Sneakers', icon: icons.sneaker, color: 'bg-neutral-700' },
    ],
    stories: [
      {
        slug: 'layering-season',
        title: 'Layering season',
        description: 'Overshirts, flannels and heavyweight tees.',
        background: 'from-green-700 via-emerald-800 to-stone-900',
        art: [icons.shirt, icons.hoodie, icons.tshirt],
      },
      {
        slug: 'brand-spotlight-salt-and-stone',
        title: 'Brand Spotlight: Salt & Stone',
        background: 'from-sky-300 via-slate-500 to-slate-700',
        art: [icons.sneaker],
      },
    ],
  },
  home: {
    subcategories: [
      { slug: 'kitchen-dining', name: 'Kitchen & dining', icon: icons.pan, color: 'bg-red-400' },
      { slug: 'decor', name: 'Decor', icon: icons.vase, color: 'bg-red-600' },
      { slug: 'blankets', name: 'Bedding', icon: icons.blanket, color: 'bg-amber-500' },
      { slug: 'rugs', name: 'Rugs', icon: icons.rug, color: 'bg-red-800' },
      {
        slug: 'home-fragrances',
        name: 'Home fragrances',
        icon: icons.candle,
        color: 'bg-rose-300',
      },
      { slug: 'appliances', name: 'Household appliances', icon: icons.kettle, color: 'bg-red-900' },
      { slug: 'lighting', name: 'Lighting', icon: icons.lamp, color: 'bg-amber-400' },
      { slug: 'furniture', name: 'Furniture', icon: icons.chair, color: 'bg-stone-700' },
    ],
    stories: [
      {
        slug: 'brand-spotlight-hearth-and-co',
        title: 'Brand spotlight: Hearth & Co',
        description: 'Stock your kitchen with restaurant-quality cookware.',
        background: 'from-stone-300 via-stone-500 to-stone-700',
        art: [icons.pan, icons.kettle],
      },
      {
        slug: 'dining-table-elevated',
        title: 'Dining table, elevated',
        description: 'Table lamps, serveware, and textured linens',
        background: 'from-teal-300 via-teal-600 to-slate-700',
        art: [icons.vase, icons.lamp, icons.cup],
      },
    ],
  },
  'fitness-nutrition': {
    subcategories: [
      {
        slug: 'exercise-equipment',
        name: 'Exercise equipment',
        icon: icons.dumbbell,
        color: 'bg-orange-600',
      },
      { slug: 'supplements', name: 'Supplements', icon: icons.jar, color: 'bg-purple-800' },
      { slug: 'vitamins', name: 'Vitamins', icon: icons.pill, color: 'bg-green-700' },
      { slug: 'drinks-shakes', name: 'Drinks & shakes', icon: icons.shaker, color: 'bg-amber-800' },
      { slug: 'activewear', name: 'Activewear', icon: icons.shorts, color: 'bg-gray-700' },
    ],
    stories: [
      {
        slug: 'home-gym-basics',
        title: 'Home gym basics',
        description: 'Everything you need for a strong start.',
        background: 'from-orange-400 via-red-500 to-rose-700',
        art: [icons.dumbbell, icons.kettlebell],
      },
      {
        slug: 'fuel-your-workout',
        title: 'Fuel your workout',
        description: 'Protein, electrolytes and recovery picks.',
        background: 'from-lime-300 via-green-500 to-emerald-700',
        art: [icons.shaker, icons.jar, icons.pill],
      },
    ],
  },
  'baby-toddler': {
    subcategories: [
      { slug: 'clothing', name: 'Clothing', icon: icons.onesie, color: 'bg-sky-400' },
      { slug: 'feeding', name: 'Feeding', icon: icons.bottle, color: 'bg-amber-500' },
      { slug: 'toys', name: 'Toys', icon: icons.block, color: 'bg-teal-600' },
      { slug: 'strollers', name: 'Strollers', icon: icons.stroller, color: 'bg-indigo-500' },
      { slug: 'nursery', name: 'Nursery', icon: icons.blanket, color: 'bg-pink-400' },
    ],
    stories: [
      {
        slug: 'new-parent-checklist',
        title: 'The new parent checklist',
        description: 'Tried-and-tested essentials for the first year.',
        background: 'from-emerald-200 via-teal-400 to-teal-600',
        art: [icons.onesie, icons.bottle, icons.stroller],
      },
      {
        slug: 'cozy-nursery',
        title: 'A cozy nursery',
        description: 'Soft swaddles, sleepers and calm colours.',
        background: 'from-pink-200 via-rose-300 to-amber-300',
        art: [icons.blanket, icons.bear],
      },
    ],
  },
  'sporting-goods': {
    subcategories: [
      { slug: 'racket-sports', name: 'Racket sports', icon: icons.racket, color: 'bg-violet-600' },
      { slug: 'strength', name: 'Strength training', icon: icons.kettlebell, color: 'bg-gray-700' },
      { slug: 'running', name: 'Running', icon: icons.sneaker, color: 'bg-orange-500' },
      { slug: 'hydration', name: 'Hydration', icon: icons.bottle, color: 'bg-teal-600' },
    ],
    stories: [
      {
        slug: 'pickleball-starter',
        title: 'Pickleball, starter kit',
        description: 'Paddles, balls and court-ready shoes.',
        background: 'from-lime-300 via-lime-500 to-green-700',
        art: [icons.racket],
      },
      {
        slug: 'trail-season',
        title: 'Trail season',
        description: 'Grippy shoes and light layers for the long run.',
        background: 'from-amber-400 via-orange-600 to-stone-800',
        art: [icons.sneaker, icons.bottle],
      },
    ],
  },
  'food-drinks': {
    subcategories: [
      { slug: 'snacks', name: 'Snacks', icon: icons.snack, color: 'bg-yellow-500' },
      { slug: 'coffee-tea', name: 'Coffee & tea', icon: icons.cup, color: 'bg-yellow-900' },
      { slug: 'pantry', name: 'Pantry', icon: icons.sauce, color: 'bg-lime-700' },
      { slug: 'drinks', name: 'Drinks', icon: icons.soda, color: 'bg-fuchsia-700' },
    ],
    stories: [
      {
        slug: 'pantry-upgrades',
        title: 'Pantry upgrades',
        description: 'Small-batch oils, chili crisps and hot sauces.',
        background: 'from-orange-300 via-red-500 to-red-800',
        art: [icons.sauce, icons.jar],
      },
      {
        slug: 'better-morning-coffee',
        title: 'A better morning coffee',
        description: 'Cold brew, matcha and everything in between.',
        background: 'from-amber-300 via-amber-700 to-stone-900',
        art: [icons.cup, icons.kettle],
      },
    ],
  },
  'toys-games': {
    subcategories: [
      { slug: 'learning', name: 'Learning toys', icon: icons.block, color: 'bg-sky-500' },
      { slug: 'plush', name: 'Plush', icon: icons.bear, color: 'bg-amber-500' },
      { slug: 'building', name: 'Building sets', icon: icons.block, color: 'bg-violet-600' },
      { slug: 'pretend-play', name: 'Pretend play', icon: icons.pan, color: 'bg-rose-500' },
      { slug: 'games', name: 'Games', icon: icons.dice, color: 'bg-green-700' },
    ],
    stories: [
      {
        slug: 'screen-free-fun',
        title: 'Screen-free fun',
        description: 'Toys that keep little hands busy for hours.',
        background: 'from-yellow-200 via-amber-400 to-orange-500',
        art: [icons.block, icons.bear],
      },
      {
        slug: 'family-game-night',
        title: 'Family game night',
        description: 'Easy to learn, hard to put down.',
        background: 'from-green-400 via-emerald-600 to-teal-800',
        art: [icons.dice],
      },
    ],
  },
  'pet-supplies': {
    subcategories: [
      { slug: 'feeding', name: 'Bowls & feeding', icon: icons.bowl, color: 'bg-stone-500' },
      { slug: 'beds', name: 'Beds & blankets', icon: icons.paw, color: 'bg-gray-600' },
      { slug: 'treats', name: 'Treats', icon: icons.jar, color: 'bg-amber-600' },
      { slug: 'toys', name: 'Toys', icon: icons.bear, color: 'bg-sky-500' },
    ],
    stories: [
      {
        slug: 'new-puppy-essentials',
        title: 'New puppy essentials',
        description: 'Beds, bowls and chews for day one.',
        background: 'from-orange-200 via-amber-400 to-amber-700',
        art: [icons.paw, icons.bowl],
      },
      {
        slug: 'calm-and-cozy-pets',
        title: 'Calm and cozy',
        description: 'Donut beds and blankets they will not leave.',
        background: 'from-stone-300 via-stone-500 to-stone-700',
        art: [icons.paw],
      },
    ],
  },
}
