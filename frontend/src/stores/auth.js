import { ref } from 'vue'
import { defineStore } from 'pinia'

// Placeholder auth: there is no backend yet, so these calls only simulate a request.
// Swap the bodies for real API calls when one exists.
const fakeRequest = () => new Promise((resolve) => setTimeout(resolve, 600))

const nameFromEmail = (email) => {
  const local = email.split('@')[0]
  return local.charAt(0).toUpperCase() + local.slice(1)
}

export const useAuthStore = defineStore('auth', () => {
  // { name, email } once signed in
  const user = ref(null)

  const signIn = async ({ email }) => {
    await fakeRequest()
    user.value = { name: nameFromEmail(email), email }
  }

  const signUp = async ({ name, email }) => {
    await fakeRequest()
    user.value = { name, email }
  }

  const requestPasswordReset = async () => {
    await fakeRequest()
  }

  const signOut = () => {
    user.value = null
  }

  return { user, signIn, signUp, requestPasswordReset, signOut }
})
