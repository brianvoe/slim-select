<script lang="ts">
import { defineComponent } from 'vue';

import SlimSelect from '../../../slim-select';

export default defineComponent({
  name: 'KeepOrder',
  mounted() {
    new SlimSelect({
      select: this.$refs.keepOrder as HTMLSelectElement,
      settings: {
        keepOrder: true,
      },
    })
  },
})
</script>

<template>
  <div id="keepOrder" class="content">
    <h2 class="header">keepOrder</h2>
    <p>
      keepOrder if true will maintain the order in which options are selected.
      If true the selected options order will be in the order of the dropdown options.
      As long as slim select isnt fully rerendered the order will be maintained.
    </p>
    <p>Values: <strong>true</strong> | <strong>false</strong></p>
    <p>Default: <strong>false</strong></p>

    <div class="row">
      <select ref="keepOrder" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <optgroup label="Label 1">
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </optgroup>
        <optgroup label="Label 2">
          <option value="value7">Value 7</option>
          <option value="value8">Value 8</option>
          <option value="value9">Value 9</option>
        </optgroup>
      </select>
    </div>
    <br />

    <h3>Via html</h3>
    <pre>
      <code class="language-html">
        &lt;select ref="closable" multiple&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;optgroup label="Label 1"&gt;
            &lt;option value="value4"&gt;Value 4&lt;/option&gt;
            &lt;option value="value5"&gt;Value 5&lt;/option&gt;
            &lt;option value="value6"&gt;Value 6&lt;/option&gt;
          &lt;/optgroup&gt;
          &lt;optgroup label="Label 2"&gt;
            &lt;option value="value7"&gt;Value 7&lt;/option&gt;
            &lt;option value="value8"&gt;Value 8&lt;/option&gt;
            &lt;option value="value9"&gt;Value 9&lt;/option&gt;
          &lt;/optgroup&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
