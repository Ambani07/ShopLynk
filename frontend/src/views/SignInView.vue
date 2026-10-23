<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import FormField from '@/components/FormField.vue'
import { useAuthStore } from '@/stores/auth'
import { checkEmail } from '@/utils/validation'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const submitted = ref(false)
const loading = ref(false)

// Errors show after the first submit, then update as the user types.
const errors = computed(() =>
  submitted.value
    ? { email: checkEmail(email.value), password: password.value ? '' : 'Enter your password' }
    : {},
)

// Only follow same-site paths, never `//other.site`.
const redirectTo = () => {
  const target = route.query.redirect
  return typeof target === 'string' && target.startsWith('/') && !target.startsWith('//')
    ? target
    : '/'
}

const submit = async () => {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) return
  loading.value = true
  try {
    await auth.signIn({ email: email.value.trim(), password: password.value })
    router.push(redirectTo())
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthCard title="Sign in" subtitle="Welcome back. Sign in to see your cart and orders.">
    <form class="space-y-5" novalidate @submit.prevent="submit">
      <FormField
        v-model="email"
        label="Email"
        type="email"
        autocomplete="email"
        :error="errors.email"
      />
      <FormField
        v-model="password"
        label="Password"
        type="password"
        autocomplete="current-password"
        :error="errors.password"
      >
        <template #label-action>
          <RouterLink
            to="/forgot-password"
            class="text-sm font-semibold text-[#5433eb] hover:underline"
          >
            Forgot password?
          </RouterLink>
        </template>
      </FormField>

      <button
        type="submit"
        :disabled="loading"
        class="block h-12 w-full rounded-full bg-[#5433eb] font-semibold text-white transition-colors hover:bg-[#4526d9] disabled:opacity-60"
      >
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <template #footer>
      New here?
      <RouterLink to="/sign-up" class="font-semibold text-[#5433eb] hover:underline">
        Create an account
      </RouterLink>
    </template>
  </AuthCard>
</template>
