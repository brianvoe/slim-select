<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'MinMax',
  mounted() {
    new SlimSelect({
      select: this.$refs.selectMultiMax as HTMLSelectElement,
      settings: {
        allowDeselect: true,
        closeOnSelect: false,
        minSelected: 2,
        maxSelected: 5,
      },
      events: {
        addable: (value: string): string => {
          return value
        },
      },
    })
  },
})
</script>

<template>
  <div id="minmax" class="content">
    <h2 class="header">Min/Max Selected</h2>
    <p>When using multi select you can set a min and/or max on the amount of selections you can have.</p>

    <div class="row">
      <select ref="selectMultiMax" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <option value="value4">Value 4</option>
        <option value="value5">Value 5</option>
        <option value="value6">Value 6</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="selectMultiMax" multiple&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;option value="value4"&gt;Value 4&lt;/option&gt;
          &lt;option value="value5"&gt;Value 5&lt;/option&gt;
          &lt;option value="value6"&gt;Value 6&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
