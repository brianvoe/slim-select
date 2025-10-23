<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

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
      The focusSearch setting controls whether the search input field automatically receives focus when the dropdown
      opens. When enabled, users can immediately start typing to search without needing to click on the search field
      first.
    </p>
    <p>
      This feature improves the user experience by reducing the number of clicks required to search through options.
      However, you might want to disable it in certain scenarios where automatic focusing could interfere with other UI
      interactions or accessibility requirements.
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
