<script lang="ts">
import { defineComponent, nextTick } from 'vue'

let adsScriptAppended = false

export default defineComponent({
  name: 'AdSense',
  props: {
    adClient: { type: String, default: 'ca-pub-4428453911800052' },
    // your ad unit id (required) default content ad unit id
    adSlot: { type: String, default: '1270131515', required: true },
    adFormat: { type: String, default: 'auto' },
    fullWidthResponsive: { type: [Boolean, String], default: true }
  },
  computed: {
    show(): boolean {
      // don’t show on localhost and require a slot
      return location.hostname !== 'localhost' && this.adSlot !== ''
    }
  },
  async mounted() {
    if (!this.show) return
    await this.ensureScript()
    await nextTick()
    this.pushAd()

    // Re-push on SPA route changes (if you use vue-router)
    // Remove if not applicable.
    // @ts-ignore
    this.$watch(
      () => this.$route?.fullPath,
      async () => {
        await nextTick()
        this.pushAd()
      }
    )
  },
  methods: {
    ensureScript(): Promise<void> {
      if (adsScriptAppended) return Promise.resolve()

      return new Promise((resolve) => {
        const s = document.createElement('script')
        s.async = true
        s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.adClient}`
        s.crossOrigin = 'anonymous'
        s.onload = () => resolve()
        document.head.appendChild(s)
        adsScriptAppended = true
      })
    },
    pushAd() {
      try {
        // Only push if this <ins> hasn't been initialized
        const ins = this.$el.querySelector('ins.adsbygoogle') as HTMLElement | null
        if (!ins) return

        // If Google added a data-adsbygoogle-status attr, it's already initialized – skip
        if (ins.getAttribute('data-adsbygoogle-status')) return // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('AdSense push error', e)
      }
    }
  }
})
</script>

<style lang="scss">
.adsense-container {
  margin: var(--spacing-half, 8px) 0;
  text-align: center;

  .ad-placeholder {
    padding: var(--spacing, 12px);
    border: 2px dashed #ccc;
    border-radius: 8px;
    color: #777;
    font-size: 14px;
  }
}
</style>

<template>
  <div class="adsense-container">
    <div v-if="!show" class="ad-placeholder">
      <strong>📢 Ad Placement</strong>
      <div>AdSense ad will display here</div>
      <small>Ad format: {{ adFormat }} | Responsive: {{ String(fullWidthResponsive) }}</small>
    </div>

    <ins
      v-else
      class="adsbygoogle"
      style="display: block"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="String(fullWidthResponsive)"
    />
  </div>
</template>
