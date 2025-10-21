<script lang="ts">
import { defineComponent } from 'vue'

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
  mounted() {
    const isLocalhost = window.location.hostname === 'localhost'

    // Don't load ads on localhost
    if (isLocalhost) {
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
}
</style>

<template>
  <div class="adsense-container">
    <ins
      class="adsbygoogle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="fullWidthResponsive"
    ></ins>
  </div>
</template>
