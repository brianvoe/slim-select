<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'MaxValuesShown',
  mounted() {
    new SlimSelect({
      select: this.$refs.maxValuesShown as HTMLSelectElement,
      settings: {
        maxValuesShown: 5,
        maxValuesMessage: '{number} selected',
        allowDeselect: true,
      },
    })
  },
})
</script>

<template>
  <div id="maxValuesShown" class="content">
    <h2 class="header">maxValuesShown</h2>
    <p>
      When using multiselect you can set a threshold so when selecting more items than the input value, the items will
      not display as values, but the 'n selected' will be displayed. The text that will be displayed can be customized
      with the use of '{number}' in the maxValuesMessage setting.
    </p>
    <p><strong>Default:</strong> 20</p>

    <div class="row">
      <select ref="maxValuesShown" multiple>
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

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            maxValuesShown: 5, // Default 20
            maxValuesMessage: '{number} values selected', // Default '{number} selected'
          },
        });
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="maxValuesShown" multiple&gt;
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
