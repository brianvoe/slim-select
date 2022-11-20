<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'GetSelected',
  data() {
    return {
      selectedSingle: null as SlimSelect | null,
      selectedSingleValue: [] as string[],
      selectedMultiple: null as SlimSelect | null,
      selectedMultipleValue: [] as string[],
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
    getSelected() {
      this.selectedSingleValue = this.selectedSingle!.getSelected()
      this.selectedMultipleValue = this.selectedMultiple!.getSelected()
    },
  },
})
</script>

<template>
  <div id="getSelected" class="content">
    <h2 class="header">getSelected</h2>
    <p>The getSelected method will return an array of the currently selected value strings.</p>

    <div class="alert info">
      Whether or not its a single or multiple select, getSelected will always return an array.
    </div>

    <div class="row">
      <div class="btn" @click="getSelected">Get Selected</div>

      <div>
        <select ref="selectedSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <div class="pad-t-m pad-b-m" v-if="selectedSingleValue.length">
          <b>Single Select Value:</b> {{ selectedSingleValue }}
        </div>
      </div>

      <div>
        <select ref="selectedMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3" selected>Value 3</option>
        </select>
        <div class="pad-t-m pad-b-m" v-if="selectedMultipleValue.length">
          <b>Multi Select Value:</b> {{ selectedMultipleValue }}
        </div>
      </div>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement'
        })
        var values = select.getSelected() // Will return an array of strings
        console.log(values)
      </code>
    </pre>
  </div>
</template>
