<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'EnableDisable',
  data() {
    return {
      setEnableSingle: null as SlimSelect | null,
      setEnableMultiple: null as SlimSelect | null,
    }
  },
  mounted() {
    this.setEnableSingle = new SlimSelect({
      select: this.$refs.setEnableSingle as HTMLSelectElement,
    })
    this.setEnableMultiple = new SlimSelect({
      select: this.$refs.setEnableMultiple as HTMLSelectElement,
    })
  },
  methods: {
    setEnable() {
      this.setEnableSingle!.enable()
      this.setEnableMultiple!.enable()
    },
    setDisable() {
      this.setEnableSingle!.disable()
      this.setEnableMultiple!.disable()
    },
  },
})
</script>

<template>
  <div id="enableDisable" class="content">
    <h2 class="header">enable / disable</h2>
    <p>
      These methods will enable or disable the select dropdown.
      <br />
      You may also set disabled on your original select and slim-select will pick that up.
    </p>

    <div class="row">
      <div class="btn" @click="setEnable" v-if="setEnableSingle && setEnableSingle.settings.disabled">Enable</div>
      <div class="btn" @click="setDisable" v-else>Disable</div>

      <select ref="setEnableSingle" disabled>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="setEnableMultiple" multiple disabled>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement'
        })
        select.enable()
        // or
        select.disable()
      </code>
    </pre>
  </div>
</template>
