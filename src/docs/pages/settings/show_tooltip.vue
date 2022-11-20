<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'ShowTooltip',
  mounted() {
    new SlimSelect({
      select: this.$refs.showOptionTooltips as HTMLSelectElement,
      settings: {
        showOptionTooltips: true,
      },
    })
  },
})
</script>

<template>
  <div id="showOptionTooltips" class="content">
    <h2 class="header">showOptionTooltips</h2>
    <p>
      showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text
      is equal to the option text content.
    </p>

    <select ref="showOptionTooltips">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      </code>
    </pre>
  </div>
</template>
