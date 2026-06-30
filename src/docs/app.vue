<script lang="ts">
import { defineComponent } from 'vue'

import AdSlot from '@/docs/components/adslot.vue'
import Header from '@/docs/components/header.vue'
import PageNav from '@/docs/components/page_nav.vue'
import DonateModal from '@/docs/components/donate_modal.vue'
import { hasSidebar } from '@/docs/nav'
import { scrollToHashId, destroyOrphanedSlimSelects } from '@/docs/helpers'
import { useAppStore } from '@/docs/store'

export default defineComponent({
  name: 'App',
  components: {
    AdSlot,
    Header,
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

    this.$router.afterEach((to, from) => {
      this.$nextTick(() => destroyOrphanedSlimSelects())

      if (to.query.p) {
        setTimeout(() => {
          if (to.query.p) {
            this.$router.push({
              path: to.query.p.toString(),
              hash: to.hash
            })
          }
        }, 200)
        return
      }

      // Same-page hash jumps can scroll immediately; route changes wait for content.
      const delay = to.path === from.path ? 0 : 200
      setTimeout(() => this.scrollToHash(), delay)
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

      scrollToHashId(hash.slice(1))
    }
  }
})
</script>

<template>
  <Header />
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
