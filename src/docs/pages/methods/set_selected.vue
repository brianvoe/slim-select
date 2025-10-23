<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'SetSelected',
  data() {
    return {
      selectedSingle: null as SlimSelect | null,
      selectedMultiple: null as SlimSelect | null,
      selectedKeepOrder: null as SlimSelect | null
    }
  },
  mounted() {
    this.selectedSingle = new SlimSelect({
      select: this.$refs.selectedSingle as HTMLSelectElement
    })
    this.selectedMultiple = new SlimSelect({
      select: this.$refs.selectedMultiple as HTMLSelectElement
    })
    this.selectedKeepOrder = new SlimSelect({
      select: this.$refs.selectedKeepOrder as HTMLSelectElement,
      settings: {
        keepOrder: true
      }
    })
  },
  methods: {
    setSelected() {
      this.selectedSingle!.open()
      this.selectedSingle!.setSelected('value2')
      this.selectedMultiple!.open()
      this.selectedMultiple!.setSelected(['value1', 'value3'])
      this.selectedKeepOrder!.open()
      this.selectedKeepOrder!.setSelected(['value3', 'value1'])

      setTimeout(() => {
        this.selectedSingle!.close()
        this.selectedMultiple!.close()
        this.selectedKeepOrder!.close()
      }, 2000)
    }
  }
})
</script>

<template>
  <div id="setSelected" class="content">
    <h2 class="header">setSelected</h2>
    <p>
      The setSelected method allows you to programmatically set the selected values in a SlimSelect instance. This is particularly useful for initializing selections, responding to external events, or implementing complex selection logic based on other application state.
    </p>
    <p>
      The method accepts either a single string value or an array of strings, making it flexible for both single-select and multi-select scenarios. Additionally, you can control whether the afterChange event is triggered by providing a second boolean parameter, giving you fine-grained control over when selection events fire.
    </p>

    <div class="row">
      <div class="btn" @click="setSelected">Set Selected</div>

      <select ref="selectedSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>

      <select ref="selectedMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>

      <select ref="selectedKeepOrder" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement'

          // Optional - If you want to keep the order of the selected values
          // settings: { keepOrder: true }
        })
        select.setSelected('value1' /* or */ ['value1', 'value3'])
        console.log(select.getSelected())

        // To not trigger the afterChange callback
        select.setSelected('value1', false)
      </code>
    </pre>
  </div>
</template>
