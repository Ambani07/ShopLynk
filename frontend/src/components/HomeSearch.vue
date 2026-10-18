<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

const search = () => {
  const q = query.value.trim()
  if (q) router.push({ path: '/search', query: { q } })
}
</script>

<template>
  <section class="px-4">
    <form
      role="search"
      class="mx-auto flex max-w-xl items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-lg shadow-black/5 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-gray-300"
      @submit.prevent="search"
    >
      <svg
        viewBox="0 0 24 24"
        class="size-5 shrink-0 text-gray-500"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        v-model="query"
        type="search"
        aria-label="Search products"
        placeholder="What are you shopping for today?"
        class="min-w-0 flex-1 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none"
      />
      <button
        type="button"
        aria-label="Search by image"
        title="Search by image"
        class="shrink-0 rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <svg
          viewBox="0 0 24 24"
          class="size-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        >
          <rect x="3" y="5" width="18" height="15" rx="4" />
          <circle cx="12" cy="12.5" r="3.5" />
          <path d="M9 5l1.5-2h3L15 5" />
        </svg>
      </button>
    </form>
  </section>
</template>
