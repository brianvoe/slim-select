<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'MultiString',
  components: {
    HighlightStyle
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.multiString as HTMLSelectElement,
      settings: {
        multiString: true
      }
    })

    new SlimSelect({
      select: this.$refs.multiStringConstrained as HTMLSelectElement,
      settings: {
        multiString: true
      }
    })
  }
})
</script>

<style lang="scss">
#multiString {
  .constrained-container {
    max-width: 250px;
    margin-bottom: var(--spacing);
    padding: var(--spacing);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
  }
}
</style>

<template>
  <div id="multiString" class="content">
    <h2 class="header">multiString</h2>
    <p>
      The multiString setting changes how selected values are displayed in a multiple select. Instead of rendering each
      selected value as an individual tag with a delete button, the selected values are shown as a single line of comma
      separated text.
    </p>
    <p>
      The text stays on a single line and is truncated with an ellipsis when it exceeds the width of the container,
      keeping the select compact regardless of how many values are selected.
    </p>
    <p><strong>Default:</strong> false</p>

    <div class="row">
      <select ref="multiString" multiple>
        <option value="value1" selected>Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3" selected>Value 3</option>
        <option value="value4" selected>Value 4</option>
        <option value="value5" selected>Value 5</option>
        <option value="value6">Value 6</option>
        <option value="value7">Value 7</option>
        <option value="value8">Value 8</option>
      </select>
    </div>

    <h3>Limited space</h3>
    <p>When the select is in a narrow container, the comma separated text truncates with an ellipsis.</p>

    <div class="constrained-container">
      <select ref="multiStringConstrained" multiple>
        <option value="value1" selected>Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3" selected>Value 3</option>
        <option value="value4" selected>Value 4</option>
        <option value="value5" selected>Value 5</option>
        <option value="value6" selected>Value 6</option>
        <option value="value7">Value 7</option>
        <option value="value8">Value 8</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            multiString: true, // Default false
          },
        });
      </pre>
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;select id="multiString" multiple&gt;
          &lt;option value="value1" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
          &lt;option value="value3" selected&gt;Value 3&lt;/option&gt;
          &lt;option value="value4" selected&gt;Value 4&lt;/option&gt;
          &lt;option value="value5" selected&gt;Value 5&lt;/option&gt;
          &lt;option value="value6"&gt;Value 6&lt;/option&gt;
          &lt;option value="value7"&gt;Value 7&lt;/option&gt;
          &lt;option value="value8"&gt;Value 8&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>
  </div>
</template>
