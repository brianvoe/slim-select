<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'
import DocsModal from '@/docs/components/modal.vue'
import SlimSelect from '@/slim-select'

export interface ShowcaseVariables {
  primaryColor: string
  bgColor: string
  fontColor: string
  borderColor: string
  borderRadius: string
  placeholderColor?: string
  focusColor?: string
  spacingL?: string
  spacingM?: string
  spacingS?: string
  mainHeight?: string
  contentHeight?: string
  scrollColor?: string
  trackColor?: string
}

export interface ShowcaseTheme {
  id: string
  siteClass: string
  title: string
  tagline: string
  singleLabel: string
  multiLabel: string
  options: { text: string; value: string }[]
  multiOptions: { text: string; value: string }[]
  vars: ShowcaseVariables
  css: string
}

function showcaseMultiOptions(
  label: string,
  id: string,
  count = 48
): { text: string; value: string }[] {
  return Array.from({ length: count }, (_, index) => ({
    text: `${label} ${index + 1}`,
    value: `${id}-multi-${index + 1}`
  }))
}

const SHOWCASE_VAR_SECTIONS: { label: string; keys: string[] }[] = [
  {
    label: 'Colors',
    keys: [
      '--ss-primary-color',
      '--ss-bg-color',
      '--ss-font-color',
      '--ss-placeholder-color',
      '--ss-disabled-color',
      '--ss-border-color',
      '--ss-highlight-color',
      '--ss-focus-color',
      '--ss-success-color',
      '--ss-error-color',
      '--ss-scroll-color',
      '--ss-track-color'
    ]
  },
  {
    label: 'Heights',
    keys: [
      '--ss-main-height',
      '--ss-content-height',
      '--ss-modal-height',
      '--ss-modal-width',
      '--ss-search-height',
      '--ss-option-height'
    ]
  },
  {
    label: 'Spacing',
    keys: ['--ss-spacing-l', '--ss-spacing-m', '--ss-spacing-s']
  },
  {
    label: 'Misc',
    keys: [
      '--ss-animation-timing',
      '--ss-border-radius',
      '--ss-modal-z-index'
    ]
  }
]

function showcaseVarsMap(vars: ShowcaseVariables): Record<string, string> {
  const map: Record<string, string> = {
    '--ss-primary-color': vars.primaryColor,
    '--ss-bg-color': vars.bgColor,
    '--ss-font-color': vars.fontColor,
    '--ss-placeholder-color': vars.placeholderColor ?? '#8d8d8d',
    '--ss-border-color': vars.borderColor,
    '--ss-focus-color': vars.focusColor ?? vars.primaryColor,
    '--ss-scroll-color': vars.scrollColor ?? vars.primaryColor,
    '--ss-track-color': vars.trackColor ?? vars.bgColor,
    '--ss-content-height': vars.contentHeight ?? '180px',
    '--ss-search-height': 'var(--ss-main-height)',
    '--ss-option-height': 'var(--ss-main-height)',
    '--ss-border-radius': vars.borderRadius
  }

  if (vars.mainHeight) {
    map['--ss-main-height'] = vars.mainHeight
  }
  if (vars.spacingL) {
    map['--ss-spacing-l'] = vars.spacingL
  }
  if (vars.spacingM) {
    map['--ss-spacing-m'] = vars.spacingM
  }
  if (vars.spacingS) {
    map['--ss-spacing-s'] = vars.spacingS
  }

  return map
}

function showcaseVarsStyle(vars: ShowcaseVariables): Record<string, string> {
  return showcaseVarsMap(vars)
}

function showcaseVarsLines(vars: ShowcaseVariables): string[] {
  const map = showcaseVarsMap(vars)
  const lines: string[] = []

  for (const section of SHOWCASE_VAR_SECTIONS) {
    const sectionLines = section.keys
      .filter((key) => key in map)
      .map((key) => `  ${key}: ${map[key]};`)

    if (sectionLines.length > 0) {
      lines.push(`  /* ${section.label} */`, ...sectionLines)
    }
  }

  return lines
}

function varsToCssBlock(selector: string, vars: ShowcaseVariables): string {
  return `${selector} {\n${showcaseVarsLines(vars).join('\n')}\n}`
}

function showcaseVarsCss(vars: ShowcaseVariables): string {
  return varsToCssBlock('#root', vars)
}

function createTheme(
  theme: Omit<ShowcaseTheme, 'css' | 'multiOptions'> & {
    vars: ShowcaseVariables
  }
): ShowcaseTheme {
  return {
    ...theme,
    multiOptions: showcaseMultiOptions(theme.multiLabel, theme.id),
    css: showcaseVarsCss(theme.vars)
  }
}

const MODAL_THEME_STYLE_ID = 'showcase-modal-theme-vars'
const MODAL_OPEN_BODY_CLASS = 'showcase-modal-open'

type ModalSelectType = 'single' | 'multi'

const themes: ShowcaseTheme[] = [
  createTheme({
    id: 'neon',
    siteClass: 'theme-neon',
    title: 'NIGHT.CITY',
    tagline: 'Neon district portal',
    singleLabel: 'Access level',
    multiLabel: 'District zones',
    options: [
      { text: 'Street pass', value: 'street' },
      { text: 'Club VIP', value: 'club' },
      { text: 'Corp clearance', value: 'corp' },
      { text: 'Grid admin', value: 'admin' }
    ],
    vars: {
      primaryColor: '#ff00ff',
      bgColor: '#12002a',
      fontColor: '#00fff5',
      borderColor: '#00fff5',
      borderRadius: '4px',
      placeholderColor: '#b8fff9',
      focusColor: '#00fff5'
    }
  }),
  createTheme({
    id: 'brutal',
    siteClass: 'theme-brutalist',
    title: 'RAW FORM',
    tagline: 'Brutalist web collective',
    singleLabel: 'Tier',
    multiLabel: 'Services',
    options: [
      { text: 'BASIC', value: 'basic' },
      { text: 'PLUS', value: 'plus' },
      { text: 'MAX', value: 'max' },
      { text: 'ULTRA', value: 'ultra' }
    ],
    vars: {
      primaryColor: '#000000',
      bgColor: '#ffffff',
      fontColor: '#000000',
      borderColor: '#000000',
      borderRadius: '0px',
      placeholderColor: '#333333',
      focusColor: '#000000',
      mainHeight: '44px'
    }
  }),
  createTheme({
    id: 'rainbow',
    siteClass: 'theme-rainbow',
    title: 'Joyful Studio',
    tagline: 'Playful creative agency',
    singleLabel: 'Package type',
    multiLabel: 'Deliverables',
    options: [
      { text: 'Logo design', value: 'logo' },
      { text: 'Social pack', value: 'social' },
      { text: 'Web refresh', value: 'web' },
      { text: 'Full brand', value: 'brand' }
    ],
    vars: {
      primaryColor: '#e056fd',
      bgColor: '#ffffff',
      fontColor: '#5b2068',
      borderColor: '#ff9ff3',
      borderRadius: '20px',
      placeholderColor: '#9b59b6',
      focusColor: '#48dbfb'
    }
  }),
  createTheme({
    id: 'dark',
    siteClass: 'theme-dark',
    title: 'Nebula Analytics',
    tagline: 'Dark mode workspace',
    singleLabel: 'Billing plan',
    multiLabel: 'Report modules',
    options: [
      { text: 'Free trial', value: 'trial' },
      { text: 'Growth', value: 'growth' },
      { text: 'Scale', value: 'scale' },
      { text: 'Enterprise', value: 'enterprise' }
    ],
    vars: {
      primaryColor: '#4f5bd5',
      bgColor: '#252538',
      fontColor: '#f5f5ff',
      borderColor: '#3d3d5c',
      borderRadius: '8px',
      placeholderColor: '#a0a0b8',
      focusColor: '#4f5bd5'
    }
  }),
  createTheme({
    id: 'retro',
    siteClass: 'theme-retro',
    title: 'Arcade Rentals',
    tagline: 'NES era catalog · est. 1985',
    singleLabel: 'Pick your cabinet',
    multiLabel: 'Game bundle',
    options: [
      { text: 'Super Mario Bros.', value: 'mario' },
      { text: 'The Legend of Zelda', value: 'zelda' },
      { text: 'Metroid', value: 'metroid' },
      { text: 'Donkey Kong', value: 'dk' }
    ],
    vars: {
      primaryColor: '#e60012',
      bgColor: '#e3e3e3',
      fontColor: '#1a1a1a',
      borderColor: '#4d4d4d',
      borderRadius: '0px',
      placeholderColor: '#6d6d6d',
      focusColor: '#e60012'
    }
  }),
  createTheme({
    id: 'steam',
    siteClass: 'theme-steam',
    title: 'Brass & Gear Co.',
    tagline: "Victorian inventors' supply",
    singleLabel: 'Commission tier',
    multiLabel: 'Parts kit',
    options: [
      { text: 'Brass gear', value: 'gear' },
      { text: 'Steam valve', value: 'valve' },
      { text: 'Copper pipe', value: 'pipe' },
      { text: 'Clockwork spring', value: 'spring' }
    ],
    vars: {
      primaryColor: '#8b6914',
      bgColor: '#4a3a28',
      fontColor: '#f5e6c8',
      borderColor: '#b8860b',
      borderRadius: '4px',
      placeholderColor: '#d4af37',
      focusColor: '#d4af37'
    }
  }),
  createTheme({
    id: 'sunset',
    siteClass: 'theme-sunset',
    title: 'Sunset Vinyl',
    tagline: 'Independent record shop',
    singleLabel: 'Browse format',
    multiLabel: 'Build a crate',
    options: [
      { text: 'New arrivals', value: 'new' },
      { text: 'Vinyl LPs', value: 'vinyl' },
      { text: 'Cassettes', value: 'tape' },
      { text: 'Staff picks', value: 'picks' }
    ],
    vars: {
      primaryColor: '#ff6b4a',
      bgColor: '#2d1b4e',
      fontColor: '#ffe8d6',
      borderColor: '#ff8f6b',
      borderRadius: '8px',
      placeholderColor: '#c9a0b8',
      focusColor: '#ffb347'
    }
  }),
  createTheme({
    id: 'botanical',
    siteClass: 'theme-botanical',
    title: 'Verdant Path',
    tagline: 'Wellness & retreat booking',
    singleLabel: 'Retreat package',
    multiLabel: 'Activities',
    options: [
      { text: 'Day spa', value: 'spa' },
      { text: 'Forest walk', value: 'forest' },
      { text: 'Mountain lodge', value: 'lodge' },
      { text: 'Full immersion', value: 'immersion' }
    ],
    vars: {
      primaryColor: '#66bb6a',
      bgColor: '#ffffff',
      fontColor: '#2e5d34',
      borderColor: '#81c784',
      borderRadius: '12px',
      placeholderColor: '#81c784',
      focusColor: '#1b5e20'
    }
  })
]

export default defineComponent({
  name: 'Showcase',
  components: {
    DocsModal,
    HighlightStyle
  },
  data() {
    return {
      themes,
      instances: [] as SlimSelect[],
      modalInstances: {} as Record<string, SlimSelect>,
      activeModalThemeId: null as string | null,
      openCss: null as string | null
    }
  },
  computed: {
    cssModalTheme(): ShowcaseTheme | null {
      if (!this.openCss) {
        return null
      }

      return this.themes.find((theme) => theme.id === this.openCss) || null
    }
  },
  mounted() {
    const root = document.getElementById('showcase')
    if (!root) {
      return
    }

    this.themes.forEach((theme) => {
      const single = root.querySelector(
        `#showcase-${theme.id}`
      ) as HTMLSelectElement | null
      const multi = root.querySelector(
        `#showcase-${theme.id}-multi`
      ) as HTMLSelectElement | null

      const baseSettings = {
        modal: 'off' as const,
        contentPosition: 'relative' as const
      }

      if (single) {
        const contentLocation = single.parentElement as HTMLElement | null

        this.instances.push(
          new SlimSelect({
            select: single,
            settings: {
              ...baseSettings,
              contentLocation: contentLocation ?? undefined
            },
            data: theme.options
          })
        )
      }

      if (multi) {
        const contentLocation = multi.parentElement as HTMLElement | null

        this.instances.push(
          new SlimSelect({
            select: multi,
            settings: {
              ...baseSettings,
              closeOnSelect: false,
              contentLocation: contentLocation ?? undefined
            },
            data: theme.multiOptions
          })
        )
      }
    })
  },
  unmounted() {
    this.instances.forEach((instance) => instance.destroy())
    this.instances = []
    this.destroyModalInstances()
    this.clearModalTheme()
  },
  methods: {
    showcaseVarsStyle,
    modalInstanceKey(themeId: string, type: ModalSelectType) {
      return `${themeId}-${type}`
    },
    openCssModal(id: string) {
      this.openCss = id
    },
    closeCssModal() {
      this.openCss = null
    },
    tryModal(theme: ShowcaseTheme, type: ModalSelectType) {
      this.applyModalTheme(theme)
      const instance = this.getOrCreateModalInstance(theme, type)
      instance.open()
    },
    applyModalTheme(theme: ShowcaseTheme) {
      this.activeModalThemeId = theme.id
      document.body.classList.add(MODAL_OPEN_BODY_CLASS)

      let style = document.getElementById(
        MODAL_THEME_STYLE_ID
      ) as HTMLStyleElement | null
      if (!style) {
        style = document.createElement('style')
        style.id = MODAL_THEME_STYLE_ID
        document.head.appendChild(style)
      }

      const varsBlock = showcaseVarsLines(theme.vars).join('\n')

      style.textContent = `
        body.${MODAL_OPEN_BODY_CLASS} .ss-modal-overlay {
${varsBlock}
        }
      `
    },
    clearModalTheme() {
      this.activeModalThemeId = null
      document.body.classList.remove(MODAL_OPEN_BODY_CLASS)
      document.getElementById(MODAL_THEME_STYLE_ID)?.remove()
    },
    getOrCreateModalInstance(
      theme: ShowcaseTheme,
      type: ModalSelectType
    ): SlimSelect {
      const key = this.modalInstanceKey(theme.id, type)
      const existing = this.modalInstances[key]
      if (existing) {
        return existing
      }

      const root = document.getElementById('showcase')
      const selectId =
        type === 'single'
          ? `showcase-${theme.id}-modal-single`
          : `showcase-${theme.id}-modal-multi`
      const select = root?.querySelector(`#${selectId}`) as HTMLSelectElement

      const instance = new SlimSelect({
        select,
        settings: {
          showSearch: false,
          modal: 'on',
          closeOnSelect: type === 'single'
        },
        data: type === 'single' ? theme.options : theme.multiOptions,
        events: {
          afterClose: () => {
            if (this.activeModalThemeId === theme.id) {
              this.clearModalTheme()
            }
          }
        }
      })

      this.modalInstances[key] = instance
      return instance
    },
    destroyModalInstances() {
      Object.values(this.modalInstances).forEach((instance) =>
        instance.destroy()
      )
      this.modalInstances = {}
    }
  }
})
</script>

<style lang="scss">
#showcase {
  .intro {
    margin: 0;
    line-height: 1.6;
  }

  .showcase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing);
  }

  .showcase-site {
    position: relative;
    display: flex;
    flex-direction: column;
    // min-height: 280px;
    border-radius: var(--border-radius);
    overflow: visible;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

    &:focus-within {
      z-index: 2;
    }

    .site-chrome {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--spacing-half);
      padding: var(--spacing-half);
    }

    .site-chrome-text {
      flex: 1 1 auto;
      min-width: 0;
    }

    .show-css-btn {
      flex: 0 0 auto;
      height: 20px;
      margin: 0;
      padding: 4px 8px;
      font-size: 10px;
      font-weight: 600;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: inherit;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid currentColor;
      border-radius: 4px;
      cursor: pointer;
      opacity: 0.85;

      &:hover {
        opacity: 1;
      }
    }

    .site-title {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .site-tagline {
      margin: 4px 0 0;
      font-size: 11px;
      opacity: 0.85;
    }

    .site-body {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-half);
      padding: var(--spacing-half);
    }

    label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
    }

    .showcase-label-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-half);
      height: 30px;
      margin: 0;
      padding: 0;
      line-height: 1;
    }

    .try-modal-link {
      flex: 0 0 auto;
      height: 20px;
      margin: 0;
      padding: 0;
      font-size: 11px;
      font-weight: 400;
      line-height: 1;
      color: inherit;
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.75;
      text-decoration: underline;
      text-underline-offset: 1px;

      &:hover {
        opacity: 1;
      }
    }

    .showcase-modal-select {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .showcase-modal-select + .ss-main {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      opacity: 0;
      pointer-events: none;
    }

    .showcase-select {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .showcase-select-field {
      position: relative;
      margin: -3px 0 0;
      padding: 0;

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

      &:focus-within {
        z-index: 1;
      }

      .ss-content {
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0;
        width: 100% !important;
        height: auto !important;
        margin: 0 !important;
      }
    }
  }

  // Site chrome themes
  .theme-dark {
    background: linear-gradient(160deg, #12121f 0%, #1e1e32 100%);
    color: #e8eaf6;
    font-family: 'Montserrat', sans-serif;

    .site-chrome {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
  }

  .theme-retro {
    background: linear-gradient(180deg, #c8c8c8 0%, #9a9a9a 100%);
    color: #1a1a1a;
    font-family: 'Arial Black', Arial, sans-serif;
    border: 3px solid #4d4d4d;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.45),
      0 8px 24px rgba(0, 0, 0, 0.18);

    .site-chrome {
      background: #e60012;
      color: #ffffff;
      border-bottom: 4px solid #1a1a1a;
    }

    .site-title {
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      text-shadow: 2px 2px 0 #9b0009;
    }

    .site-tagline {
      color: #ffe0e0;
      opacity: 1;
    }

    .show-css-btn {
      color: #ffffff;
      border-color: #ffffff;
      background: rgba(0, 0, 0, 0.2);
    }

    .try-modal-link {
      color: #1a1a1a;
    }
  }

  .theme-steam {
    background: linear-gradient(180deg, #3d2b1f 0%, #2a1d14 100%);
    color: #e8d5b5;
    font-family: Georgia, 'Times New Roman', serif;

    .site-chrome {
      border-bottom: 1px solid #8b6914;
      background: rgba(0, 0, 0, 0.2);
    }

    .site-title {
      color: #d4af37;
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

    .site-chrome {
      background: rgba(255, 255, 255, 0.45);
      backdrop-filter: blur(4px);
    }
  }

  .theme-neon {
    background: #0a0014;
    color: #00fff5;
    font-family: 'Montserrat', sans-serif;

    .site-chrome {
      border-bottom: 1px solid #ff00ff;
      box-shadow: 0 0 12px rgba(255, 0, 255, 0.3);
    }

    .site-title {
      color: #ff00ff;
      text-shadow: 0 0 8px #ff00ff;
    }
  }

  .theme-sunset {
    background: linear-gradient(160deg, #1a0f2e 0%, #3d2458 45%, #5c2d42 100%);
    color: #ffe8d6;
    font-family: Georgia, 'Times New Roman', serif;

    .site-chrome {
      border-bottom: 1px solid rgba(255, 143, 107, 0.45);
      background: rgba(0, 0, 0, 0.15);
    }

    .site-title {
      color: #ffb347;
      font-style: italic;
    }

    .show-css-btn {
      background: rgba(255, 107, 74, 0.15);
      border-color: #ff8f6b;
    }
  }

  .theme-brutalist {
    background: #fff;
    color: #000;
    font-family: 'Arial Black', Arial, sans-serif;
    border: 4px solid #000;

    .site-chrome {
      border-bottom: 4px solid #000;
      background: #ffeb3b;
    }

    .site-title {
      text-transform: uppercase;
      font-size: 14px;
    }

    .show-css-btn {
      border-width: 2px;
      border-radius: 0;
    }
  }

  .theme-botanical {
    background: linear-gradient(180deg, #e8f5e9 0%, #f1f8e9 100%);
    color: #2e5d34;
    font-family: Georgia, serif;

    .site-chrome {
      border-bottom: 1px solid #a5d6a7;
    }

    .site-title {
      color: #1b5e20;
    }
  }
}
</style>

<template>
  <div id="showcase" class="content">
    <h2 class="header">showcase</h2>
    <p class="intro">
      Each example is a mini site styled with SlimSelect
      <strong>css variables</strong> only — no overrides on classes necessary.
      Click a select to try it, or <strong>try modal</strong> beside each label
      to open that field in modal mode. Use <strong>Show CSS</strong> to copy a
      theme's variables for your own project.
    </p>

    <div class="showcase-grid">
      <div
        v-for="theme in themes"
        :key="theme.id"
        :class="['showcase-site', theme.siteClass]"
        :style="showcaseVarsStyle(theme.vars)"
      >
        <div class="site-chrome">
          <div class="site-chrome-text">
            <h3 class="site-title">{{ theme.title }}</h3>
            <p class="site-tagline">{{ theme.tagline }}</p>
          </div>
          <button
            type="button"
            class="show-css-btn"
            @click="openCssModal(theme.id)"
          >
            Show CSS
          </button>
        </div>

        <div class="site-body">
          <div class="showcase-select">
            <div class="showcase-label-row">
              <label :for="`showcase-${theme.id}`">{{
                theme.singleLabel
              }}</label>
              <button
                type="button"
                class="try-modal-link"
                @click="tryModal(theme, 'single')"
              >
                try modal
              </button>
            </div>
            <div class="showcase-select-field">
              <select :id="`showcase-${theme.id}`"></select>
            </div>
            <select
              :id="`showcase-${theme.id}-modal-single`"
              class="showcase-modal-select"
              tabindex="-1"
              aria-hidden="true"
            ></select>
          </div>
          <div class="showcase-select">
            <div class="showcase-label-row">
              <label :for="`showcase-${theme.id}-multi`">{{
                theme.multiLabel
              }}</label>
              <button
                type="button"
                class="try-modal-link"
                @click="tryModal(theme, 'multi')"
              >
                try modal
              </button>
            </div>
            <div class="showcase-select-field">
              <select :id="`showcase-${theme.id}-multi`" multiple></select>
            </div>
            <select
              :id="`showcase-${theme.id}-modal-multi`"
              class="showcase-modal-select"
              multiple
              tabindex="-1"
              aria-hidden="true"
            ></select>
          </div>
        </div>
      </div>
    </div>

    <DocsModal
      :open="!!cssModalTheme"
      :title="cssModalTheme ? `${cssModalTheme.title} CSS` : ''"
      @close="closeCssModal"
    >
      <HighlightStyle v-if="cssModalTheme" language="css">{{
        cssModalTheme.css
      }}</HighlightStyle>
    </DocsModal>
  </div>
</template>
