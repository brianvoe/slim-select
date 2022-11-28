<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'SelectedChipsLimit',
  mounted() {
    const selectedChipsLimitSelect = new SlimSelect({
      settings: {
        selectedChipsLimit: 5,
        selectedChipsLimitMessage: '$NUMBER selected',
        allowDeselect: true,
      },
      select: this.$refs.selectedChipsLimit as HTMLSelectElement,
    })
  },
})
</script>

<template>
  <div id="selectedChipsLimit" class="content">
    <h2 class="header">selectedChipsLimit</h2>
    <p>
      When using multiselect you can set a threshold so when selecting more items than the input value, the items will
      not display as chips, but the 'Selected (n items)' will be displayed. The text that will be displayed can be
      customized with the use of '$NUMBER' in the valuesThresholdFormat setting.
    </p>

    <div class="row">
      <select ref="selectedChipsLimit" multiple>
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

    <pre>
      <code class="language-javascript">
        const slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            selectedChipsLimit: 5,
            selectedChipsLimitMessage: '$NUMBER selected',
          },
        });
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="selectedChipsLimit" multiple&gt;
          &lt;option value="value1" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
          &lt;option value="value3" selected&gt;Value 3&lt;/option&gt;
          &lt;option value="value4" selected&gt;Value 4&lt;/option&gt;
          &lt;option value="value5" selected&gt;Value 5&lt;/option&gt;
          &lt;option value="value6"&gt;Value 6&lt;/option&gt;
          &lt;option value="value7"&gt;Value 7&lt;/option&gt;
          &lt;option value="value8"&gt;Value 8&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
