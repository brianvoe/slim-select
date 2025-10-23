<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Styles',
  mounted() {
    new SlimSelect({ select: this.$refs.selectStyle as HTMLSelectElement })
    new SlimSelect({ select: this.$refs.optionStyle as HTMLSelectElement })
  }
})
</script>

<template>
  <div id="inlineStyles" class="content">
    <h2 class="header">inline styles</h2>
    <p>
      SlimSelect automatically inherits any inline styles that were applied to the original select element and its
      options. This ensures that your existing styling, whether applied through inline styles or CSS classes, is
      seamlessly preserved when SlimSelect transforms the element.
    </p>
    <p>
      This feature allows you to apply custom styling directly to your HTML elements and have those styles automatically
      carried over to the enhanced SlimSelect interface, maintaining visual consistency and reducing the need for
      additional CSS modifications.
    </p>

    <div class="row">
      <select ref="selectStyle" style="color: red">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="optionStyle">
        <option style="color: red" value="value1">Red</option>
        <option style="color: green">Green</option>
        <option style="color: blue">Blue</option>
      </select>
    </div>

    <pre>
      <code class="language-html">
        &lt;select id="select-style" style="color: red;"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;select id="option-style"&gt;
          &lt;option style="color: red;" value="value1"&gt;Red&lt;/option&gt;
          &lt;option style="color: green;"&gt;Green&lt;/option&gt;
          &lt;option style="color: blue;"&gt;Blue&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
