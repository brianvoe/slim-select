<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Keyboard',
  components: {
    HighlightStyle
  },
  data() {
    return {
      instance: null as SlimSelect | null,
      typeahead: null as SlimSelect | null
    }
  },
  mounted() {
    this.instance = new SlimSelect({
      select: this.$refs.keyboardMulti as HTMLSelectElement,
      settings: {
        placeholderText: 'Select tags…',
        closeOnSelect: false
      }
    })

    this.typeahead = new SlimSelect({
      select: this.$refs.typeahead as HTMLSelectElement,
      settings: {
        showSearch: false
      }
    })
  },
  unmounted() {
    this.instance?.destroy()
    this.instance = null
    this.typeahead?.destroy()
    this.typeahead = null
  }
})
</script>

<style lang="scss">
#keyboard {
  .form-group {
    margin: var(--spacing) 0;

    label {
      display: block;
      margin-bottom: var(--spacing-quarter);
      font-weight: 600;
    }
  }

  kbd {
    display: inline-block;
    padding: 0.1em 0.45em;
    font-size: 0.85em;
    font-family: inherit;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-bg, #f4f4f4);
  }

  ul {
    margin-top: 0;
  }
}
</style>

<template>
  <div id="keyboard" class="content">
    <h2 class="header">Keyboard values</h2>
    <p>
      With the dropdown open, focus stays in the search field so you can keep adding matches. When the search box is
      empty, <kbd>Left</kbd> and <kbd>Right</kbd> move a highlight across the selected values. <kbd>Backspace</kbd> or
      <kbd>Delete</kbd> removes the highlighted value. Typing or <kbd>Up</kbd> / <kbd>Down</kbd> returns to the options
      list.
    </p>

    <div class="form-group">
      <label for="keyboard-multi">Tags</label>
      <select id="keyboard-multi" ref="keyboardMulti" multiple>
        <option value="design" selected>Design</option>
        <option value="engineering" selected>Engineering</option>
        <option value="product" selected>Product</option>
        <option value="marketing">Marketing</option>
        <option value="support">Support</option>
        <option value="sales">Sales</option>
      </select>
    </div>

    <ul>
      <li>Open the select, then press <kbd>Left</kbd> with an empty search to highlight the last selected value.</li>
      <li>
        Press <kbd>Left</kbd> / <kbd>Right</kbd> to move between values. <kbd>Right</kbd> from the last value returns to
        the search field.
      </li>
      <li>Press <kbd>Backspace</kbd> to remove the highlighted value, or the last value if none is highlighted.</li>
      <li>If the search field has text, <kbd>Left</kbd> and <kbd>Right</kbd> move the caret as usual.</li>
    </ul>

    <h3>HTML</h3>
    <HighlightStyle language="html">
      <pre>
        &lt;select id="tags" multiple&gt;
          &lt;option value="design" selected&gt;Design&lt;/option&gt;
          &lt;option value="engineering" selected&gt;Engineering&lt;/option&gt;
          &lt;option value="product" selected&gt;Product&lt;/option&gt;
          &lt;option value="marketing"&gt;Marketing&lt;/option&gt;
        &lt;/select&gt;

        &lt;script&gt;
          new SlimSelect({
            select: '#tags',
            settings: {
              closeOnSelect: false
            }
          })
        &lt;/script&gt;
      </pre>
    </HighlightStyle>

    <h3>Type to jump</h3>
    <p>
      Turn search off and the control behaves like a native <code>&lt;select&gt;</code>. Type a letter or digit to open
      the list and highlight the matching option. Keep typing within about a second to narrow it (<kbd>h</kbd> then
      <kbd>a</kbd> moves from Horse to Hamster). The same letter again cycles through matches. <kbd>Enter</kbd> or
      <kbd>Space</kbd> selects the highlight.
    </p>

    <div class="form-group">
      <label for="keyboard-typeahead">Animals</label>
      <select id="keyboard-typeahead" ref="typeahead">
        <option value="apple">Apple</option>
        <option value="apricot">Apricot</option>
        <option value="banana">Banana</option>
        <option value="blueberry">Blueberry</option>
        <option value="horse">Horse</option>
        <option value="hamster">Hamster</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#animals',
          settings: {
            showSearch: false
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
