<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '@/slim-select'
import UsageStats from '@/docs/components/usage_stats.vue'

const heroSingleOptions = [
  { placeholder: true, text: 'Try me…' },
  { value: 'so-slim', text: 'So slim' },
  { value: 'so-select', text: 'So select' },
  { value: 'pick-slim', text: 'Pick Slim Select!' },
  { value: 'upgrade', text: 'Upgrade this dropdown' },
  { value: 'bye-native', text: 'Bye, native <select>' }
]

const heroMultiOptions = [
  {
    label: 'Core',
    options: [
      { value: 'html', text: 'HTML' },
      { value: 'css', text: 'CSS' },
      { value: 'javascript', text: 'JavaScript' }
    ]
  },
  {
    label: 'Frameworks',
    options: [
      { value: 'vue', text: 'Vue' },
      { value: 'react', text: 'React' },
      { value: 'svelte', text: 'Svelte' }
    ]
  },
  {
    label: 'Tooling',
    options: [
      { value: 'typescript', text: 'TypeScript' },
      { value: 'vite', text: 'Vite' },
      { value: 'sass', text: 'Sass' }
    ]
  }
]

const heroLanguageOptions = [
  { placeholder: true, text: 'Pick a language…' },
  { value: 'ada', text: 'Ada' },
  { value: 'assembly', text: 'Assembly' },
  { value: 'awk', text: 'AWK' },
  { value: 'c', text: 'C' },
  { value: 'cpp', text: 'C++' },
  { value: 'csharp', text: 'C#' },
  { value: 'clojure', text: 'Clojure' },
  { value: 'cobol', text: 'COBOL' },
  { value: 'crystal', text: 'Crystal' },
  { value: 'dart', text: 'Dart' },
  { value: 'delphi', text: 'Delphi' },
  { value: 'elixir', text: 'Elixir' },
  { value: 'elm', text: 'Elm' },
  { value: 'erlang', text: 'Erlang' },
  { value: 'fsharp', text: 'F#' },
  { value: 'fortran', text: 'Fortran' },
  { value: 'go', text: 'Go' },
  { value: 'groovy', text: 'Groovy' },
  { value: 'hack', text: 'Hack' },
  { value: 'haskell', text: 'Haskell' },
  { value: 'java', text: 'Java' },
  { value: 'javascript', text: 'JavaScript' },
  { value: 'julia', text: 'Julia' },
  { value: 'kotlin', text: 'Kotlin' },
  { value: 'lisp', text: 'Lisp' },
  { value: 'lua', text: 'Lua' },
  { value: 'matlab', text: 'MATLAB' },
  { value: 'nim', text: 'Nim' },
  { value: 'objective-c', text: 'Objective-C' },
  { value: 'ocaml', text: 'OCaml' },
  { value: 'pascal', text: 'Pascal' },
  { value: 'perl', text: 'Perl' },
  { value: 'php', text: 'PHP' },
  { value: 'powershell', text: 'PowerShell' },
  { value: 'prolog', text: 'Prolog' },
  { value: 'python', text: 'Python' },
  { value: 'r', text: 'R' },
  { value: 'ruby', text: 'Ruby' },
  { value: 'rust', text: 'Rust' },
  { value: 'scala', text: 'Scala' },
  { value: 'scheme', text: 'Scheme' },
  { value: 'shell', text: 'Shell' },
  { value: 'smalltalk', text: 'Smalltalk' },
  { value: 'solidity', text: 'Solidity' },
  { value: 'sql', text: 'SQL' },
  { value: 'swift', text: 'Swift' },
  { value: 'tcl', text: 'Tcl' },
  { value: 'typescript', text: 'TypeScript' },
  { value: 'vbnet', text: 'VB.NET' },
  { value: 'vhdl', text: 'VHDL' },
  { value: 'zig', text: 'Zig' }
]

const regionData = [
  { value: 'us', text: 'United States' },
  { value: 'ca', text: 'Canada' },
  { value: 'mx', text: 'Mexico' },
  { value: 'br', text: 'Brazil' },
  { value: 'ar', text: 'Argentina' },
  { value: 'gb', text: 'United Kingdom' },
  { value: 'fr', text: 'France' },
  { value: 'de', text: 'Germany' },
  { value: 'es', text: 'Spain' },
  { value: 'it', text: 'Italy' },
  { value: 'se', text: 'Sweden' },
  { value: 'eg', text: 'Egypt' },
  { value: 'za', text: 'South Africa' },
  { value: 'in', text: 'India' },
  { value: 'cn', text: 'China' },
  { value: 'jp', text: 'Japan' },
  { value: 'kr', text: 'South Korea' },
  { value: 'au', text: 'Australia' },
  { value: 'nz', text: 'New Zealand' }
]

const countryData = [
  {
    value: 'us',
    text: 'United States',
    html: '<span class="flag">🇺🇸</span> United States'
  },
  {
    value: 'gb',
    text: 'United Kingdom',
    html: '<span class="flag">🇬🇧</span> United Kingdom'
  },
  { value: 'ca', text: 'Canada', html: '<span class="flag">🇨🇦</span> Canada' },
  {
    value: 'de',
    text: 'Germany',
    html: '<span class="flag">🇩🇪</span> Germany'
  },
  { value: 'fr', text: 'France', html: '<span class="flag">🇫🇷</span> France' },
  { value: 'jp', text: 'Japan', html: '<span class="flag">🇯🇵</span> Japan' },
  { value: 'br', text: 'Brazil', html: '<span class="flag">🇧🇷</span> Brazil' },
  { value: 'in', text: 'India', html: '<span class="flag">🇮🇳</span> India' },
  {
    value: 'au',
    text: 'Australia',
    html: '<span class="flag">🇦🇺</span> Australia'
  },
  { value: 'mx', text: 'Mexico', html: '<span class="flag">🇲🇽</span> Mexico' },
  {
    value: 'za',
    text: 'South Africa',
    html: '<span class="flag">🇿🇦</span> South Africa'
  },
  {
    value: 'kr',
    text: 'South Korea',
    html: '<span class="flag">🇰🇷</span> South Korea'
  }
]

const PRODUCT_ADJ = [
  'Ergonomic',
  'Rustic',
  'Sleek',
  'Handmade',
  'Refined',
  'Modern',
  'Elegant',
  'Compact',
  'Durable',
  'Premium'
]
const PRODUCT_MATERIAL = [
  'Steel',
  'Wooden',
  'Cotton',
  'Granite',
  'Rubber',
  'Leather',
  'Bronze',
  'Linen',
  'Ceramic',
  'Bamboo'
]
const PRODUCT_NOUN = [
  'Chair',
  'Keyboard',
  'Lamp',
  'Backpack',
  'Bottle',
  'Watch',
  'Headphones',
  'Mug',
  'Notebook',
  'Desk',
  'Wallet',
  'Speaker',
  'Table',
  'Gloves'
]

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function buildProducts(count: number) {
  const used = new Set<string>()
  const out: { value: string; text: string; html: string }[] = []
  let guard = 0
  while (out.length < count && guard < count * 25) {
    guard++
    const name = `${pick(PRODUCT_ADJ)} ${pick(PRODUCT_MATERIAL)} ${pick(PRODUCT_NOUN)}`
    if (used.has(name)) {
      continue
    }
    used.add(name)
    const price = (Math.floor(Math.random() * 190) + 9 + 0.99).toFixed(2)
    out.push({
      value: name.toLowerCase().replace(/\s+/g, '-'),
      text: name,
      html: `<span class="product-name">${name}</span><span class="product-price">$${price}</span>`
    })
  }
  return out
}

const productData = buildProducts(60)

const HOME_MODAL_THEME_STYLE_ID = 'home-modal-theme-vars'
const HOME_MODAL_OPEN_BODY_CLASS = 'home-modal-open'

function themeVarsCssLines(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
}

// Mirrors three of the /style#showcase mini-sites — just the chrome + vars
// needed to show SlimSelect themed entirely with CSS variables.
const themeExamples: {
  id: string
  siteClass: string
  title: string
  tagline: string
  label: string
  vars: Record<string, string>
  options: { value: string; text: string }[]
}[] = [
  {
    id: 'neon',
    siteClass: 'theme-neon',
    title: 'NIGHT.CITY',
    tagline: 'Neon district portal',
    label: 'Access level',
    vars: {
      '--ss-primary-color': '#ff00ff',
      '--ss-bg-color': '#12002a',
      '--ss-font-color': '#00fff5',
      '--ss-placeholder-color': '#b8fff9',
      '--ss-border-color': '#00fff5',
      '--ss-focus-color': '#00fff5',
      '--ss-border-radius': '4px'
    },
    options: [
      { value: 'street', text: 'Street pass' },
      { value: 'club', text: 'Club VIP' },
      { value: 'corp', text: 'Corp clearance' },
      { value: 'admin', text: 'Grid admin' }
    ]
  },
  {
    id: 'brutal',
    siteClass: 'theme-brutalist',
    title: 'RAW FORM',
    tagline: 'Brutalist web collective',
    label: 'Tier',
    vars: {
      '--ss-primary-color': '#000000',
      '--ss-bg-color': '#ffffff',
      '--ss-font-color': '#000000',
      '--ss-placeholder-color': '#333333',
      '--ss-border-color': '#000000',
      '--ss-focus-color': '#000000',
      '--ss-border-radius': '0px',
      '--ss-main-height': '44px'
    },
    options: [
      { value: 'basic', text: 'BASIC' },
      { value: 'plus', text: 'PLUS' },
      { value: 'max', text: 'MAX' },
      { value: 'ultra', text: 'ULTRA' }
    ]
  },
  {
    id: 'rainbow',
    siteClass: 'theme-rainbow',
    title: 'Joyful Studio',
    tagline: 'Playful creative agency',
    label: 'Package type',
    vars: {
      '--ss-primary-color': '#e056fd',
      '--ss-bg-color': '#ffffff',
      '--ss-font-color': '#5b2068',
      '--ss-placeholder-color': '#9b59b6',
      '--ss-border-color': '#ff9ff3',
      '--ss-focus-color': '#48dbfb',
      '--ss-border-radius': '20px'
    },
    options: [
      { value: 'logo', text: 'Logo design' },
      { value: 'social', text: 'Social pack' },
      { value: 'web', text: 'Web refresh' },
      { value: 'brand', text: 'Full brand' }
    ]
  }
]

export default defineComponent({
  name: 'Home',
  components: {
    UsageStats
  },
  data() {
    return {
      instances: [] as SlimSelect[],
      heroSingleInst: null as SlimSelect | null,
      heroMultiInst: null as SlimSelect | null,
      heroModalInst: null as SlimSelect | null,
      themeExamples,
      activeModalThemeId: null as string | null,
      activeSection: '',
      hasScrolled: false,
      scrollRafId: 0 as number,
      heroHints: [
        { id: 'home-stats', label: 'Loved by developers' },
        { id: 'home-themes', label: 'Theming' },
        { id: 'home-features', label: 'Features' }
      ]
    }
  },
  mounted() {
    const add = (config: ConstructorParameters<typeof SlimSelect>[0]) => {
      const instance = new SlimSelect(config)
      this.instances.push(instance)
      return instance
    }

    this.heroSingleInst = add({
      select: this.$refs.heroSingle as HTMLSelectElement,
      settings: { placeholderText: 'Try me…', modal: 'off' },
      data: heroSingleOptions
    })

    this.heroMultiInst = add({
      select: this.$refs.heroMulti as HTMLSelectElement,
      settings: {
        placeholderText: 'Stack your skills…',
        closeOnSelect: false,
        keepOrder: true,
        modal: 'off'
      },
      data: heroMultiOptions
    })

    this.heroModalInst = add({
      select: this.$refs.heroModal as HTMLSelectElement,
      settings: {
        modal: 'on',
        placeholderText: 'Pick a language…'
      },
      data: heroLanguageOptions
    })

    add({
      select: this.$refs.modalSelect as HTMLSelectElement,
      settings: {
        modal: 'on',
        showSearch: false,
        placeholderText: 'Choose a region...'
      },
      data: regionData
    })

    add({
      select: this.$refs.countrySelect as HTMLSelectElement,
      settings: { placeholderText: 'Select a country...', modal: 'off' },
      data: countryData
    })

    add({
      select: this.$refs.productSelect as HTMLSelectElement,
      settings: {
        placeholderText: 'Search 60 products...',
        searchHighlight: true,
        modal: 'off'
      },
      data: productData
    })

    this.themeExamples.forEach((theme) => {
      const select = document.getElementById(
        `home-theme-${theme.id}`
      ) as HTMLSelectElement | null
      const content = document.getElementById(
        `home-theme-content-${theme.id}`
      ) as HTMLElement | null
      if (!select || !content) {
        return
      }
      add({
        select,
        settings: {
          modal: 'off',
          contentLocation: content,
          contentPosition: 'relative',
          placeholderText: 'Pick one...'
        },
        data: theme.options
      })

      const modalSelect = document.getElementById(
        `home-theme-modal-${theme.id}`
      ) as HTMLSelectElement | null
      if (modalSelect) {
        add({
          select: modalSelect,
          settings: {
            modal: 'on',
            showSearch: false,
            placeholderText: 'Click to open modal…'
          },
          data: theme.options,
          events: {
            beforeOpen: () => this.applyThemeModal(theme.id, theme.vars),
            afterClose: () => {
              if (this.activeModalThemeId === theme.id) {
                this.clearThemeModal()
              }
            }
          }
        })
      }
    })

    // Showcase it being driven programmatically (respect reduced motion)
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (!reduced) {
      window.setTimeout(() => this.playDemo(), 1400)
    }

    this.updateScrollState()
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  unmounted() {
    this.instances.forEach((instance) => instance.destroy())
    this.instances = []
    this.clearThemeModal()
    window.removeEventListener('scroll', this.onScroll)
    cancelAnimationFrame(this.scrollRafId)
  },
  methods: {
    headerHeight(): number {
      return (
        (document.querySelector('.site-header') as HTMLElement)?.offsetHeight ??
        64
      )
    },
    onScroll() {
      cancelAnimationFrame(this.scrollRafId)
      this.scrollRafId = requestAnimationFrame(this.updateScrollState)
    },
    updateScrollState() {
      this.hasScrolled = window.scrollY > 48

      const line = this.headerHeight() + 24
      let current = ''
      for (const hint of this.heroHints) {
        const el = document.getElementById(hint.id)
        if (el && el.getBoundingClientRect().top - line <= 0) {
          current = hint.id
        }
      }
      this.activeSection = current
    },
    scrollToSection(id: string) {
      const el = document.getElementById(id)
      if (!el) {
        return
      }
      window.scroll({
        top:
          el.getBoundingClientRect().top +
          window.scrollY -
          this.headerHeight() -
          16,
        behavior: 'smooth'
      })
    },
    applyThemeModal(themeId: string, vars: Record<string, string>) {
      this.activeModalThemeId = themeId
      document.body.classList.add(HOME_MODAL_OPEN_BODY_CLASS)

      let style = document.getElementById(
        HOME_MODAL_THEME_STYLE_ID
      ) as HTMLStyleElement | null
      if (!style) {
        style = document.createElement('style')
        style.id = HOME_MODAL_THEME_STYLE_ID
        document.head.appendChild(style)
      }

      style.textContent = `
        body.${HOME_MODAL_OPEN_BODY_CLASS} .ss-modal-overlay {
${themeVarsCssLines(vars)}
        }
      `
    },
    clearThemeModal() {
      this.activeModalThemeId = null
      document.body.classList.remove(HOME_MODAL_OPEN_BODY_CLASS)
      document.getElementById(HOME_MODAL_THEME_STYLE_ID)?.remove()
    },
    playDemo() {
      const single = this.heroSingleInst
      const multi = this.heroMultiInst
      if (!single || !multi) {
        return
      }

      single.open()
      window.setTimeout(() => {
        single.setSelected('pick-slim')
      }, 650)
      window.setTimeout(() => {
        single.close()
      }, 1300)
      window.setTimeout(() => {
        multi.setSelected([])
        multi.open()
      }, 1700)
      window.setTimeout(() => {
        multi.setSelected(['typescript'])
      }, 2350)
      window.setTimeout(() => {
        multi.setSelected(['typescript', 'vue'])
      }, 2800)
      window.setTimeout(() => {
        multi.setSelected(['typescript', 'vue', 'react'])
      }, 3250)
      window.setTimeout(() => {
        multi.close()
      }, 3900)
    }
  }
})
</script>

<template>
  <div id="home">
    <!-- ================= Hero ================= -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <h1 class="hero-wordmark">
            <span class="hero-wordmark-core">Slim Select</span>
            <span class="hero-wordmark-version" aria-hidden="true">v4</span>
          </h1>
          <p class="hero-tagline">The select dropdown, reimagined.</p>
          <p class="hero-sub">
            A lightweight, accessible, drop-in upgrade for the native
            <code>&lt;select&gt;</code>.
          </p>
        </div>

        <div class="hero-stage">
          <div class="hero-fields">
            <label class="hero-field">
              <span class="hero-field-label">Single</span>
              <select ref="heroSingle"></select>
            </label>
            <label class="hero-field">
              <span class="hero-field-label">Multiple</span>
              <select ref="heroMulti" multiple></select>
            </label>
          </div>

          <label class="hero-field hero-field--modal">
            <span class="hero-field-label-row">
              <span class="hero-field-label">Modal</span>
              <span class="hero-field-badge" aria-label="New in version 4"
                >New in v4</span
              >
            </span>
            <select ref="heroModal"></select>
          </label>
        </div>

        <div class="hero-actions">
          <div class="hero-cta">
            <router-link class="hero-btn hero-btn-primary" to="/get-started"
              >Get started</router-link
            >
            <a
              class="hero-btn hero-btn-ghost"
              href="https://github.com/brianvoe/slim-select"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>

          <nav
            class="hero-hints"
            :class="{ 'is-scrolled': hasScrolled }"
            aria-label="Explore the page"
          >
            <template v-for="(hint, index) in heroHints" :key="hint.id">
              <span v-if="index > 0" class="hero-hint-sep" aria-hidden="true"
                >·</span
              >
              <button
                type="button"
                class="hero-hint"
                :class="{ active: activeSection === hint.id }"
                @click="scrollToSection(hint.id)"
              >
                {{ hint.label }}
              </button>
            </template>
          </nav>
        </div>
      </div>

      <button
        type="button"
        class="hero-scroll-hint"
        :class="{ 'is-hidden': hasScrolled }"
        aria-label="View more below"
        @click="scrollToSection('home-stats')"
      >
        <span class="hero-scroll-hint-label">View More</span>
        <svg
          class="hero-scroll-hint-arrow"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </section>

    <!-- ================= Social proof ================= -->
    <section id="home-stats">
      <UsageStats />
    </section>

    <!-- ================= Theming ================= -->
    <section id="home-themes" class="themes">
      <header class="section-head">
        <span class="section-eyebrow">Theming</span>
        <h2>Your brand, a few lines of CSS</h2>
        <p>
          SlimSelect is styled entirely with CSS custom properties — no forked
          stylesheets, no class overrides, no fighting specificity. Set
          <code>--ss-*</code> variables on a wrapper and the dropdown matches
          your design system.
        </p>
      </header>

      <div class="theme-grid">
        <div
          v-for="theme in themeExamples"
          :key="theme.id"
          :class="['theme-demo', theme.siteClass]"
        >
          <div class="theme-chrome">
            <h4 class="theme-title">{{ theme.title }}</h4>
            <p class="theme-tagline">{{ theme.tagline }}</p>
          </div>
          <div class="theme-body">
            <div class="theme-select-block">
              <label class="theme-label" :for="`home-theme-${theme.id}`">{{
                theme.label
              }}</label>
              <div
                class="theme-select-field"
                :id="`home-theme-field-${theme.id}`"
                :style="theme.vars"
              >
                <select :id="`home-theme-${theme.id}`"></select>
                <div
                  :id="`home-theme-content-${theme.id}`"
                  class="theme-select-content"
                ></div>
              </div>
            </div>
            <div class="theme-select-block theme-select-block--modal">
              <label class="theme-label" :for="`home-theme-modal-${theme.id}`"
                >Modal mode</label
              >
              <div class="theme-modal-field" :style="theme.vars">
                <select :id="`home-theme-modal-${theme.id}`"></select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-link class="theme-cta" to="/style#showcase">
        <div class="theme-cta-swatches" aria-hidden="true">
          <span class="theme-cta-swatch theme-cta-swatch--neon"></span>
          <span class="theme-cta-swatch theme-cta-swatch--brutal"></span>
          <span class="theme-cta-swatch theme-cta-swatch--rainbow"></span>
          <span class="theme-cta-swatch theme-cta-swatch--dark"></span>
        </div>
        <div class="theme-cta-text">
          <strong>Want to go deeper?</strong>
          <span>
            Explore 8 themed mini-sites, copy ready-to-use CSS variables, and
            tweak every token live in the Style docs.
          </span>
        </div>
        <span class="theme-cta-action">View the full showcase →</span>
      </router-link>

      <p class="themes-foot">
        Same component, same markup — neon, brutal, playful, or anything in
        between. If your site has CSS variables, SlimSelect already speaks your
        language.
      </p>
    </section>

    <!-- ================= Features ================= -->
    <section id="home-features" class="features">
      <header class="section-head">
        <span class="section-eyebrow">Features</span>
        <h2>Everything the native select forgot</h2>
        <p>
          Live, interactive demos — drop any of them straight into your app.
        </p>
      </header>

      <!-- Modal — full width, click to try -->
      <article class="feature-card feature-modal">
        <div class="feature-modal-text">
          <div class="feature-head">
            <h3>Modal mode</h3>
            <span class="feature-badge">Click it</span>
          </div>
          <p class="feature-copy">
            Open SlimSelect as a centered, focus-trapped dialog with a backdrop
            — perfect for mobile and dense forms. Give the field a click to see
            it in action.
          </p>
          <router-link class="feature-link" to="/settings#modal"
            >Modal docs →</router-link
          >
        </div>
        <div class="feature-modal-demo">
          <span class="feature-modal-hint">Click to open in a modal ↗</span>
          <select ref="modalSelect"></select>
        </div>
      </article>

      <!-- HTML + Search — 50 / 50 -->
      <div class="feature-row">
        <article class="feature-card">
          <div class="feature-head">
            <h3>HTML options</h3>
            <span class="feature-badge">Rich UI</span>
          </div>
          <p class="feature-copy">
            Render any markup inside options — flags, avatars, icons. Ideal for
            country pickers.
          </p>
          <div class="feature-demo">
            <select ref="countrySelect" class="country-ss"></select>
          </div>
          <router-link class="feature-link" to="/settings#html"
            >HTML docs →</router-link
          >
        </article>

        <article class="feature-card">
          <div class="feature-head">
            <h3>Search</h3>
            <span class="feature-badge">Fast</span>
          </div>
          <p class="feature-copy">
            Filter big catalogs instantly with highlighting. Try searching this
            product list.
          </p>
          <div class="feature-demo">
            <select ref="productSelect" class="product-ss"></select>
          </div>
          <router-link class="feature-link" to="/events#search"
            >Search docs →</router-link
          >
        </article>
      </div>

      <!-- Frameworks — full width -->
      <article class="feature-card frameworks">
        <div class="feature-head">
          <h3>Works with your stack</h3>
          <span class="feature-badge">Vanilla · Vue · React</span>
        </div>
        <p class="feature-copy">
          First-class wrappers with <code>v-model</code> /
          <code>value</code> binding and stable sync that skips redundant
          updates.
        </p>
        <div class="frameworks-grid">
          <div class="framework">
            <div class="framework-logo framework-logo--js">JS</div>
            <span class="framework-name">Vanilla JS</span>
            <span class="framework-note">Zero dependencies</span>
          </div>
          <router-link class="framework framework--link" to="/vue">
            <svg
              class="framework-logo"
              viewBox="0 0 128 128"
              aria-hidden="true"
            >
              <path
                fill="#42b883"
                d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
              />
              <path
                fill="#35495e"
                d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
              />
            </svg>
            <span class="framework-name">Vue</span>
            <span class="framework-note">Vue docs →</span>
          </router-link>
          <router-link class="framework framework--link" to="/react">
            <svg
              class="framework-logo"
              viewBox="-11.5 -10.23174 23 20.46348"
              aria-hidden="true"
            >
              <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
              <g stroke="#61dafb" stroke-width="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
            <span class="framework-name">React</span>
            <span class="framework-note">React docs →</span>
          </router-link>
        </div>
      </article>
    </section>

    <!-- ================= Support ================= -->
    <section class="support-cta">
      <div class="support-heart">♥</div>
      <h2>SlimSelect is free — help keep it alive</h2>
      <p>
        SlimSelect is built and maintained by a single developer, in spare time,
        for everyone to use. If it has saved you time or shipped in your
        product, your support directly funds bug fixes, documentation, and the
        new features that keep it getting better.
      </p>
      <div class="support-actions">
        <a
          class="support-btn support-btn--primary"
          href="https://github.com/sponsors/brianvoe"
          target="_blank"
          rel="noopener"
        >
          ♥ Sponsor on GitHub
        </a>
        <a
          class="support-btn support-btn--coffee"
          href="https://www.buymeacoffee.com/brianvoe"
          target="_blank"
          rel="noopener"
        >
          ☕ Buy me a coffee
        </a>
      </div>
      <p class="support-thanks">
        Every contribution, big or small, genuinely means the world. Thank you.
        🙏
      </p>
    </section>
  </div>
</template>

<style lang="scss">
#home {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1.5);
  min-width: 0;
  max-width: 100%;
  color: var(--on-dark);

  .usage-stats {
    margin-bottom: clamp(72px, 12vh, 180px);
  }

  #home-stats {
    scroll-margin-top: calc(var(--height-header) + var(--spacing-half));
  }

  #home-themes,
  #home-features {
    scroll-margin-top: calc(var(--height-header) + var(--spacing-half));
  }

  @media (max-width: 768px) {
    .usage-stats {
      margin-bottom: calc(var(--spacing) * 3);
    }
  }

  /* ======================================================================
     Hero
     ====================================================================== */
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100svh - var(--height-header) - var(--spacing));
    margin-bottom: clamp(72px, 14vh, 200px);
    text-align: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
      min-height: calc(100svh - var(--height-header) - var(--spacing-half));
      margin-bottom: calc(var(--spacing) * 3);
    }
  }

  .hero-inner {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing);
    width: 100%;
    min-width: 0;
    max-width: 100%;
    padding-top: var(--spacing-half);
    box-sizing: border-box;
  }

  .hero-scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    flex: 0 0 auto;
    padding: 0 0 var(--spacing-quarter);
    border: none;
    background: none;
    font-family: inherit;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.04em;
    color: #ffffff;
    cursor: pointer;
    opacity: 0.65;
    transition:
      opacity 0.45s ease,
      transform 0.45s ease,
      visibility 0.45s ease;

    &:hover {
      opacity: 1;
      transform: translateY(2px);
    }

    &.is-hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(10px);
    }
  }

  .hero-scroll-hint-arrow {
    width: 20px;
    height: 20px;
    margin-top: -2px;
    animation: hero-scroll-bounce 2.2s ease-in-out infinite;

    path {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  @keyframes hero-scroll-bounce {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(5px);
    }
  }

  .hero-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .hero-hints {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0;
    width: 100%;
    margin-top: 0;
    opacity: 0.8;
    transition: opacity 0.35s ease;

    &.is-scrolled {
      opacity: 1;
    }
  }

  .hero-hint-sep {
    margin: 0 16px;
    font-size: 38px;
    font-weight: 300;
    line-height: 1;
    color: rgba(255, 255, 255, 0.55);
    user-select: none;
  }

  .hero-hint {
    height: auto;
    padding: 0;
    border: none;
    border-radius: 0;
    font-family: inherit;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.02em;
    color: #ffffff;
    background: none;
    box-shadow: none;
    cursor: pointer;
    transition:
      color 0.2s ease,
      opacity 0.2s ease;

    &:hover {
      opacity: 0.75;
    }

    &.active {
      opacity: 1;
      text-decoration: underline;
      text-underline-offset: 4px;
      text-decoration-color: rgba(255, 255, 255, 0.45);
    }
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-quarter);
    max-width: 680px;
  }

  // "slim" is the brand — the wordmark is intentionally light-weight
  .hero-wordmark {
    position: relative;
    display: inline-block;
    margin: 0;
    font-size: clamp(60px, 12vw, 118px);
    line-height: 1;
    letter-spacing: 0.01em;
  }

  .hero-wordmark-core {
    font-weight: 300;
    background: linear-gradient(90deg, #ffffff 0%, #93c5fd 45%, #ffffff 90%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: hero-wordmark-flow 7s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      background: linear-gradient(90deg, #ffffff 0%, #93c5fd 100%);
    }
  }

  .hero-wordmark-version {
    position: absolute;
    top: 0.14em;
    left: 100%;
    margin-left: 0.1em;
    font-size: 0.26em;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    pointer-events: none;
  }

  @keyframes hero-wordmark-flow {
    0%,
    100% {
      background-position: 0% center;
    }

    50% {
      background-position: 100% center;
    }
  }

  .hero-tagline {
    margin: 0;
    font-size: clamp(20px, 3.2vw, 30px);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--on-dark);
  }

  .hero-sub {
    margin: var(--spacing-quarter) 0 0;
    font-size: 16px;
    line-height: 1.6;
    color: var(--on-dark-muted);
  }

  .hero-stage {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-half);
    width: 100%;
    max-width: 760px;
    min-width: 0;
    padding: var(--spacing);
    border-radius: var(--border-radius);
    text-align: left;
    box-sizing: border-box;
    overflow-x: clip;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.16);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    .ss-main {
      width: 100%;
      max-width: 100%;
      min-width: 0;
    }

    @media (max-width: 560px) {
      padding: var(--spacing-half);
    }

    @supports not (
      (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
    ) {
      background: rgba(30, 41, 59, 0.88);
    }
  }

  .hero-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-half);
    min-width: 0;

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .hero-field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    min-width: 0;
  }

  .hero-field-label {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  .hero-field-label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }

  .hero-field-badge {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    padding: 2px 7px;
    border-radius: 5px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #ffffff;
    background: #0f172a;
    border: 1px solid rgba(15, 23, 42, 0.12);
    box-shadow: 0 3px 10px rgba(15, 23, 42, 0.16);

    &::before {
      content: '';
      width: 5px;
      height: 5px;
      margin-right: 5px;
      border-radius: 50%;
      background: #93c5fd;
      box-shadow: 0 0 8px rgba(147, 197, 253, 0.9);
      animation: hero-badge-pulse 2s ease-in-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  }

  @keyframes hero-badge-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }

    50% {
      opacity: 0.55;
      transform: scale(0.85);
    }
  }

  .hero-field--modal {
    width: 100%;
    max-width: 360px;
    min-width: 0;
    margin: var(--spacing-quarter) auto 0;
    text-align: left;

    .ss-main {
      width: 100%;
    }
  }

  .hero-cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-half);
  }

  .hero-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0 22px;
    border-radius: var(--border-radius);
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      background 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .hero-btn-primary {
    color: var(--ink);
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.25);
  }

  .hero-btn-ghost {
    color: var(--on-dark);
    background: var(--chrome-fill);
    border: 1px solid var(--chrome-border);

    &:hover {
      background: var(--accent);
    }
  }

  /* ======================================================================
     Features
     ====================================================================== */
  .features {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
    margin-bottom: clamp(72px, 12vh, 180px);

    @media (max-width: 768px) {
      margin-bottom: calc(var(--spacing) * 3);
    }
  }

  .section-head {
    text-align: center;

    .section-eyebrow {
      display: inline-block;
      margin-bottom: var(--spacing-quarter);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #93c5fd;
    }

    h2 {
      margin: 0 0 var(--spacing-quarter);
      font-size: clamp(28px, 4vw, 38px);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--on-dark);
    }

    p {
      max-width: 720px;
      margin: 0 auto;
      font-size: 16px;
      line-height: 1.6;
      color: var(--on-dark-muted);
    }
  }

  .feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-half);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .feature-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-half);
    min-width: 0;
    padding: var(--spacing);
    border-radius: var(--border-radius);
    background: var(--surface);
    border: 1px solid var(--surface-border);
    box-shadow: var(--shadow);
  }

  .feature-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-quarter);

    h3 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--ink);
    }
  }

  .feature-badge {
    display: inline-flex;
    padding: 4px 10px;
    border-radius: var(--border-radius);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #1d4ed8;
    background: var(--color-info-bg);
  }

  .feature-copy {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--muted);
  }

  .feature-link {
    margin-top: auto;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-primary);

    &:hover {
      text-decoration: underline;
    }
  }

  .feature-demo {
    padding: var(--spacing-half);
    border-radius: var(--border-radius);
    background: var(--surface-raised);
    color: var(--ink);
  }

  /* Modal feature — dark, attention-grabbing, two columns */
  .feature-modal {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing);
    color: var(--on-dark);
    background: var(--chrome);
    border-color: var(--chrome-border);

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }

    .feature-head h3 {
      color: var(--on-dark);
    }

    .feature-copy {
      color: var(--on-dark-muted);
    }

    .feature-link {
      color: #93c5fd;
    }

    .feature-badge {
      color: #bfdbfe;
      background: var(--accent);
    }
  }

  .feature-modal-text {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-half);
  }

  .feature-modal-demo {
    flex: 0 0 360px;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    padding: var(--spacing-half);
    border-radius: var(--border-radius);
    background: var(--surface-raised);
    color: var(--ink);

    @media (max-width: 768px) {
      flex-basis: auto;
    }

    .ss-main {
      width: 100%;
    }
  }

  .feature-modal-hint {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-primary);
  }

  /* Theme grid */
  .themes {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
    margin-bottom: clamp(72px, 12vh, 180px);

    @media (max-width: 768px) {
      margin-bottom: calc(var(--spacing) * 3);
    }
  }

  .themes-foot {
    margin: 0;
    max-width: 640px;
    align-self: center;
    text-align: center;
    font-size: 15px;
    line-height: 1.6;
    color: var(--on-dark-muted);
  }

  .theme-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spacing-half);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  // Mini-site cards — each mirrors a /style#showcase theme
  .theme-demo {
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius);
    overflow: visible;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }

  .theme-chrome {
    padding: var(--spacing-quarter) var(--spacing-half);
  }

  .theme-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .theme-tagline {
    margin: 4px 0 0;
    font-size: 11px;
    opacity: 0.85;
  }

  .theme-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-half);
    padding: var(--spacing-half);
  }

  .theme-select-block {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &--modal {
      padding-top: var(--spacing-quarter);
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }
  }

  .theme-brutalist .theme-select-block--modal {
    border-top-color: rgba(0, 0, 0, 0.15);
  }

  .theme-rainbow .theme-select-block--modal {
    border-top-color: rgba(74, 25, 66, 0.15);
  }

  .theme-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
  }

  .theme-modal-field {
    .ss-main {
      width: 100%;
      margin: 0;
    }
  }

  .theme-select-field {
    position: relative;

    > select {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: 0;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip-path: inset(50%);
      pointer-events: none;
    }

    .ss-main {
      margin: 0;
    }

    .theme-select-content .ss-content {
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      right: 0;
      width: 100% !important;
      height: auto !important;
      margin: -1px 0 0 !important;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  .theme-neon {
    background: #0a0014;
    color: #00fff5;
    font-family: 'Montserrat', sans-serif;

    .theme-chrome {
      border-bottom: 1px solid #ff00ff;
      box-shadow: 0 0 12px rgba(255, 0, 255, 0.3);
    }

    .theme-title {
      color: #ff00ff;
      text-shadow: 0 0 8px #ff00ff;
    }
  }

  .theme-brutalist {
    background: #fff;
    color: #000;
    font-family: 'Arial Black', Arial, sans-serif;
    border: 4px solid #000;

    .theme-chrome {
      border-bottom: 4px solid #000;
      background: #ffeb3b;
    }

    .theme-title {
      text-transform: uppercase;
      font-size: 14px;
    }
  }

  .theme-rainbow {
    background: linear-gradient(
      135deg,
      #ff9a9e 0%,
      #fecfef 35%,
      #a8edea 70%,
      #fed6e3 100%
    );
    color: #4a1942;
    font-family: 'Montserrat', sans-serif;

    .theme-chrome {
      background: rgba(255, 255, 255, 0.45);
    }

    .theme-title {
      color: #4a1942;
    }
  }

  .theme-cta {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    margin-top: var(--spacing-quarter);
    padding: var(--spacing-half) var(--spacing);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--ink);
    background:
      linear-gradient(
        135deg,
        rgba(88, 151, 251, 0.12) 0%,
        rgba(99, 102, 241, 0.08) 100%
      ),
      var(--surface-raised);
    border: 1px solid var(--surface-border);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      border-color: var(--color-primary);
      box-shadow:
        0 12px 28px rgba(88, 151, 251, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
      text-decoration: none;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
  }

  .theme-cta-swatches {
    display: flex;
    flex: 0 0 auto;
    gap: 6px;
  }

  .theme-cta-swatch {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 2px solid rgba(15, 23, 42, 0.12);
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);

    &--neon {
      background: linear-gradient(135deg, #ff00ff 0%, #12002a 100%);
    }

    &--brutal {
      background: linear-gradient(180deg, #ffeb3b 50%, #000 50%);
    }

    &--rainbow {
      background: linear-gradient(135deg, #ff9a9e, #a8edea, #fed6e3);
    }

    &--dark {
      background: linear-gradient(160deg, #12121f, #4f5bd5);
    }
  }

  .theme-cta-text {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    strong {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--ink);
    }

    span {
      font-size: 13px;
      line-height: 1.5;
      color: var(--muted);
    }
  }

  .theme-cta-action {
    flex: 0 0 auto;
    padding: 10px 16px;
    border-radius: var(--border-radius);
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: var(--color-primary);
    box-shadow: 0 6px 16px rgba(88, 151, 251, 0.35);
    white-space: nowrap;

    @media (max-width: 768px) {
      align-self: stretch;
      text-align: center;
    }
  }

  /* Frameworks */
  .frameworks-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--spacing-half);

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .framework {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-quarter);
    padding: var(--spacing);
    border-radius: var(--border-radius);
    text-align: center;
    text-decoration: none;
    background: var(--surface-raised);
    border: 1px solid var(--surface-border);

    &--link {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 30px var(--accent);
        text-decoration: none;
      }
    }
  }

  .framework-logo {
    width: 48px;
    height: 48px;
  }

  .framework-logo--js {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 800;
    color: #1e293b;
    background: #f7df1e;
  }

  .framework-name {
    font-size: 16px;
    font-weight: 800;
    color: var(--ink);
  }

  .framework-note {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary);
  }

  /* ======================================================================
     Support — heartfelt, full width
     ====================================================================== */
  .support-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-half);
    padding: calc(var(--spacing) * 1.5) var(--spacing);
    border-radius: var(--border-radius);
    text-align: center;
    color: var(--on-dark);
    background:
      radial-gradient(
        ellipse 70% 100% at 50% 0%,
        rgba(88, 151, 251, 0.25),
        transparent 70%
      ),
      var(--chrome);
    border: 1px solid var(--chrome-border);
  }

  .support-heart {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    font-size: 30px;
    color: #fff;
    border-radius: 50%;
    background: linear-gradient(135deg, #5897fb 0%, #6366f1 100%);
    box-shadow: 0 12px 30px rgba(88, 151, 251, 0.4);
  }

  .support-cta h2 {
    margin: 0;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .support-cta > p {
    max-width: 640px;
    margin: 0;
    font-size: 16px;
    line-height: 1.7;
    color: var(--on-dark-muted);
  }

  .support-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-half);
    margin-top: var(--spacing-quarter);
  }

  .support-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    padding: 0 26px;
    border-radius: var(--border-radius);
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      text-decoration: none;
    }

    &--primary {
      color: #fff;
      background: var(--color-primary);
      box-shadow: 0 10px 30px rgba(88, 151, 251, 0.4);
    }

    &--coffee {
      color: var(--ink);
      background: #ffdd00;
    }
  }

  .support-thanks {
    margin: var(--spacing-quarter) 0 0;
    font-size: 14px;
    color: var(--on-dark-muted);
  }
}

/* ============================================================================
   Product search — price styled and pushed to the right in BOTH the option
   list (rendered into document.body) and the selected value (inside .ss-main).
   These must live outside #home because the dropdown content is portaled.
   ============================================================================ */
.product-ss.ss-main .ss-single,
.product-ss.ss-content .ss-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-half);
}

.product-ss .product-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-ss .product-price {
  flex: 0 0 auto;
  margin-left: auto;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary);
}

.product-ss.ss-content .ss-option:hover .product-price,
.product-ss.ss-content .ss-option.ss-selected .product-price,
.product-ss.ss-content .ss-option.ss-highlighted .product-price {
  color: var(--ss-bg-color);
  opacity: 0.92;
}

/* Country flags — dropdown content is portaled to document.body */
.country-ss .flag,
.country-ss.ss-main .ss-single .flag {
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
}
</style>
