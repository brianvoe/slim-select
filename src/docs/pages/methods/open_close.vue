<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'OpenClose',
  data() {
    return {
      openCloseSingle: null as SlimSelect | null,
      openCloseMultiple: null as SlimSelect | null,
    }
  },
  mounted() {
    // Open / Close
    this.openCloseSingle = new SlimSelect({
      select: this.$refs.openCloseSingle as HTMLSelectElement,
    })
    this.openCloseMultiple = new SlimSelect({
      select: this.$refs.openCloseMultiple as HTMLSelectElement,
    })
  },
  methods: {
    setOpenClose() {
      if (!this.openCloseSingle!.settings.isOpen) {
        this.openCloseSingle!.open()
        this.openCloseMultiple!.open()
      }
    },
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">open / close</h2>
    <p>The open and close methods will do just that.</p>

    <div class="row">
      <div class="btn" @click="setOpenClose">Open/Close</div>
      <select ref="openCloseSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="openCloseMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement',
        })
        select.open()
        // or
        select.close()
      </code>
    </pre>
  </div>
</template>
