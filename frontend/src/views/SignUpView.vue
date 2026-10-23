<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import FormField from '@/components/FormField.vue'
import { useAuthStore } from '@/stores/auth'
import { MIN_PASSWORD_LENGTH, checkEmail, checkPassword } from '@/utils/validation'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const submitted = ref(false)
const loading = ref(false)

// Errors show after the first submit, then update as the user types.
const errors = computed(() => {
  if (!submitted.value) return {}
  return {
    name: name.value.trim() ? '' : 'Enter your name',
    email: checkEmail(email.value),
    password: checkPassword(password.value),
    confirm: !confirm.value
      ? 'Confirm your password'
      : confirm.value !== password.value
        ? "Passwords don't match"
        : '',
  }
})

const submit = async () => {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) return
  loading.value = true
  try {
    await auth.signUp({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
    })
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthCard title="Create an account" subtitle="Save your cart, track orders and get deals.">
    <form class="space-y-5" novalidate @submit.prevent="submit">
      <FormField v-model="name" label="Full name" autocomplete="name" :error="errors.name" />
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
        autocomplete="new-password"
        :hint="`At least ${MIN_PASSWORD_LENGTH} characters`"
        :error="errors.password"
      />
      <FormField
        v-model="confirm"
        label="Confirm password"
        type="password"
        autocomplete="new-password"
        :error="errors.confirm"
      />

      <button
        type="submit"
        :disabled="loading"
        class="block h-12 w-full rounded-full bg-[#5433eb] font-semibold text-white transition-colors hover:bg-[#4526d9] disabled:opacity-60"
      >
        {{ loading ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <template #footer>
      Already have an account?
      <RouterLink to="/sign-in" class="font-semibold text-[#5433eb] hover:underline">
        Sign in
      </RouterLink>
    </template>
  </AuthCard>
</template>
