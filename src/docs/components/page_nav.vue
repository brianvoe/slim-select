<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect, { type Option } from '@/slim-select'

export default defineComponent({
  name: 'PageNav',
  data() {
    return {
      sections: [] as { id: string; label: string }[],
      slim: null as SlimSelect | null,
      activeId: '',
      rafId: 0 as number
    }
  },
  watch: {
    '$route.path'() {
      this.scheduleScan()
    }
  },
  mounted() {
    this.scheduleScan()
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onScroll, { passive: true })
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onScroll)
    cancelAnimationFrame(this.rafId)
    this.destroySlim()
  },
  methods: {
    destroySlim() {
      if (this.slim) {
        this.slim.destroy()
        this.slim = null
      }
    },
    scheduleScan() {
      // Page content is lazy-loaded; scan after it renders, then once more to settle.
      this.$nextTick(() => {
        this.scanSections()
        window.setTimeout(this.scanSections, 350)
      })
    },
    slugify(text: string): string {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    },
    sectionLabel(el: HTMLElement): string {
      return (el.querySelector(':scope > .header')?.textContent || el.id).trim()
    },
    scanSections() {
      const root = document.querySelector('.app-content')
      const blocks = root
        ? Array.from(root.querySelectorAll<HTMLElement>('.content[id]'))
        : []

      let next: { id: string; label: string }[]

      if (blocks.length > 1) {
        // Multi-section page (settings, events, style…): one entry per .content[id]
        next = blocks.map((el) => ({ id: el.id, label: this.sectionLabel(el) }))
      } else if (blocks.length === 1) {
        // Single-content page (frameworks…): build from its headings instead
        const block = blocks[0]
        const heads = Array.from(
          block.querySelectorAll<HTMLElement>(':scope > h2.header, :scope > h3')
        )
        if (heads.length > 1) {
          const used = new Set<string>()
          next = heads.map((h) => {
            let id = h.id || this.slugify(h.textContent || '')
            while (id && used.has(id)) {
              id += '-x'
            }
            used.add(id)
            if (!h.id) {
              h.id = id
            }
            return { id, label: (h.textContent || '').trim() }
          })
        } else {
          next = [{ id: block.id, label: this.sectionLabel(block) }]
        }
      } else {
        next = []
      }

      const unchanged =
        next.length === this.sections.length &&
        next.every((s, i) => s.id === this.sections[i]?.id)
      if (unchanged) {
        return
      }

      this.sections = next
      this.$nextTick(this.buildSlim)
    },
    buildSlim() {
      this.destroySlim()
      if (!this.sections.length) {
        return
      }
      const select = this.$refs.tocSelect as HTMLSelectElement | undefined
      const content = this.$refs.tocContent as HTMLElement | undefined
      if (!select || !content) {
        return
      }

      this.slim = new SlimSelect({
        select,
        settings: {
          alwaysOpen: true,
          contentLocation: content,
          contentPosition: 'relative',
          searchPlaceholder: 'Jump to…'
        },
        data: this.sections.map((s) => ({ text: s.label, value: s.id })),
        events: {
          afterChange: (options: Option[]) => {
            const value = options[0]?.value
            if (value) {
              this.scrollToSection(value)
            }
          }
        }
      })
      this.activeId = ''
      this.updateActive()
    },
    headerHeight(): number {
      return (document.querySelector('.site-header') as HTMLElement)?.offsetHeight ?? 64
    },
    scrollToSection(id: string) {
      const el = document.getElementById(id)
      if (!el) {
        return
      }
      const offset = this.headerHeight() + 16
      window.scroll({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      })
    },
    onScroll() {
      cancelAnimationFrame(this.rafId)
      this.rafId = requestAnimationFrame(this.updateActive)
    },
    updateActive() {
      if (!this.sections.length || !this.slim) {
        return
      }
      const line = this.headerHeight() + 16
      let current = this.sections[0].id
      for (const section of this.sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top - line <= 0) {
          current = section.id
        }
      }
      if (current !== this.activeId) {
        this.activeId = current
        // runAfterChange=false so scroll-spy doesn't re-trigger a scroll
        this.slim.setSelected(current, false)
      }
    }
  }
})
</script>

<template>
  <aside v-show="sections.length" class="page-nav">
    <div class="page-nav-sticky">
      <p class="page-nav-title">On this page</p>
      <select ref="tocSelect" aria-label="On this page"></select>
      <div ref="tocContent" class="page-nav-content"></div>
    </div>
  </aside>
</template>

<style lang="scss">
.page-nav {
  grid-area: nav;
  // The grid item itself is sticky (align-self:start keeps it from stretching,
  // so it stays pinned while the taller content column scrolls past it).
  align-self: start;
  position: sticky;
  top: calc(var(--height-header) + var(--spacing-half));

  // Theme the SlimSelect TOC to blend with the dark chrome
  --ss-bg-color: var(--chrome);
  --ss-font-color: var(--on-dark);
  --ss-border-color: var(--chrome-border);
  --ss-primary-color: var(--color-primary);
  --ss-placeholder-color: var(--on-dark-muted);
  --ss-content-height: 60vh;
  --ss-scroll-color: var(--color-primary);
  --ss-track-color: var(--chrome);

  @media (max-width: 900px) {
    display: none;
  }
}

.page-nav-title {
  margin: 0 0 var(--spacing-quarter);
  padding: 0 2px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--on-dark-muted);
}

.page-nav-content .ss-content {
  // alwaysOpen list sits inline under the search box
  box-shadow: none;
}
</style>
