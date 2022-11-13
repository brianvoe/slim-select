<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'HideSelected',
  mounted() {
    new SlimSelect({
      select: this.$refs.hideSelectedSingle as HTMLSelectElement,
      settings: {
        hideSelected: true,
      },
    })

    new SlimSelect({
      select: this.$refs.hideSelectedMultiple as HTMLSelectElement,
      settings: {
        hideSelected: true,
      },
    })
  },
})
</script>

<template>
  <div id="hideSelected" class="content">
    <h2 class="header">hideSelected</h2>
    <p>hideSelected setting is used to hide the current selected option in the options dropdown.</p>

    <div class="row">
      <select ref="hideSelectedSingle">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="hideSelectedMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="hideSelectedSingle"&gt;
          &lt;option data-placeholder="true"&gt;&lt;/option&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;select id="hideSelectedMultiple"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
