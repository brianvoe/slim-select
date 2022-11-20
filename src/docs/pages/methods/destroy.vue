<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Destroy',
  data() {
    return {
      destroySingle: null as SlimSelect | null,
      destroyMultiple: null as SlimSelect | null,
    }
  },
  mounted() {
    this.create()
  },
  methods: {
    create() {
      this.destroySingle = new SlimSelect({
        select: this.$refs.destroySingle as HTMLSelectElement,
      })

      this.destroyMultiple = new SlimSelect({
        select: this.$refs.destroyMultiple as HTMLSelectElement,
      })
    },
    destroy() {
      this.destroySingle!.destroy()
      this.destroySingle = null
      this.destroyMultiple!.destroy()
      this.destroyMultiple = null
    },
  },
})
</script>

<template>
  <div id="destroy" class="content">
    <h2 class="header">destroy</h2>
    <p>The destroy method will remove slim-select and display your original select.</p>

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

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement'
        })
        select.destroy()
      </code>
    </pre>
  </div>
</template>
