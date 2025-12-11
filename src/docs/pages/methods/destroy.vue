<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Destroy',
  components: {
    HighlightStyle
  },
  data() {
    return {
      destroySingle: null as SlimSelect | null,
      destroyMultiple: null as SlimSelect | null
    }
  },
  mounted() {
    this.create()
  },
  methods: {
    create() {
      this.destroySingle = new SlimSelect({
        select: this.$refs.destroySingle as HTMLSelectElement
      })

      this.destroyMultiple = new SlimSelect({
        select: this.$refs.destroyMultiple as HTMLSelectElement
      })
    },
    destroy() {
      this.destroySingle!.destroy()
      this.destroySingle = null
      this.destroyMultiple!.destroy()
      this.destroyMultiple = null
    }
  }
})
</script>

<template>
  <div id="destroy" class="content">
    <h2 class="header">destroy</h2>
    <p>
      The destroy method completely removes the SlimSelect instance and restores the original HTML select element to its
      native state. This is essential for cleanup operations, memory management, and scenarios where you need to revert
      to the original select element or recreate the SlimSelect instance with different configurations.
    </p>
    <p>
      When called, this method removes all SlimSelect-generated DOM elements, event listeners, and internal state,
      leaving only the original select element. This is particularly useful in single-page applications, dynamic content
      scenarios, or when implementing component lifecycle management where SlimSelect instances need to be properly
      cleaned up to prevent memory leaks.
    </p>

    <div class="row">
      <div class="btn" @click="create" v-if="!destroySingle">Create</div>
      <div class="btn" @click="destroy" v-else>Destroy</div>
      <select ref="destroySingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="destroyMultiple" multiple>
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
        select.destroy()
      </pre>
    </HighlightStyle>
  </div>
</template>
