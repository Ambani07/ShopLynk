<script setup>
import { RouterLink } from 'vue-router'

// Most of these pages don't exist yet; `href` marks external links.
const columns = [
  {
    title: 'Learn more',
    links: [
      { label: 'What is SupLynk?', to: '/about' },
      { label: 'Why trust SupLynk?', to: '/trust' },
      { label: 'Help center', to: '/help' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'For brands', to: '/brands' },
      { label: 'For creators', to: '/creators' },
      { label: 'Build your store', to: '/sell' },
    ],
  },
  {
    title: 'Social',
    links: [{ label: 'Instagram', href: 'https://www.instagram.com/' }],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Your Privacy Choices', to: '/privacy/choices' },
    ],
  },
]

// Placeholder store links until the apps are published.
const stores = [
  {
    label: 'App Store',
    caption: 'Download on the',
    href: '#',
    icon: 'M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4z',
  },
  {
    label: 'Google Play',
    caption: 'Get it on',
    href: '#',
    icon: 'M4 2.5v19c0 .4.4.6.7.4l10.6-9.5L4.7 2.1c-.3-.2-.7 0-.7.4zM16.6 13.6l-2.2-1.2L5.8 21.6l10.8-8zM16.6 10.4L5.8 2.4l8.6 9.2 2.2-1.2zM18 11.2l-1.6.9-2 .9 2 1.1 1.6.9c.6-.4 2-1.1 2-1.9 0-.8-1.4-1.5-2-1.9z',
  },
]
</script>

<template>
  <footer class="border-t border-gray-200 bg-canvas">
    <div
      class="mx-auto flex max-w-[110rem] flex-col gap-12 px-4 py-12 md:flex-row md:justify-between md:px-10 md:py-10"
    >
      <div class="flex flex-col gap-10 md:justify-between">
        <div>
          <div class="flex size-20 items-center justify-center rounded-2xl bg-gray-900 sm:size-24">
            <img src="/suplynk-icon-transparent.png" alt="" class="h-12 w-auto invert" />
          </div>
          <img src="/suplynk-logo-transparent.png" alt="SupLynk" class="mt-6 h-9 w-auto" />
          <p class="mt-3 text-sm text-gray-500">Shopping designed around you.</p>
        </div>

        <div class="flex gap-3">
          <a
            v-for="store in stores"
            :key="store.label"
            :href="store.href"
            class="flex h-10 items-center gap-2 rounded-lg border border-gray-900 px-3 text-gray-900 transition-colors hover:bg-gray-100"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
              <path :d="store.icon" />
            </svg>
            <span class="leading-none">
              <span class="block text-[0.6rem]">{{ store.caption }}</span>
              <span class="block text-sm font-semibold">{{ store.label }}</span>
            </span>
          </a>
        </div>
      </div>

      <nav
        class="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 md:gap-x-16 lg:gap-x-24"
        aria-label="Footer"
      >
        <div v-for="column in columns" :key="column.title">
          <h2 class="text-sm font-semibold text-gray-900">{{ column.title }}</h2>
          <ul class="mt-5 space-y-3.5">
            <li v-for="link in column.links" :key="link.label">
              <a
                v-if="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="text-sm text-gray-700 hover:text-gray-900 hover:underline"
              >
                {{ link.label }}
              </a>
              <RouterLink
                v-else
                :to="link.to"
                class="text-sm text-gray-700 hover:text-gray-900 hover:underline"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </footer>
</template>
