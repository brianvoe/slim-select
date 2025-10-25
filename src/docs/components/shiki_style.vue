<script lang="ts">
import { defineComponent } from 'vue'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

// Themes
import githubDark from 'shiki/themes/github-dark.mjs'
import githubLight from 'shiki/themes/github-light.mjs'

// Languages
import bash from 'shiki/langs/bash.mjs'
import css from 'shiki/langs/css.mjs'
import html from 'shiki/langs/html.mjs'
import javascript from 'shiki/langs/javascript.mjs'
import typescript from 'shiki/langs/typescript.mjs'
import vue from 'shiki/langs/vue.mjs'

type Highlighter = Awaited<ReturnType<typeof createHighlighterCore>>

// Shiki singleton service
class ShikiService {
  private static instance: ShikiService
  private highlighter: Highlighter | null = null
  private initPromise: Promise<Highlighter> | null = null

  private constructor() {}

  public static getInstance(): ShikiService {
    if (!ShikiService.instance) {
      ShikiService.instance = new ShikiService()
    }
    return ShikiService.instance
  }

  public async getHighlighter(): Promise<Highlighter> {
    if (this.highlighter) {
      return this.highlighter
    }

    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = this.initializeHighlighter()
    this.highlighter = await this.initPromise
    return this.highlighter
  }

  private async initializeHighlighter(): Promise<Highlighter> {
    return await createHighlighterCore({
      themes: [githubDark, githubLight],
      langs: [bash, css, html, javascript, typescript, vue],
      langAlias: {
        ts: 'typescript',
        node: 'javascript',
        nodejs: 'javascript'
      },
      engine: createJavaScriptRegexEngine()
    })
  }

  public dispose(): void {
    if (this.highlighter) {
      this.highlighter.dispose()
      this.highlighter = null
    }
    this.initPromise = null
  }
}

export default defineComponent({
  name: 'ShikiStyle',
  props: {
    language: {
      type: String,
      default: 'javascript'
    }
  },
  data() {
    return {
      highlighter: null as Highlighter | null,
      highlightedCode: ''
    }
  },
  async created() {
    const shikiService = ShikiService.getInstance()
    this.highlighter = await shikiService.getHighlighter()
    this.highlightCode()

    this.$watch(
      () => this.$slots.default?.()[0]?.children?.toString(),
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          this.highlightCode()
        }
      }
    )
  },
  watch: {
    language() {
      this.highlightCode()
    }
  },
  methods: {
    highlightCode() {
      if (!this.highlighter) {
        return
      }

      let code = this.$slots.default?.()[0]?.children?.toString() || ''

      // Remove leading/trailing <pre> tags
      code = code.replace(/^<pre>/, '').replace(/<\/pre>$/, '')

      // Normalize indentation
      code = this.normalizeIndentation(code)

      this.highlightedCode = this.highlighter.codeToHtml(code, {
        lang: this.language,
        theme: 'github-dark'
      })
    },
    normalizeIndentation(code: string): string {
      const lines = code.split('\n')
      const minIndent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^ */)![0].length))
      return lines.map((line) => line.slice(minIndent)).join('\n')
    }
  }
})
</script>

<style lang="scss">
.shiki-style {
  display: flex;
  width: 100%;

  pre.shiki {
    min-width: 0;
    width: 100%;
    padding: var(--spacing);
    margin: 0;
    border-radius: var(--border-radius);
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>

<template>
  <div class="shiki-style" v-html="highlightedCode"></div>
</template>
