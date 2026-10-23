// Each check returns an error message, or '' when the value is fine.

export const MIN_PASSWORD_LENGTH = 8

export const checkEmail = (email) => {
  if (!email.trim()) return 'Enter your email address'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address'
  return ''
}

export const checkPassword = (password) => {
  if (!password) return 'Enter a password'
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters`
  }
  return ''
}
