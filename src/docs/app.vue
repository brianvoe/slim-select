<script lang="ts">
import { defineComponent } from 'vue'

import AdSlot from '@/docs/components/adslot.vue'
import SiteHeader from '@/docs/components/site_header.vue'
import PageNav from '@/docs/components/page_nav.vue'
import DonateModal from '@/docs/components/donate_modal.vue'
import { hasSidebar } from '@/docs/nav'
import { useAppStore } from '@/docs/store'

export default defineComponent({
  name: 'App',
  components: {
    AdSlot,
    SiteHeader,
    PageNav,
    DonateModal
  },
  data() {
    return {
      year: new Date().getFullYear(),
      appStore: useAppStore()
    }
  },
  computed: {
    showSidebar(): boolean {
      return hasSidebar(this.$route.path)
    }
  },
  mounted() {
    this.appStore.setWidth(window.innerWidth)
    window.addEventListener('resize', this.onResize)

    this.$router.isReady().then(() => {
      this.scrollToHash()
    })

    this.$router.afterEach(() => {
      if (this.$route.query.p) {
        setTimeout(() => {
          if (this.$route.query.p) {
            this.$router.push({
              path: this.$route.query.p.toString(),
              hash: this.$route.hash
            })
          }
        }, 200)
        return
      }

      setTimeout(() => this.scrollToHash(), 200)
    })
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.appStore.setWidth(window.innerWidth)
    },
    scrollToHash() {
      const hash = this.$route.hash
      if (hash === '') {
        window.scroll({ top: 0, behavior: 'smooth' })
        return
      }

      const el = document.querySelector(hash) as HTMLElement | null
      if (!el) {
        return
      }

      const header = document.querySelector('.site-header') as HTMLElement | null
      const headerHeight = header ? header.offsetHeight + 8 : 0

      window.scroll({
        top: el.offsetTop - headerHeight,
        behavior: 'smooth'
      })
    }
  }
})
</script>

<template>
  <SiteHeader />
  <main class="app-main" :class="{ 'with-nav': showSidebar }">
    <PageNav v-if="showSidebar" />
    <div class="app-content">
      <router-view />
      <AdSlot ad-slot="1270131515" />
    </div>
    <footer class="app-footer">
      © {{ year }}
      <a href="http://webiswhatido.com" target="_blank">Brian Voelker</a>.
      <br />
      Slim Select is under the MIT license.
      <br />
      <a href="/privacy">Privacy Policy</a>
    </footer>
  </main>
  <DonateModal />
</template>
