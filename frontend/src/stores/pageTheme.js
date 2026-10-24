import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// A page-wide background colour that the header, mobile tab bar and footer follow.
// Brand pages set it while they are open; everywhere else it is null (default look).
export const usePageThemeStore = defineStore('pageTheme', () => {
  const background = ref(null)
  const isDark = computed(() => background.value !== null)

  // Picks the light-page or brand-colour version of a class list.
  const tone = (light, dark) => (isDark.value ? dark : light)

  const set = (color) => {
    background.value = color ?? null
  }
  const clear = () => set(null)

  return { background, isDark, tone, set, clear }
})
