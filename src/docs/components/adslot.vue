<script lang="ts">
import { defineComponent, nextTick } from 'vue'

// Global AdSense script management
let adsScriptAppended = false
let adsScriptPromise: Promise<void> | null = null

// Minimum content requirements for showing ads
const MIN_CONTENT_LENGTH = 150 // characters
const MIN_CONTENT_WORDS = 25 // words

export default defineComponent({
  name: 'AdSlot',
  props: {
    adSlot: {
      type: String,
      required: true
    },
    adClient: {
      type: String,
      default: 'ca-pub-4428453911800052'
    },
    adFormat: {
      type: String,
      default: 'auto'
    },
    fullWidthResponsive: {
      type: [Boolean, String],
      default: true
    },
    // Optional: minimum content length override
    minContentLength: {
      type: Number,
      default: MIN_CONTENT_LENGTH
    }
  },
  data() {
    return {
      shouldShowAd: false,
      isAdInitialized: false,
      contentObserver: null as MutationObserver | null,
      isMobile: false
    }
  },
  computed: {
    currentRoute() {
      return this.$route.path
    }
  },
  watch: {
    currentRoute: {
      handler: async function (newPath: string) {
        console.log('AdSlot: Route changed, re-evaluating ad eligibility')
        this.isAdInitialized = false
        this.shouldShowAd = false

        // Wait a bit for new content to render
        await nextTick()
        setTimeout(async () => {
          const eligible = await this.checkAdEligibility()
          this.shouldShowAd = eligible

          if (eligible) {
            await this.initializeAd()
          }
        }, 100)
      },
      immediate: false
    }
  },
  mounted() {
    this.setupContentObserver()
    this.checkMobile()

    // Initial check
    this.checkAdEligibility().then(async (eligible) => {
      this.shouldShowAd = eligible

      if (eligible) {
        await this.initializeAd()
      }
    })
  },
  beforeUnmount() {
    if (this.contentObserver) {
      this.contentObserver.disconnect()
    }
  },
  methods: {
    // Check if page has meaningful content
    hasMeaningfulContent(): boolean {
      // Look for main content areas
      const contentSelectors = [
        'main',
        '.contents',
        '.content',
        '.main-content',
        '[role="main"]',
        'article',
        '.page-content'
      ]

      let mainContent = null
      for (const selector of contentSelectors) {
        mainContent = document.querySelector(selector)
        if (mainContent) break
      }

      if (!mainContent) {
        console.log('AdSlot: No main content area found')
        return false
      }

      // Check for title
      const title = mainContent.querySelector('h1, h2, h3, .title, .heading')
      if (!title) {
        console.log('AdSlot: No title found in content')
        return false
      }

      // Get all text content
      const textContent = mainContent.textContent || ''
      const cleanText = textContent.replace(/\s+/g, ' ').trim()

      // Check minimum length
      if (cleanText.length < this.minContentLength) {
        console.log(`AdSlot: Content too short (${cleanText.length} < ${this.minContentLength})`)
        return false
      }

      // Check minimum word count
      const wordCount = cleanText.split(' ').filter((word) => word.length > 0).length
      if (wordCount < MIN_CONTENT_WORDS) {
        console.log(`AdSlot: Not enough words (${wordCount} < ${MIN_CONTENT_WORDS})`)
        return false
      }

      console.log(`AdSlot: Content check passed (${cleanText.length} chars, ${wordCount} words)`)
      return true
    },

    // Ensure AdSense script is loaded
    ensureScript(): Promise<void> {
      if (adsScriptAppended && adsScriptPromise) {
        return adsScriptPromise
      }

      if (adsScriptAppended) {
        return Promise.resolve()
      }

      adsScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.async = true
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.adClient}`
        script.crossOrigin = 'anonymous'
        script.onload = () => {
          console.log('AdSlot: AdSense script loaded')
          resolve()
        }
        script.onerror = () => {
          console.error('AdSlot: Failed to load AdSense script')
          reject(new Error('Failed to load AdSense script'))
        }
        document.head.appendChild(script)
        adsScriptAppended = true
      })

      return adsScriptPromise
    },

    // Initialize ad
    async initializeAd() {
      if (this.isAdInitialized || !this.shouldShowAd) return

      try {
        await this.ensureScript()
        await nextTick()

        const ins = this.$el?.querySelector('ins.adsbygoogle') as HTMLElement | null
        if (!ins) return

        // Check if already initialized
        if (ins.getAttribute('data-adsbygoogle-status')) {
          console.log('AdSlot: Ad already initialized')
          return
        }

        // Initialize the ad
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        ;(window as any).adsbygoogle.push({})

        this.isAdInitialized = true
        console.log('AdSlot: Ad initialized successfully')
      } catch (error) {
        console.error('AdSlot: Failed to initialize ad', error)
      }
    },

    // Check if ad should be shown
    async checkAdEligibility(): Promise<boolean> {
      // Don't show on localhost
      if (location.hostname === 'localhost') {
        console.log('AdSlot: Skipping ad on localhost')
        return false
      }

      // Wait for content to be rendered
      await nextTick()

      // Check for meaningful content
      if (!this.hasMeaningfulContent()) {
        console.log('AdSlot: No meaningful content found')
        return false
      }

      return true
    },

    // Set up content observer for dynamic content
    setupContentObserver() {
      if (this.contentObserver) {
        this.contentObserver.disconnect()
      }

      this.contentObserver = new MutationObserver(async () => {
        if (!this.shouldShowAd) {
          const eligible = await this.checkAdEligibility()
          if (eligible) {
            this.shouldShowAd = true
            await this.initializeAd()
          }
        }
      })

      // Observe content changes
      const contentSelectors = [
        'main',
        '.contents',
        '.content',
        '.main-content',
        '[role="main"]',
        'article',
        '.page-content'
      ]

      for (const selector of contentSelectors) {
        const element = document.querySelector(selector)
        if (element) {
          this.contentObserver.observe(element, {
            childList: true,
            subtree: true,
            characterData: true
          })
          break
        }
      }
    },

    // Check if mobile
    checkMobile() {
      if (typeof window !== 'undefined') {
        this.isMobile = window.innerWidth <= 768
      }
    }
  }
})
</script>

<style lang="scss">
.ad-slot {
  margin: 24px 0;
  text-align: center;
  min-height: 90px; // Prevent layout shift

  &.mobile {
    margin: 16px 0;
  }

  .ad-placeholder {
    padding: 20px;
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    color: #666;
    font-size: 14px;
    background: #f9f9f9;

    .placeholder-title {
      font-weight: bold;
      margin-bottom: 8px;
    }

    .placeholder-details {
      font-size: 12px;
      opacity: 0.7;
    }
  }

  // Ensure ads don't dominate mobile screens
  @media (max-width: 768px) {
    margin: 16px 0;

    // Prevent ads from being too large on mobile
    :deep(.adsbygoogle) {
      max-width: 100% !important;
      height: auto !important;
    }
  }
}

// Ensure proper spacing from content
:deep(.adsbygoogle) {
  display: block;
  margin: 0 auto;
}
</style>

<template>
  <div ref="adElement" class="ad-slot" :class="{ mobile: isMobile }">
    <div v-if="!shouldShowAd" class="ad-placeholder">
      <div class="placeholder-title">📢 Ad Placement</div>
      <div>AdSense ad will display here when content is ready</div>
      <div class="placeholder-details">Format: {{ adFormat }} | Responsive: {{ String(fullWidthResponsive) }}</div>
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
