<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'SearchHighlight',
  data() {
    return {
      htmlData: [
        {
          text: 'United States',
          value: 'US',
          html: '<span style="color: #e74c3c;">🇺🇸</span> United States'
        },
        {
          text: 'Canada',
          value: 'CA',
          html: '<span style="color: #3498db;">🇨🇦</span> Canada'
        },
        {
          text: 'United Kingdom',
          value: 'UK',
          html: '<span style="color: #9b59b6;">🇬🇧</span> United Kingdom'
        },
        {
          text: 'Germany',
          value: 'DE',
          html: '<span style="color: #f39c12;">🇩🇪</span> Germany'
        },
        {
          text: 'France',
          value: 'FR',
          html: '<span style="color: #1abc9c;">🇫🇷</span> France'
        },
        {
          text: 'Japan',
          value: 'JP',
          html: '<span style="color: #e67e22;">🇯🇵</span> Japan'
        },
        {
          text: 'Australia',
          value: 'AU',
          html: '<span style="color: #16a085;">🇦🇺</span> Australia'
        },
        {
          text: 'Brazil',
          value: 'BR',
          html: '<span style="color: #27ae60;">🇧🇷</span> Brazil'
        }
      ]
    }
  },
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.searchHighlightSingle as HTMLSelectElement,
      settings: {
        searchHighlight: true
      }
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.searchHighlightMulti as HTMLSelectElement,
      settings: {
        searchHighlight: true
      }
    })

    // HTML example
    new SlimSelect({
      select: this.$refs.searchHighlightHtml as HTMLSelectElement,
      settings: {
        searchHighlight: true
      },
      data: this.htmlData
    })
  }
})
</script>

<template>
  <div id="searchHighlight" class="content">
    <h2 class="header">searchHighlight</h2>
    <p>
      Boolean value that will highlight matching text in search results. Default is false. When enabled, matching text
      will be highlighted with a <code>&lt;mark&gt;</code> element.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="searchHighlightSingle">
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="cpp">C++</option>
        <option value="ruby">Ruby</option>
        <option value="php">PHP</option>
        <option value="swift">Swift</option>
        <option value="kotlin">Kotlin</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
      </select>
    </div>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="searchHighlightMulti" multiple>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="cpp">C++</option>
        <option value="ruby">Ruby</option>
        <option value="php">PHP</option>
        <option value="swift">Swift</option>
        <option value="kotlin">Kotlin</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
      </select>
    </div>

    <div class="alert info">
      <strong>Tip:</strong> Try searching for "script", "Type", or even special characters like "#" or "+" to see the
      highlighting in action. The feature safely escapes special characters to prevent HTML breaking.
    </div>

    <h3>HTML Content with Search Highlighting</h3>
    <p>
      When using HTML in options, search highlighting intelligently highlights only the text content while preserving
      all HTML structure, styles, and elements.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="searchHighlightHtml"></select>
    </div>

    <div class="alert info">
      <strong>Try it:</strong> Search for "United", "States", "an", or even special characters like "&lt;" in the
      example above. Notice how the emoji flags and colors remain intact while only the matching text is highlighted.
    </div>

    <pre>
      <code class="language-javascript">
        // Basic usage
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchHighlight: true
          }
        })

        // With HTML content - highlighting preserves structure
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchHighlight: true
          },
          data: [
            {
              text: 'United States',
              value: 'US',
              html: '&lt;span style="color: red;"&gt;🇺🇸&lt;/span&gt; United States'
            },
            {
              text: 'Canada',
              value: 'CA',
              html: '&lt;span style="color: blue;"&gt;🇨🇦&lt;/span&gt; Canada'
            }
          ]
        })
      </code>
    </pre>
  </div>
</template>
