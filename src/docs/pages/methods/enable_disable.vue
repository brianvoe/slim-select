<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'EnableDisable',
  components: {
    HighlightStyle
  },
  data() {
    return {
      setEnableSingle: null as SlimSelect | null,
      setEnableMultiple: null as SlimSelect | null
    }
  },
  mounted() {
    this.setEnableSingle = new SlimSelect({
      select: this.$refs.setEnableSingle as HTMLSelectElement
    })
    this.setEnableMultiple = new SlimSelect({
      select: this.$refs.setEnableMultiple as HTMLSelectElement
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
    }
  }
})
</script>

<template>
  <div id="enableDisable" class="content">
    <h2 class="header">enable / disable</h2>
    <p>
      The enable and disable methods provide programmatic control over the SlimSelect instance's interactive state.
      These methods are essential for creating dynamic interfaces where dropdowns need to be temporarily unavailable
      based on user permissions, form validation, or other business logic conditions.
    </p>
    <p>
      When disabled, the dropdown becomes non-interactive and visually indicates its disabled state. You can also set
      the disabled state directly on the original HTML select element, and SlimSelect will automatically detect and
      respect this state, ensuring consistency between the native element and the enhanced interface.
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
    <HighlightStyle language="javascript">
      <pre>
        var select = new SlimSelect({
          select: '#selectElement'
        })
        select.enable()
        // or
        select.disable()
      </pre>
    </HighlightStyle>
  </div>
</template>
