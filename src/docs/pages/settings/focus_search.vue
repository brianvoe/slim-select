<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'FocusSearch',
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.focusSearchSingle as HTMLSelectElement,
      settings: {
        focusSearch: false
      }
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.focusSearchMulti as HTMLSelectElement,
      settings: {
        focusSearch: false
      }
    })
  }
})
</script>

<template>
  <div id="focusSearch" class="content">
    <h2 class="header">focusSearch</h2>
    <p>
      Boolean value that will decide whether or not to automatically focus on the search input when the dropdown opens.
      Default is true.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="focusSearchSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <div class="row">
      <select ref="focusSearchMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            focusSearch: false
          }
        })
      </code>
    </pre>
  </div>
</template>
