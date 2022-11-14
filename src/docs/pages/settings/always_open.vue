<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'AlwaysOpen',
  mounted() {
    new SlimSelect({
      select: this.$refs.alwaysOpenSingle as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
      },
    })

    new SlimSelect({
      select: this.$refs.alwaysOpenMultiple as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">alwaysOpen</h2>
    <p>
      alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the
      options at all times.
    </p>

    <div class="row">
      <select ref="alwaysOpenSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>

      <select ref="alwaysOpenMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <br /><br /><br /><br />
    <br /><br /><br /><br />

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            alwaysOpen: true,
          }
        })
      </code>
    </pre>
  </div>
</template>
