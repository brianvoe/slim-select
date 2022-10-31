<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'SelectByGroup',
  mounted() {
    new SlimSelect({
      select: this.$refs.selectByGroup as HTMLSelectElement,
      settings: {
        selectByGroup: true,
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">selectByGroup</h2>
    <p>
      selectByGroup option is used to enable the selection of all options under a specific group by clicking that option
      group's label.
    </p>

    <select ref="selectByGroup" multiple>
      <optgroup label="Label 1">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </optgroup>
    </select>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectByGroup',
          settings: {
            selectByGroup: true
          }
        })
      </code>
    </pre>
  </div>
</template>
