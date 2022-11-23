<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'
import { DataArray } from '../../../slim-select/store'

export default defineComponent({
  name: 'GetData',
  data() {
    return {
      getDataOptions: null as SlimSelect | null,
      getDataOptionsValue: [] as DataArray,
      getDataOptgroups: null as SlimSelect | null,
      getDataOptgroupsValue: [] as DataArray,
    }
  },
  mounted() {
    this.getDataOptions = new SlimSelect({
      select: this.$refs.getDataOptions as HTMLSelectElement,
    })
    this.getDataOptgroups = new SlimSelect({
      select: this.$refs.getDataOptgroups as HTMLSelectElement,
    })
  },
  methods: {
    getData() {
      this.getDataOptionsValue = this.getDataOptions!.getData()
      this.getDataOptgroupsValue = this.getDataOptgroups!.getData()
    },
  },
})
</script>

<template>
  <div id="getData" class="content">
    <h2 class="header">getData</h2>
    <p>The getData method will return an array of the full data set.</p>

    <div class="row">
      <div class="btn" @click="getData">Get Data</div>

      <div>
        <select ref="getDataOptions">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <div class="pad-t-m pad-b-m" v-if="getDataOptionsValue.length">
          <b>Option Data:</b> {{ getDataOptionsValue }}
        </div>
      </div>

      <div>
        <select ref="getDataOptgroups" multiple>
          <optgroup label="Group 1">
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </optgroup>
          <optgroup label="Group 2">
            <option value="value4">Value 4</option>
            <option value="value5">Value 5</option>
            <option value="value6">Value 6</option>
          </optgroup>
        </select>
        <div class="pad-t-m pad-b-m" v-if="getDataOptgroupsValue.length">
          <b>Optgroup Data:</b> {{ getDataOptgroupsValue }}
        </div>
      </div>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement'
        })
        var data = select.getData() // Will return an array of options and optgroups
        console.log(data)
      </code>
    </pre>
  </div>
</template>
