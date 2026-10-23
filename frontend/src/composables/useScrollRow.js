import { onMounted, onUnmounted, ref } from 'vue'

// Tracks whether a horizontally scrolling row can move left/right,
// and scrolls it by most of its visible width.
export function useScrollRow() {
  const track = ref(null)
  const canPrev = ref(false)
  const canNext = ref(false)

  const update = () => {
    const el = track.value
    if (!el) return
    canPrev.value = el.scrollLeft > 4
    canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
  }

  const scroll = (direction) => {
    const el = track.value
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })
  onUnmounted(() => window.removeEventListener('resize', update))

  return { track, canPrev, canNext, update, scroll }
}
