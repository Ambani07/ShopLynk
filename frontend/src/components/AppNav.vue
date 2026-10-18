<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const items = [
  {
    to: '/',
    label: 'Home',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    to: '/categories',
    label: 'Categories',
    icon: 'M5 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM5 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z',
  },
  {
    to: '/cart',
    label: 'Cart',
    icon: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z',
  },
  {
    to: '/deals',
    label: 'Deals',
    icon: 'M21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z',
  },
  {
    to: '/orders',
    label: 'Orders',
    icon: 'M6 3h12a3 3 0 0 1 3 3v2H3V6a3 3 0 0 1 3-3zM3 10h18v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8zm7 2v2h4v-2h-4z',
  },
]
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-gray-200 bg-neutral-50">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
      <RouterLink to="/" aria-label="SupLynk home" class="shrink-0">
        <img src="/suplynk-icon-transparent.png" alt="" class="h-9 w-auto md:hidden" />
        <img src="/suplynk-logo-transparent.png" alt="" class="hidden h-8 w-auto md:block" />
      </RouterLink>

      <nav class="hidden items-center gap-10 md:flex">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          :aria-label="item.label"
          :title="item.label"
          :class="[
            'transition-colors',
            route.path === item.to ? 'text-black' : 'text-gray-400 hover:text-gray-600',
          ]"
        >
          <svg viewBox="0 0 24 24" class="size-6" fill="currentColor" fill-rule="evenodd">
            <path :d="item.icon" />
          </svg>
        </RouterLink>
      </nav>

      <RouterLink
        to="/sign-in"
        class="flex shrink-0 flex-col items-center gap-0.5 text-xs text-gray-400 transition-colors hover:text-gray-600"
      >
        <svg viewBox="0 0 24 24" class="size-8" fill="currentColor">
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
        <span>Sign in</span>
      </RouterLink>
    </div>
  </header>

  <nav
    class="fixed inset-x-0 bottom-0 z-10 border-t border-gray-200 bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] backdrop-blur md:hidden"
  >
    <ul class="grid h-20 grid-cols-5">
      <li v-for="item in items" :key="item.to">
        <RouterLink
          :to="item.to"
          :aria-label="item.label"
          :class="[
            'flex h-full items-center justify-center transition-colors',
            route.path === item.to ? 'text-black' : 'text-gray-400 active:text-gray-600',
          ]"
        >
          <span
            :class="[
              'flex h-11 w-16 items-center justify-center rounded-full transition-colors',
              route.path === item.to && 'bg-gray-200/70',
            ]"
          >
            <svg viewBox="0 0 24 24" class="size-8" fill="currentColor" fill-rule="evenodd">
              <path :d="item.icon" />
            </svg>
          </span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
