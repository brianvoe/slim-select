<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'SeparateValues',
  components: {
    HighlightStyle
  },
  data() {
    return {
      valuesFirst: null as SlimSelect | null,
      searchFirst: null as SlimSelect | null
    }
  },
  mounted() {
    const panelSettings = (panel: HTMLElement) => ({
      alwaysOpen: true,
      closeOnSelect: false,
      hideSelected: true,
      modal: 'off' as const,
      contentPosition: 'relative' as const,
      contentLocation: panel
    })

    this.valuesFirst = new SlimSelect({
      select: this.$refs.tagsValuesFirst as HTMLSelectElement,
      settings: panelSettings(this.$refs.panelValuesFirst as HTMLElement)
    })

    this.searchFirst = new SlimSelect({
      select: this.$refs.tagsSearchFirst as HTMLSelectElement,
      settings: panelSettings(this.$refs.panelSearchFirst as HTMLElement)
    })
  },
  unmounted() {
    this.valuesFirst?.destroy()
    this.searchFirst?.destroy()
    this.valuesFirst = null
    this.searchFirst = null
  }
})
</script>

<style lang="scss">
#separateValues {
  .example {
    margin: var(--spacing-half) 0 var(--spacing);
  }

  .example h3 {
    margin-bottom: var(--spacing-quarter);
  }

  .picker {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    max-width: 480px;
    --ss-content-height: 180px;
  }

  // Values row — already a separate element from search
  .picker .ss-main {
    border: none;
    background: transparent;
    min-height: 0;
    padding: 0;
    box-shadow: none;
    cursor: default;

    &:focus {
      box-shadow: none;
    }
  }

  .picker .ss-content {
    width: 100% !important;
  }
}
</style>

<template>
  <div id="separateValues" class="content">
    <h2 class="header">Separate values</h2>
    <p>
      Selected values render in <code>.ss-main</code> and the search field renders in <code>.ss-content</code>. Pair
      <router-link to="/settings#alwaysOpen">alwaysOpen</router-link> with
      <router-link to="/settings#contentLocation">contentLocation</router-link> to keep those as two rows — chips in
      one, typing in the other. Put the panel after the <code>&lt;select&gt;</code> for values on top, or before it for
      search on top.
    </p>
    <p>
      <router-link to="/settings#hideSelected">hideSelected</router-link> is optional; it keeps chosen items out of the
      list so the panel feels like “type to add.” Set <code>modal: 'off'</code> so this layout stays in place on small
      screens.
    </p>

    <div class="example">
      <h3>Values above the input</h3>
      <div class="picker">
        <select id="tags-values-first" ref="tagsValuesFirst" multiple>
          <option value="design" selected>Design</option>
          <option value="engineering" selected>Engineering</option>
          <option value="product">Product</option>
          <option value="marketing">Marketing</option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
        </select>
        <div ref="panelValuesFirst"></div>
      </div>
    </div>

    <div class="example">
      <h3>Input above the values</h3>
      <div class="picker">
        <div ref="panelSearchFirst"></div>
        <select id="tags-search-first" ref="tagsSearchFirst" multiple>
          <option value="design">Design</option>
          <option value="engineering" selected>Engineering</option>
          <option value="product" selected>Product</option>
          <option value="marketing">Marketing</option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
        </select>
      </div>
    </div>

    <h3>HTML</h3>
    <HighlightStyle language="html">
      <pre>
        &lt;!-- Values above the input: panel after the select --&gt;
        &lt;div class="picker"&gt;
          &lt;select id="tags" multiple&gt;
            &lt;option value="design" selected&gt;Design&lt;/option&gt;
            &lt;option value="engineering" selected&gt;Engineering&lt;/option&gt;
            &lt;option value="product"&gt;Product&lt;/option&gt;
          &lt;/select&gt;
          &lt;div id="tags-panel"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Input above the values: panel before the select --&gt;
        &lt;div class="picker"&gt;
          &lt;div id="tags-panel-search-first"&gt;&lt;/div&gt;
          &lt;select id="tags-search-first" multiple&gt;...&lt;/select&gt;
        &lt;/div&gt;
      </pre>
    </HighlightStyle>

    <h3>JavaScript</h3>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#tags',
          settings: {
            alwaysOpen: true,
            closeOnSelect: false,
            hideSelected: true,
            modal: 'off',
            contentPosition: 'relative',
            contentLocation: document.getElementById('tags-panel')
          }
        })
      </pre>
    </HighlightStyle>

    <h3>CSS</h3>
    <HighlightStyle language="css">
      <pre>
        .picker {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .picker .ss-main {
          border: none;
          background: transparent;
          min-height: 0;
          padding: 0;
          box-shadow: none;
          cursor: default;
        }
      </pre>
    </HighlightStyle>
  </div>
</template>
