import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('../views/ExploreView.vue'),
    },
    {
      path: '/categories/:slug/:sub?',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: '/products/:slug',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
    },
    {
      // The home page brand carousel links to /brands/…; everything else to /shops/…
      path: '/shops/:slug',
      alias: '/brands/:slug',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/deals',
      name: 'deals',
      component: () => import('../views/DealsView.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignInView.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Leave room for the sticky header when jumping to an anchor like #reviews.
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    // Switching subcategory chips keeps your place on the category page.
    if (to.name === 'category' && from.name === 'category') return false
    return { top: 0 }
  },
})

export default router
