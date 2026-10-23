<script setup>
import { RouterLink } from 'vue-router'
import { stories } from '@/data/explore'

// Placeholder art: icons scattered across the right of the card.
const artPositions = [
  'top-[10%] right-[6%] w-[28%] rotate-[-12deg]',
  'top-[35%] right-[30%] w-[22%] rotate-[10deg]',
  '-top-[5%] right-[48%] w-[20%] rotate-[-4deg]',
  'top-[40%] right-[60%] w-[16%] rotate-[18deg]',
]
</script>

<template>
  <section class="mx-auto max-w-[110rem] pt-8 pb-16" aria-labelledby="explore-heading">
    <h1 id="explore-heading" class="text-center text-3xl font-bold tracking-tight text-gray-900">
      Explore
    </h1>

    <ul
      class="mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:px-10"
    >
      <li
        v-for="story in stories"
        :key="story.slug"
        class="w-[85vw] max-w-md shrink-0 snap-start md:w-auto md:max-w-none"
      >
        <RouterLink
          :to="`/explore/${story.slug}`"
          :class="[
            'group relative block aspect-[7/3] min-h-44 overflow-hidden rounded-3xl bg-gradient-to-br',
            story.background,
          ]"
        >
          <img
            v-if="story.image"
            :src="story.image"
            alt=""
            class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            v-else
            class="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            aria-hidden="true"
          >
            <svg
              v-for="(path, i) in story.art"
              :key="i"
              viewBox="0 0 24 24"
              :class="[
                'absolute text-white/30',
                story.art.length === 1
                  ? 'top-[5%] right-[8%] w-[45%] rotate-[-8deg]'
                  : artPositions[i],
              ]"
              fill="currentColor"
              fill-rule="evenodd"
            >
              <path :d="path" />
            </svg>
          </div>

          <!-- Darken the bottom so the text stays readable over any photo -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          />

          <span
            v-if="story.badge"
            class="absolute top-4 left-5 text-xs font-semibold text-white drop-shadow"
          >
            {{ story.badge }}
          </span>

          <div class="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 text-white">
            <div class="min-w-0">
              <h2 class="text-lg font-bold leading-tight drop-shadow md:text-xl">
                {{ story.title }}
              </h2>
              <p v-if="story.description" class="mt-0.5 truncate text-sm drop-shadow">
                {{ story.description }}
              </p>
            </div>
            <span
              class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/25 backdrop-blur transition group-hover:bg-white/40"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" class="size-5" fill="currentColor">
                <path d="M12 4l-1.4 1.4 5.6 5.6H4v2h12.2l-5.6 5.6L12 20l8-8z" />
              </svg>
            </span>
          </div>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
