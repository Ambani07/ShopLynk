<script setup>
import StoryCard from './StoryCard.vue'
import { stories } from '@/data/explore'
</script>

<template>
  <section class="mx-auto max-w-[110rem] pt-8 pb-6" aria-labelledby="explore-heading">
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
        <StoryCard :story="story" />
      </li>
    </ul>
  </section>
</template>
