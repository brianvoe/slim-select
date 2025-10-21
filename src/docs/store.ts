import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    width: window.innerWidth
  }),
  actions: {
    setWidth(width: number) {
      this.width = width
    }
  },
  getters: {
    isLocalhost: () => window.location.hostname === 'localhost',
    isMobile: (state) => state.width < 768
  }
})
