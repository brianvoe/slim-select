<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'MinMax',
  mounted() {
    new SlimSelect({
      select: '#selectMultiMax',
      settings: {
        maxSelected: 2,
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">limit</h2>
    <p>When using multi select you can set a max on the amount of selections you can have.</p>

    <div class="set-content">
      <select id="selectMultiMax" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
        <code class="language-javascript">
          let slim = new SlimSelect({
            select: '#selectMultiMax',
            limit: 2
          })
        </code>
      </pre>

    <pre>
        <code class="language-html">
          &lt;select id="selectMultiMax" multiple&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
  </div>
</template>
