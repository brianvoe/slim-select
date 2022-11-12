<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'SetSelected',
  data() {
    return {
      selectedSingle: null as SlimSelect | null,
      selectedMultiple: null as SlimSelect | null,
    }
  },
  mounted() {
    this.selectedSingle = new SlimSelect({
      select: this.$refs.selectedSingle as HTMLSelectElement,
    })
    this.selectedMultiple = new SlimSelect({
      select: this.$refs.selectedMultiple as HTMLSelectElement,
    })
  },
  methods: {
    setSelected() {
      this.selectedSingle!.setSelected('value2')
      this.selectedMultiple!.setSelected(['value1', 'value3'])
    },
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">setSelected</h2>
    <p>The setSelected method will set the selected value(s) of the select.</p>
    <p>SetSelected will accept both string and array of strings.</p>

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
    </div>
  </div>
</template>
