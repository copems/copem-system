import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    user: null, // { first_name, last_name, ... }
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
    userInitials: (state) => {
      if (!state.user) return ''
      const { first_name = '', last_name = '' } = state.user
      const first = first_name.trim()[0] || ''
      const last = last_name.trim()[0] || ''
      return (first + last).toUpperCase()
    },
  },
  actions: {
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    setAuth(user, token) {
      this.user = user
      this.token = token
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    },
    loadAuth() {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      this.user = user ? JSON.parse(user) : null
      this.token = token || null
    },
  },
})
