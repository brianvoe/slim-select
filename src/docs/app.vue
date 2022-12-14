<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../slim-select'
import Settings from '../slim-select/settings'
import { debounce } from '../slim-select/helpers'
import { DataArray } from '../slim-select/store'
import CarbonAd from './components/carbonad.vue'

export default defineComponent({
  name: 'App',
  components: {
    CarbonAd,
  },
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
        {
          label: 'Install',
          closable: 'close',
          options: [
            { text: 'npm', value: 'install#npm' },
            { text: 'cdn', value: 'install#cdn' },
            { text: 'download', value: 'install#download' },
          ],
        },

        // Select
        {
          label: 'Selects',
          closable: 'close',
          options: [
            { text: 'single', value: 'selects#single' },
            { text: 'multiple', value: 'selects#multiple' },
          ],
        },

        // Data
        {
          label: 'Data',
          closable: 'close',
          options: [
            { text: 'types', value: 'data#types' },
            { text: 'field', value: 'data#field' },
          ],
        },

        // Settings
        {
          label: 'Settings',
          closable: 'close',
          options: [
            { text: 'select', value: 'settings#select' },
            { text: 'alwaysOpen', value: 'settings#alwaysOpen' },
            { text: 'contentLocation', value: 'settings#contentLocation' },
            { text: 'contentPosition', value: 'settings#contentPosition' },
            { text: 'openPosition', value: 'settings#openPosition' },
            { text: 'placeholder', value: 'settings#placeholder' },
            { text: 'allowDeselect', value: 'settings#allowDeselect' },
            { text: 'display', value: 'settings#display' },
            { text: 'disabled', value: 'settings#disabled' },
            { text: 'mandatory', value: 'settings#mandatory' },
            { text: 'minmax', value: 'settings#minmax' },
            { text: 'dataAttributes', value: 'settings#dataAttributes' },
            { text: 'cssClass', value: 'settings#cssClass' },
            { text: 'inlineStyles', value: 'settings#inlineStyles' },
            { text: 'html', value: 'settings#html' },
            { text: 'search', value: 'settings#search' },
            { text: 'closeOnSelect', value: 'settings#closeOnSelect' },
            { text: 'showOptionTooltips', value: 'settings#showOptionTooltips' },
            { text: 'selectAll', value: 'settings#selectAll' },
            { text: 'closable', value: 'settings#closable' },
            { text: 'hideSelected', value: 'settings#hideSelected' },
            { text: 'maxValuesShown', value: 'settings#maxValuesShown' },
          ],
        },

        // Events
        {
          label: 'Events',
          closable: 'close',
          options: [
            { text: 'error', value: 'events#error' },
            { text: 'beforeChange', value: 'events#beforeChange' },
            { text: 'afterChange', value: 'events#afterChange' },
            { text: 'open', value: 'events#open' },
            { text: 'search', value: 'events#search' },
            { text: 'searchFilter', value: 'events#searchFilter' },
            { text: 'addable', value: 'events#addable' },
          ],
        },

        // Methods
        {
          label: 'Methods',
          closable: 'close',
          options: [
            { text: 'getSelected', value: 'methods#getSelected' },
            { text: 'setSelected', value: 'methods#setSelected' },
            { text: 'getData', value: 'methods#getData' },
            { text: 'setData', value: 'methods#setData' },
            { text: 'enableDisable', value: 'methods#enableDisable' },
            { text: 'search', value: 'methods#search' },
            { text: 'destroy', value: 'methods#destroy' },
          ],
        },

        // Frameworks
        {
          label: 'Frameworks',
          closable: 'close',
          options: [{ text: 'vue', value: 'frameworks#vue' }],
        },
      ] as DataArray,
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
          <img src="./assets/images/github.png" />
        </a>
        <a href="https://www.npmjs.com/package/slim-select" target="_blank">
          <img src="./assets/images/npm.png" />
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
    <CarbonAd />
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
