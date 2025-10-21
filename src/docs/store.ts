import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  getters: {
    isLocalhost: () => window.location.hostname === 'localhost'
  }
})
