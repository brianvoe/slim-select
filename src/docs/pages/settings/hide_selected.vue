<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'HideSelected',
  mounted() {
    new SlimSelect({
      select: this.$refs.hideSelectedSingle as HTMLSelectElement,
      settings: {
        hideSelected: true
      }
    })

    new SlimSelect({
      select: this.$refs.hideSelectedMultiple as HTMLSelectElement,
      settings: {
        hideSelected: true
      }
    })
  }
})
</script>

<template>
  <div id="hideSelected" class="content">
    <h2 class="header">hideSelected</h2>
    <p>
      The hideSelected setting prevents already selected options from appearing in the dropdown list. This creates a
      cleaner interface by removing options that have already been chosen, making it easier for users to see what
      options are still available.
    </p>
    <p>
      This feature is particularly useful for multi-select dropdowns where showing selected options in the list might be
      redundant or confusing. It helps users focus on the remaining choices and provides a more streamlined selection
      experience.
    </p>

    <div class="row">
      <select ref="hideSelectedSingle">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="hideSelectedMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="hideSelectedSingle"&gt;
          &lt;option data-placeholder="true"&gt;&lt;/option&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;select id="hideSelectedMultiple"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
