<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Deselect',
  mounted() {
    new SlimSelect({
      select: this.$refs.allowDeselectSingle as HTMLSelectElement,
      settings: {
        allowDeselect: true,
      },
    })

    new SlimSelect({
      select: this.$refs.allowDeselectMultiple as HTMLSelectElement,
      settings: {
        allowDeselect: true,
      },
    })
  },
})
</script>

<template>
  <div id="allowDeselect" class="content">
    <h2 class="header">allowDeselect</h2>
    <p>This will allow you to deselect a value on a single/multiple select dropdown.</p>
    <p>Be sure to have an empty option data placeholder so slim select has an empty string value to select.</p>

    <div class="row">
      <select ref="allowDeselectSingle">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="allowDeselectMultiple" multiple>
        <option data-placeholder="true"></option>
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
            allowDeselect: true
          }
        })
      </code>
    </pre>
    <pre>
      <code class="language-html">
        &lt;!-- Requires emtpy data-placeholder option --&gt;
        &lt;select id="allowDeselect"&gt;
          &lt;option data-placeholder="true"&gt;&lt;/option&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
