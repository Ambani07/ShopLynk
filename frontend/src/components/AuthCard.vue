<script setup>
// Centred card shared by the sign in, sign up and forgot password pages.
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <main class="flex flex-1 items-start justify-center bg-canvas px-4 pt-10 pb-16 sm:pt-16">
    <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
      <img src="/suplynk-icon-transparent.png" alt="" class="mx-auto h-10 w-auto" />
      <h1 class="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-center text-sm text-gray-500">{{ subtitle }}</p>

      <div class="mt-8">
        <slot />
      </div>

      <div
        v-if="$slots.footer"
        class="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-600"
      >
        <slot name="footer" />
      </div>
    </div>
  </main>
</template>
