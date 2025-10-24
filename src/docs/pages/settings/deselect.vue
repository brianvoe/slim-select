<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Deselect',
  mounted() {
    new SlimSelect({
      select: this.$refs.allowDeselectSingle as HTMLSelectElement,
      settings: {
        allowDeselect: true
      }
    })

    new SlimSelect({
      select: this.$refs.allowDeselectMultiple as HTMLSelectElement,
      settings: {
        allowDeselect: true
      }
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="allowDeselect" class="content">
    <h2 class="header">allowDeselect</h2>
    <p>
      The allowDeselect setting enables users to clear their selection and return to an empty state. This is
      particularly useful when you want to give users the ability to "unselect" a value, which is especially important
      for optional form fields.
    </p>
    <p>
      When enabled, users can click on the selected value to deselect it, returning the dropdown to its placeholder
      state. For this to work properly, you need an empty option with data-placeholder="true" in your HTML so SlimSelect
      has an empty value to select.
    </p>

    <div class="row">
      <select ref="allowDeselectSingle">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="allowDeselectMultiple" multiple>
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      </pre>
    </ShikiStyle>
    <ShikiStyle language="html">
      <pre>
        &lt;!-- Requires emtpy data-placeholder option --&gt;
        &lt;select id="allowDeselect"&gt;
          &lt;option data-placeholder="true"&gt;&lt;/option&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
