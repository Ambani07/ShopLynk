<script setup>
import { RouterLink } from 'vue-router'
import { browseCategories } from '@/data/explore'
</script>

<template>
  <section class="mx-auto max-w-[110rem] px-4 pb-16 md:px-10" aria-labelledby="browse-heading">
    <h2 id="browse-heading" class="text-xl font-bold tracking-tight text-gray-900">
      Browse categories
    </h2>

    <ul class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <li v-for="category in browseCategories" :key="category.slug">
        <RouterLink
          :to="`/categories/${category.slug}`"
          :class="['group block rounded-3xl p-4 transition hover:brightness-110', category.color]"
        >
          <h3 class="text-base font-semibold text-white">{{ category.name }}</h3>

          <div class="mt-3 grid grid-cols-2 gap-3">
            <div
              v-for="(product, i) in category.products"
              :key="i"
              class="relative aspect-square overflow-hidden rounded-2xl bg-gray-50"
            >
              <img
                v-if="product.image"
                :src="product.image"
                alt=""
                class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <svg
                v-else
                viewBox="0 0 24 24"
                class="absolute inset-[22%] text-gray-300 transition-transform duration-500 group-hover:scale-105"
                fill="currentColor"
                fill-rule="evenodd"
                aria-hidden="true"
              >
                <path :d="product.icon" />
              </svg>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
