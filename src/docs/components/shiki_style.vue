<script lang="ts">
import { defineComponent } from 'vue'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import shikiWasm from 'shiki/wasm'
import ShikiStyle from 'shiki_style.vue'

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
      highlighter: null as Awaited<ReturnType<typeof createHighlighterCore>> | null,
      highlightedCode: ''
    }
  },
  async created() {
    const highlighter = await createHighlighterCore({
      themes: [githubDark, githubLight],
      langs: [bash, css, html, javascript, typescript, vue],
      langAlias: {
        ts: 'typescript',
        node: 'javascript',
        nodejs: 'javascript',
        shell: 'bash',
        shellscript: 'bash'
      },
      engine: createOnigurumaEngine(shikiWasm)
    })

    this.highlighter = highlighter
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
  unmounted() {
    if (this.highlighter) {
      this.highlighter.dispose()
    }
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
  },
  components: {
    ShikiStyle
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
