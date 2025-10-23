<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'ShowTooltip',
  mounted() {
    new SlimSelect({
      select: this.$refs.showOptionTooltips as HTMLSelectElement,
      settings: {
        showOptionTooltips: true
      }
    })
  }
})
</script>

<template>
  <div id="showOptionTooltips" class="content">
    <h2 class="header">showOptionTooltips</h2>
    <p>
      The showOptionTooltips setting enables hover tooltips for select options, providing additional context and
      information to users when they hover over options. This is particularly useful for options with long text that
      might be truncated or when you want to provide additional details about each option.
    </p>
    <p>
      When enabled, tooltips automatically display the full text content of each option when users hover over them,
      ensuring that users can always see the complete information even when space is limited or text is truncated in the
      dropdown interface.
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
