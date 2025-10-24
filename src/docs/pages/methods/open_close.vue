<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'OpenClose',
  data() {
    return {
      // Open / Close
      openCloseSingle: null as SlimSelect | null,
      openCloseMultiple: null as SlimSelect | null
    }
  },
  mounted() {
    this.openCloseSingle = new SlimSelect({
      select: this.$refs.openCloseSingle as HTMLSelectElement
    })
    this.openCloseMultiple = new SlimSelect({
      select: this.$refs.openCloseMultiple as HTMLSelectElement
    })
  },
  methods: {
    toggleOpenClose() {
      if (!this.openCloseSingle!.settings.isOpen) {
        this.openCloseSingle!.open()
        this.openCloseMultiple!.open()
      } else {
        this.openCloseSingle!.close()
        this.openCloseMultiple!.close()
      }
    }
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="openClose" class="content">
    <h2 class="header">open / close</h2>
    <p>
      The open and close methods provide programmatic control over the dropdown's visibility state. These methods are
      essential for creating custom interactions, implementing keyboard navigation, or building complex user interfaces
      where you need to control when the dropdown appears or disappears.
    </p>
    <p>
      The open method displays the dropdown options and search interface, while the close method hides them. This is
      particularly useful for implementing custom triggers, creating keyboard shortcuts, or integrating SlimSelect with
      other UI components that need to control the dropdown's state programmatically.
    </p>

    <div class="row">
      <div class="btn" @click="toggleOpenClose()">Open/Close</div>
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
    <ShikiStyle language="javascript">
      <pre>
        var select = new SlimSelect({
          select: '#selectElement',
        })
        select.open()
        // or
        select.close()
      </pre>
    </ShikiStyle>
  </div>
</template>
