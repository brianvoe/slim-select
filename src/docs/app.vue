<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect, { debounce, Settings } from '../slim-select'

export default defineComponent({
  name: 'App',
  data() {
    return {
      nav: null as SlimSelect | null,
      navDebounce: debounce(() => {
        this.setDemensions()
      }, 100),
      year: new Date().getFullYear(),
      width: 0,
      height: 0,

      navData: [
        { text: 'Home', value: '/' },

        // Install
        { text: 'Install', value: 'install' },
        { text: 'npm', value: 'install#npm', class: 'mar-l-l' },
        { text: 'cdn', value: 'install#cdn', class: 'mar-l-l' },
        { text: 'download', value: 'install#download', class: 'mar-l-l' },

        // Select
        { text: 'Selects', value: 'selects' },
        { text: 'single', value: 'selects#single', class: 'mar-l-l' },
        { text: 'multiple', value: 'selects#multiple', class: 'mar-l-l' },

        // Data
        { text: 'Data', value: 'data' },
        { text: 'types', value: 'data#types', class: 'mar-l-l' },
        { text: 'field', value: 'data#field', class: 'mar-l-l' },

        // Settings
        { text: 'Settings', value: 'settings' },

        // Events
        { text: 'Events', value: 'events' },

        // Methods
        { text: 'Methods', value: 'methods' },
      ],
    }
  },
  mounted() {
    this.runNav()

    this.$router.isReady().then(() => {
      if (this.nav) {
        this.nav.setSelected(this.$router.currentRoute.value.fullPath.replace('/', ''))
      }
    })

    this.$router.afterEach(() => {
      // After route change get the hash and scroll to element in main
      setTimeout(() => {
        const hash = this.$route.hash
        if (hash) {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
            })
          }
        }
      }, 100)
    })

    this.setDemensions()
    window.addEventListener('resize', this.navDebounce)
  },
  unmounted() {
    window.removeEventListener('resize', this.navDebounce)
  },
  watch: {
    width() {
      this.runNav()
    },
  },
  methods: {
    setDemensions(): void {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
    },
    runNav() {
      if (this.nav) {
        this.nav.destroy()
        this.nav = null
      }

      let settings = {
        searchHighlight: true,
      } as Partial<Settings>

      if (this.width > 700) {
        settings.alwaysOpen = true
        settings.contentLocation = this.$refs.navContent as HTMLDivElement
      }

      this.nav = new SlimSelect({
        select: this.$refs.nav as HTMLSelectElement,
        data: this.navData,
        settings: settings,
        events: {
          afterChange: (newVal) => {
            const value = newVal[0].value
            const split = value.split('#')
            const val = split[0]
            const hash = split[1] ? '#' + split[1] : undefined
            this.$router.push({ path: val, hash: hash })
          },
        },
      })
    },
  },
})
</script>

<template>
  <header>
    <div class="text">
      <h1 class="logo">Slim Select</h1>
      <div class="tagline">Advanced select dropdown</div>
    </div>
    <div class="socials">
      <a href="https://github.com/brianvoe/slim-select" target="_blank">
        <img src="./images/github.png" />
      </a>
      <a href="https://www.npmjs.com/package/slim-select" target="_blank">
        <img src="./images/npm.png" />
      </a>
    </div>
  </header>
  <nav>
    <select ref="nav" class="bold"></select>
    <div class="navContent" ref="navContent"></div>
  </nav>
  <main>
    <router-view />
    <footer>
      © {{ year }} <a href="http://webiswhatido.com" style="color: #ffffff" target="_blank">Brian Voelker</a>.
      <br />
      Slim Select is under the MIT license.
    </footer>
  </main>
</template>
