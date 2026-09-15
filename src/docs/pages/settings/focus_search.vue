<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'FocusSearch',
  components: {
    HighlightStyle
  },
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
      Default is <b>true</b> from 768px viewport width up, and <b>false</b> below that — the same breakpoint as
      <code>modal: 'mobile'</code> — so a phone keyboard does not cover the list unless the user taps search. Pass
      <code>true</code> or <code>false</code> to force either behavior on all viewports.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="focusSearchSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>

      <select ref="focusSearchMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            focusSearch: false
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
