<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Css',
  mounted() {
    new SlimSelect({ select: this.$refs.selectClass as HTMLSelectElement })
    new SlimSelect({ select: this.$refs.optionClass as HTMLSelectElement })
  },
  components: {
    ShikiStyle
  }
})
</script>

<style lang="scss">
.select-class.ss-main {
  background-color: #5897fb;
  color: white;
  border: none;

  .ss-arrow * {
    border-color: white;
  }
}

.ss-option {
  &.red {
    color: white;
    background-color: red;
  }
  &.green {
    color: white;
    background-color: green;
  }
  &.blue {
    color: white;
    background-color: blue;
  }
}
</style>

<template>
  <div id="cssClass" class="content">
    <h2 class="header">css class</h2>
    <p>
      SlimSelect automatically inherits any CSS classes that were applied to the original select element and its
      options. This seamless inheritance allows you to maintain your existing styling while gaining all the enhanced
      functionality of SlimSelect.
    </p>
    <p>
      This feature ensures that your custom CSS classes, whether applied to the main select element or individual
      options, are preserved and applied to the corresponding SlimSelect elements, making the transition from native
      selects to SlimSelect completely transparent from a styling perspective.
    </p>

    <div class="row">
      <select ref="selectClass" class="select-class">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="optionClass" class="option-class">
        <option class="red" value="value1">Red</option>
        <option class="green" value="value2">Green</option>
        <option class="blue" value="value3">Blue</option>
      </select>
    </div>

    <ShikiStyle language="html">
      <pre>
        &lt;select id="select-class" class="classItems"&gt;
          &lt;option class="red" value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option class="green" value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option class="blue" value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
