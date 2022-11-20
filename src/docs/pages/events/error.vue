<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Error',
  data() {
    return {
      errorSingle: null as SlimSelect | null,
      errMsg: '',
    }
  },
  mounted() {
    this.errorSingle = new SlimSelect({
      select: this.$refs.errorSingle as HTMLSelectElement,
      events: {
        error: (err: Error) => {
          this.errMsg = err.message
        },
      },
    })
  },
})
</script>

<template>
  <div id="error" class="content">
    <h2 class="header">error</h2>
    <p>The error event is fired when an error occurs. The error message is passed as the first argument.</p>
    <div class="alert info">
      If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as
      the select dom element might not be available yet.
    </div>

    <div v-if="errMsg !== ''"><b>Error:</b> {{ errMsg }}</div>

    <div class="row">
      <select ref="notError">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      </code>
    </pre>
  </div>
</template>
