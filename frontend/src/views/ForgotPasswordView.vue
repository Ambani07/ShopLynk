<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import FormField from '@/components/FormField.vue'
import { useAuthStore } from '@/stores/auth'
import { checkEmail } from '@/utils/validation'

const auth = useAuthStore()

const email = ref('')
const submitted = ref(false)
const loading = ref(false)
const sentTo = ref('')

const error = computed(() => (submitted.value ? checkEmail(email.value) : ''))

const submit = async () => {
  submitted.value = true
  if (error.value) return
  loading.value = true
  try {
    await auth.requestPasswordReset({ email: email.value.trim() })
    sentTo.value = email.value.trim()
  } finally {
    loading.value = false
  }
}

const tryAgain = () => {
  sentTo.value = ''
  submitted.value = false
}
</script>

<template>
  <AuthCard
    v-if="sentTo"
    title="Check your email"
    subtitle="If an account exists for that address, we've sent a link to reset your password."
  >
    <div class="rounded-2xl bg-gray-50 px-4 py-3 text-center text-sm text-gray-700" role="status">
      Sent to <span class="font-semibold text-gray-900">{{ sentTo }}</span>
    </div>
    <RouterLink
      to="/sign-in"
      class="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#5433eb] font-semibold text-white transition-colors hover:bg-[#4526d9]"
    >
      Back to sign in
    </RouterLink>

    <template #footer>
      Didn't get it?
      <button type="button" class="font-semibold text-[#5433eb] hover:underline" @click="tryAgain">
        Try another email
      </button>
    </template>
  </AuthCard>

  <AuthCard
    v-else
    title="Forgot password?"
    subtitle="Enter your email and we'll send you a link to reset it."
  >
    <form class="space-y-5" novalidate @submit.prevent="submit">
      <FormField v-model="email" label="Email" type="email" autocomplete="email" :error="error" />

      <button
        type="submit"
        :disabled="loading"
        class="block h-12 w-full rounded-full bg-[#5433eb] font-semibold text-white transition-colors hover:bg-[#4526d9] disabled:opacity-60"
      >
        {{ loading ? 'Sending…' : 'Send reset link' }}
      </button>
    </form>

    <template #footer>
      Remembered it?
      <RouterLink to="/sign-in" class="font-semibold text-[#5433eb] hover:underline">
        Back to sign in
      </RouterLink>
    </template>
  </AuthCard>
</template>
