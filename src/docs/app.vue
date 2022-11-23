<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../slim-select'
import Settings from '../slim-select/settings'
import { debounce } from '../slim-select/helpers'

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
        { text: 'Home', value: '/', class: 'label' },

        // Install
        { text: 'Install', value: 'install', class: 'label' },
        { text: 'npm', value: 'install#npm', class: 'mar-l-l' },
        { text: 'cdn', value: 'install#cdn', class: 'mar-l-l' },
        { text: 'download', value: 'install#download', class: 'mar-l-l' },

        // Select
        { text: 'Selects', value: 'selects', class: 'label' },
        { text: 'single', value: 'selects#single', class: 'mar-l-l' },
        { text: 'multiple', value: 'selects#multiple', class: 'mar-l-l' },

        // Data
        { text: 'Data', value: 'data', class: 'label' },
        { text: 'types', value: 'data#types', class: 'mar-l-l' },
        { text: 'field', value: 'data#field', class: 'mar-l-l' },

        // Settings
        { text: 'Settings', value: 'settings', class: 'label' },
        { text: 'select', value: 'settings#select', class: 'mar-l-l' },
        { text: 'alwaysOpen', value: 'settings#alwaysOpen', class: 'mar-l-l' },
        { text: 'contentLocation', value: 'settings#contentLocation', class: 'mar-l-l' },
        { text: 'contentPosition', value: 'settings#contentPosition', class: 'mar-l-l' },
        { text: 'openPosition', value: 'settings#openPosition', class: 'mar-l-l' },
        { text: 'placeholder', value: 'settings#placeholder', class: 'mar-l-l' },
        { text: 'allowDeselect', value: 'settings#allowDeselect', class: 'mar-l-l' },
        { text: 'display', value: 'settings#display', class: 'mar-l-l' },
        { text: 'mandatory', value: 'settings#mandatory', class: 'mar-l-l' },
        { text: 'minmax', value: 'settings#minmax', class: 'mar-l-l' },
        { text: 'dataAttributes', value: 'settings#dataAttributes', class: 'mar-l-l' },
        { text: 'cssClass', value: 'settings#cssClass', class: 'mar-l-l' },
        { text: 'inlineStyles', value: 'settings#inlineStyles', class: 'mar-l-l' },
        { text: 'html', value: 'settings#html', class: 'mar-l-l' },
        { text: 'search', value: 'settings#search', class: 'mar-l-l' },
        { text: 'closeOnSelect', value: 'settings#closeOnSelect', class: 'mar-l-l' },
        { text: 'showOptionTooltips', value: 'settings#showOptionTooltips', class: 'mar-l-l' },
        { text: 'selectByGroup', value: 'settings#selectByGroup', class: 'mar-l-l' },
        { text: 'hideSelected', value: 'settings#hideSelected', class: 'mar-l-l' },

        // Events
        { text: 'Events', value: 'events', class: 'label' },
        { text: 'error', value: 'events#error', class: 'mar-l-l' },
        { text: 'beforeChange', value: 'events#beforeChange', class: 'mar-l-l' },
        { text: 'afterChange', value: 'events#afterChange', class: 'mar-l-l' },
        { text: 'open', value: 'events#open', class: 'mar-l-l' },
        { text: 'search', value: 'events#search', class: 'mar-l-l' },
        { text: 'searchFilter', value: 'events#searchFilter', class: 'mar-l-l' },
        { text: 'addable', value: 'events#addable', class: 'mar-l-l' },

        // Methods
        { text: 'Methods', value: 'methods', class: 'label' },
        { text: 'getSelected', value: 'methods#getSelected', class: 'mar-l-l' },
        { text: 'setSelected', value: 'methods#setSelected', class: 'mar-l-l' },
        { text: 'getData', value: 'methods#getData', class: 'mar-l-l' },
        { text: 'setData', value: 'methods#setData', class: 'mar-l-l' },
        { text: 'enableDisable', value: 'methods#enableDisable', class: 'mar-l-l' },
        { text: 'search', value: 'methods#search', class: 'mar-l-l' },
        { text: 'destroy', value: 'methods#destroy', class: 'mar-l-l' },

        // Frameworks
        { text: 'Frameworks', value: 'frameworks', class: 'label' },
        { text: 'vue', value: 'frameworks#vue', class: 'mar-l-l' },
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
      if (this.$route.query.p) {
        // Delay router push to allow for
        // other things to happen first
        setTimeout(() => {
          if (this.$route.query.p) {
            this.$router.push({ path: this.$route.query.p.toString(), hash: this.$route.hash })
          }
        }, 200)

        return
      }

      // After route change get the hash and scroll to element in main
      setTimeout(() => {
        const hash = this.$route.hash
        if (hash === '') {
          window.scroll({
            top: 0,
            behavior: 'smooth',
          })
        }

        // If hash is not empty scroll to element
        if (hash) {
          const el = document.querySelector(hash) as HTMLElement
          if (el) {
            // get header height
            const header = document.querySelector('header') as HTMLElement
            const nav = document.querySelector('nav') as HTMLElement
            const headerHeight = header ? header.clientHeight + (window.innerWidth < 700 ? nav.clientHeight : 0) + 8 : 0

            window.scroll({
              top: el.offsetTop - headerHeight, // header height + padding
              behavior: 'smooth',
            })
          }
        }
      }, 200)
    })

    this.setDemensions()
    window.addEventListener('resize', this.navDebounce)
  },
  unmounted() {
    window.removeEventListener('resize', this.navDebounce)

    this.nav?.destroy()
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
        openContent: 'below',
      } as Partial<Settings>

      if (this.width > 700) {
        settings.alwaysOpen = true
        settings.contentPosition = 'relative'
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
    <div class="top">
      <div class="text">
        <h1 class="logo">Slim Select <small>2.0</small></h1>
      </div>
      <div class="socials">
        <a href="https://github.com/brianvoe/slim-select" target="_blank">
          <img src="./images/github.png" />
        </a>
        <a href="https://www.npmjs.com/package/slim-select" target="_blank">
          <img src="./images/npm.png" />
        </a>
      </div>
    </div>
    <div class="bar">
      <div class="tagline">Advanced select dropdown</div>
      <div class="drop">
        <svg viewBox="0 0 100 100">
          <path d="M10,30 L50,70 L90,30" />
        </svg>
      </div>
    </div>
  </header>
  <nav>
    <select ref="nav"></select>
    <div class="nav-content" ref="navContent"></div>
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
