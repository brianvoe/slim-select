<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect, { Option } from '../slim-select'

export default defineComponent({
  name: 'App',
  data() {
    const path = this.$route.path
    return {
      year: new Date().getFullYear(),
      navData: [
        { text: 'Home', value: '/', selected: path === '/' },
        { text: 'Installation', value: 'install', selected: path === '/install' },
        { text: 'Select Types', value: 'selects', selected: path === '/selects' },
        { text: 'Data', value: 'data', selected: path === '/data' },
        { text: 'Settings', value: 'settings', selected: path === '/settings' },
        { text: 'Events', value: 'events', selected: path === '/events' },
        { text: 'Methods', value: 'methods', selected: path === '/methods' },
      ],
    }
  },
  mounted() {
    // Lets redirect to path
    if (this.$route.query.p) {
      this.$router.push({ path: this.$route.query.p as string })
    }

    const slim = new SlimSelect({
      select: this.$refs.selectNav as HTMLSelectElement,
      data: this.navData,
      settings: {
        showSearch: false,
      },
      events: {
        afterChange: (newVal) => {
          this.$router.push({ path: (newVal[0] as Option).value })
        },
      },
    })

    this.$router.isReady().then(() => {
      const urlPathValue = this.$route.path.replace('/', '')
      if (urlPathValue !== '') {
        slim.setSelected(urlPathValue)
      }
    })

    this.$nextTick(() => {
      let hash = ''
      let timeout = 0
      const poll = window.setInterval(function () {
        timeout++
        hash = window.location.hash.replace('#', '')

        if (hash !== '') {
          // Get element of hash
          const elementToScrollTo = document.getElementById(hash)

          // If element exists scroll to it and stop polling
          if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth' })
            window.clearInterval(poll)
          }
        }

        if (timeout > 100) {
          // cancel the interval after 100 attempts (== 10s)
          window.clearInterval(poll)
        }
      }, 100)
    })
  },
})
</script>

<template>
  <div id="app">
    <div class="header">
      <div class="text">
        <div class="logo">Slim Select</div>
        <div class="tagline">Slim advanced select dropdown</div>
      </div>
      <div class="select-nav">
        <a href="https://github.com/brianvoe/slim-select" target="_blank">
          <img src="images/github.png" />
        </a>
        <a href="https://www.npmjs.com/package/slim-select" target="_blank">
          <img src="images/npm.png" />
        </a>
        <select ref="selectNav" style="font-weight: bold"></select>
      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer">
      © {{ year }} <a href="http://webiswhatido.com" style="color: #ffffff" target="_blank">Brian Voelker</a>. Slim
      Select is under the MIT license.
    </div>
  </div>
</template>
