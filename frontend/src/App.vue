<script setup>
import { RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import AppNav from './components/AppNav.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
    <AppNav />
    <RouterView />
    <AppFooter />
  </div>
</template>
