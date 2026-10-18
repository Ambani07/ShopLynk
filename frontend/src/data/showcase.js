// Sample content for the home page showcase.
// Set `image` on any product or brand to show a real photo instead of the illustration.

export const products = [
  {
    name: 'Vitamin C Serum',
    reviews: '2.1k',
    background: 'from-amber-50 to-orange-100',
    art: { variant: 'dropper', body: '#f59e0b', cap: '#292524', label: '#9a3412' },
  },
  {
    name: 'Day Dew Sunscreen',
    reviews: '1.4k',
    background: 'from-rose-50 to-stone-200',
    art: { variant: 'tube', body: '#fce7f3', cap: '#f9a8d4', label: '#be185d' },
  },
  {
    name: 'Dynasty Cream',
    reviews: '5.6k',
    background: 'from-stone-50 to-neutral-200',
    art: { variant: 'jar', body: '#ffffff', cap: '#f5f5f4', label: '#a8a29e' },
  },
  {
    name: 'Santal Eau de Parfum',
    reviews: '980',
    background: 'from-sky-50 to-slate-200',
    art: { variant: 'perfume', body: '#bae6fd', cap: '#111827', label: '#0f172a' },
  },
  {
    name: 'Retinol Night Serum',
    reviews: '3.2k',
    background: 'from-violet-50 to-purple-100',
    art: { variant: 'dropper', body: '#7c3aed', cap: '#f5f5f4', label: '#4c1d95' },
  },
  {
    name: 'Sage Body Wash',
    reviews: '1.9k',
    background: 'from-lime-50 to-emerald-100',
    art: { variant: 'pump', body: '#bbf7d0', cap: '#166534', label: '#14532d' },
  },
  {
    name: 'Tinted Lip Balm SPF',
    reviews: '7.4k',
    background: 'from-orange-50 to-red-100',
    art: { variant: 'tube', body: '#fb7185', cap: '#ffe4e6', label: '#ffffff' },
  },
  {
    name: 'Whipped Body Butter',
    reviews: '4.0k',
    background: 'from-yellow-50 to-amber-100',
    art: { variant: 'jar', body: '#fde68a', cap: '#b45309', label: '#92400e' },
  },
  {
    name: 'Neroli Mist',
    reviews: '650',
    background: 'from-emerald-50 to-teal-100',
    art: { variant: 'perfume', body: '#a7f3d0', cap: '#d4a017', label: '#065f46' },
  },
  {
    name: 'Argan Hair Oil',
    reviews: '2.8k',
    background: 'from-amber-50 to-yellow-100',
    art: { variant: 'dropper', body: '#d97706', cap: '#78350f', label: '#451a03' },
  },
  {
    name: 'Charcoal Cleanser',
    reviews: '1.1k',
    background: 'from-gray-50 to-zinc-200',
    art: { variant: 'pump', body: '#3f3f46', cap: '#18181b', label: '#e4e4e7' },
  },
  {
    name: 'Mint Hand Cream',
    reviews: '3.5k',
    background: 'from-teal-50 to-cyan-100',
    art: { variant: 'tube', body: '#99f6e4', cap: '#0f766e', label: '#134e4a' },
  },
]

export const brands = [
  {
    name: 'Bloom',
    background: 'from-pink-400 to-rose-700',
    art: { variant: 'jar', body: '#fbcfe8', cap: '#9d174d', label: '#9d174d' },
  },
  {
    name: 'Salt & Stone',
    background: 'from-amber-700 to-orange-900',
    art: { variant: 'pump', body: '#e7d7b8', cap: '#14532d', label: '#78350f' },
  },
  {
    name: 'Verde',
    background: 'from-emerald-500 to-green-800',
    art: { variant: 'dropper', body: '#d9f99d', cap: '#14532d', label: '#365314' },
  },
  {
    name: 'Lumière',
    background: 'from-indigo-400 to-violet-700',
    art: { variant: 'perfume', body: '#e0e7ff', cap: '#facc15', label: '#3730a3' },
  },
  {
    name: 'Nordic',
    background: 'from-slate-500 to-slate-800',
    art: { variant: 'tube', body: '#f1f5f9', cap: '#0f172a', label: '#334155' },
  },
  {
    name: 'Coastal',
    background: 'from-sky-400 to-cyan-700',
    art: { variant: 'jar', body: '#ecfeff', cap: '#0e7490', label: '#155e75' },
  },
]

// Each set fills the centre panel: large, small, large.
export const featureSets = [
  [
    { variant: 'jar', body: '#fbd5c5', cap: '#ffffff', label: '#9a3412' },
    { variant: 'perfume', body: '#f5f5f4', cap: '#1c1917', label: '#44403c' },
    { variant: 'pump', body: '#e7d7b8', cap: '#14532d', label: '#78350f' },
  ],
  [
    { variant: 'pump', body: '#bbf7d0', cap: '#166534', label: '#14532d' },
    { variant: 'dropper', body: '#7c3aed', cap: '#f5f5f4', label: '#4c1d95' },
    { variant: 'jar', body: '#fde68a', cap: '#b45309', label: '#92400e' },
  ],
  [
    { variant: 'perfume', body: '#bae6fd', cap: '#111827', label: '#0f172a' },
    { variant: 'tube', body: '#fb7185', cap: '#ffe4e6', label: '#ffffff' },
    { variant: 'pump', body: '#3f3f46', cap: '#18181b', label: '#e4e4e7' },
  ],
]
