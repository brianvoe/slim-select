<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Error',
  data() {
    return {
      errorSingle: null as SlimSelect | null,
      errMsg: ''
    }
  },
  mounted() {
    this.errorSingle = new SlimSelect({
      select: this.$refs.errorSingle as HTMLSelectElement,
      events: {
        error: (err: Error) => {
          this.errMsg = err.message
        }
      }
    })
  }
})
</script>

<template>
  <div id="error" class="content">
    <h2 class="header">error</h2>
    <p>
      The error event provides a centralized way to handle any errors that occur within SlimSelect. This includes
      initialization errors, API call failures, validation errors, or any other unexpected issues that might arise
      during the component's lifecycle.
    </p>
    <p>
      By implementing an error handler, you can provide better user feedback, log errors for debugging, or implement
      fallback behavior when something goes wrong. The error object contains detailed information about what went wrong
      and where it occurred.
    </p>
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
