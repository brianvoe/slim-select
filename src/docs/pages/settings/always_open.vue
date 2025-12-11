<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'AlwaysOpen',
  components: {
    HighlightStyle
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.alwaysOpenSingle as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentLocation: this.$refs.alwaysOpenSingleContent as HTMLElement,
        contentPosition: 'relative'
      }
    })

    new SlimSelect({
      select: this.$refs.alwaysOpenMultiple as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentLocation: this.$refs.alwaysOpenMultipleContent as HTMLElement,
        contentPosition: 'relative'
      }
    })
  }
})
</script>

<template>
  <div id="alwaysOpen" class="content">
    <h2 class="header">alwaysOpen</h2>
    <p>
      The alwaysOpen setting keeps the dropdown options visible at all times, transforming SlimSelect into a persistent
      list that users can interact with without needing to click to open it. This is particularly useful for creating
      custom interfaces that look more like lists or checkboxes.
    </p>
    <p>
      This setting is commonly used when you want to display options permanently, such as in sidebar filters,
      configuration panels, or any interface where the dropdown should behave more like a persistent selection list
      rather than a traditional dropdown.
    </p>

    <div class="row">
      <div style="height: auto">
        <select ref="alwaysOpenSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <div ref="alwaysOpenSingleContent"></div>
      </div>

      <div style="height: auto">
        <select ref="alwaysOpenMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
        </select>
        <div ref="alwaysOpenMultipleContent"></div>
      </div>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            alwaysOpen: true,

            // In various situations it may be useful to set the contentLocation
            // to an element that will display best
            contentLocation: document.getElementById('local'),
            contentPosition: 'relative',
          }
        })
      </pre>
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;select id="selectElement"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;!-- The content will go in this div --&gt;
        &lt;div id="local"&gt;&lt;/div&gt;
      </pre>
    </HighlightStyle>
  </div>
</template>
