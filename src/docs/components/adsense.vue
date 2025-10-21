<script lang="ts">
import { defineComponent } from 'vue'
import { useAppStore } from '@/docs/store'

let adScriptLoaded = false

export default defineComponent({
  name: 'AdSense',
  props: {
    adClient: {
      type: String,
      default: 'ca-pub-4428453911800052'
    },
    adSlot: {
      type: String,
      default: 'XXXXXXXXXX' // Replace with your ad unit ID once created
    },
    adFormat: {
      type: String,
      default: 'auto'
    },
    fullWidthResponsive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const appStore = useAppStore()
    
    return { appStore }
  },
  mounted() {
    // Don't load ads on localhost
    if (this.appStore.isLocalhost) {
      return
    }

    // Load AdSense script if not already loaded
    if (!adScriptLoaded) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      script.setAttribute('data-ad-client', this.adClient)
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
      adScriptLoaded = true

      script.onload = () => {
        // Push ad after script loads
        try {
          ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
          ;(window as any).adsbygoogle.push({})
        } catch (e) {
          console.error('AdSense error:', e)
        }
      }
    } else {
      // Script already loaded, just push the ad
      try {
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        ;(window as any).adsbygoogle.push({})
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }
})
</script>

<style lang="scss">
.adsense-container {
  display: block;
  margin: var(--spacing-half) 0;
  text-align: center;

  ins {
    display: block;
    text-decoration: none;
  }

  .ad-placeholder {
    display: block;
    padding: var(--spacing);
    background:
      linear-gradient(135deg, #f5f5f5 25%, transparent 25%), linear-gradient(225deg, #f5f5f5 25%, transparent 25%),
      linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(315deg, #f5f5f5 25%, #e0e0e0 25%);
    background-position:
      10px 0,
      10px 0,
      0 0,
      0 0;
    background-size: 20px 20px;
    background-repeat: repeat;
    border: 2px dashed #ccc;
    border-radius: var(--border-radius);
    color: #999;
    font-size: 14px;
    text-align: center;

    strong {
      display: block;
      margin-bottom: var(--spacing-quarter);
      color: #666;
    }

    small {
      display: block;
      font-size: 12px;
      margin-top: var(--spacing-quarter);
      color: #aaa;
    }
  }
}
</style>

<template>
  <div class="adsense-container">
    <div v-if="appStore.isLocalhost" class="ad-placeholder">
      <strong>📢 Ad Placement</strong>
      <div>Google AdSense ad will display here</div>
      <small>Ad format: {{ adFormat }} | Responsive: {{ fullWidthResponsive }}</small>
    </div>
    <ins
      v-else
      class="adsbygoogle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="fullWidthResponsive"
    ></ins>
  </div>
</template>
