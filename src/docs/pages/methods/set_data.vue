<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'SetData',
  data() {
    return {
      setDataSingle: null as SlimSelect | null,
      setDataMultiple: null as SlimSelect | null,
    }
  },
  mounted() {
    // Set Data
    this.setDataSingle = new SlimSelect({
      select: this.$refs.setDataSingle as HTMLSelectElement,
    })
    this.setDataMultiple = new SlimSelect({
      select: this.$refs.setDataMultiple as HTMLSelectElement,
    })
  },
  methods: {
    setData() {
      const values = []
      for (let i = 0; i < 10; i++) {
        values.push({
          text: 'Bill Mister',
          selected: Math.random() < 0.5,
        })
      }
      this.setDataSingle!.setData(values)
      this.setDataMultiple!.setData(values)
    },
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">setData</h2>
    <p>
      The setData method can take in an array of objects. This will set the options of the original select and rerender
      slim select.
    </p>
    <div class="alert info">
      To get a better break down of possible data options see <router-link to="/data">data</router-link>
    </div>

    <div class="row">
      <div class="btn" @click="setData">Set Data</div>
      <select ref="setDataSingle"></select>
      <select ref="setDataMultiple" multiple></select>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '.element .you #want'
        })

        // Array of objects - Must have at least text value
        select.setData([
          {text: 'value1'},
          {text: 'value2'}
        ])
      </code>
    </pre>
  </div>
</template>
