<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Display',
  mounted() {
    const displaySelect = new SlimSelect({
      select: this.$refs.selectdisplay as HTMLSelectElement
    })

    const displayData = [
      { value: 'value1', text: 'Value 1', display: false },
      { value: 'value2', text: 'Value 2' },
      { value: 'value3', text: 'Value 3' }
    ]

    displaySelect.setData(displayData)
    displaySelect.setSelected(['value1', 'value3'])

    new SlimSelect({
      select: this.$refs.selectdisplay2 as HTMLSelectElement
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="display" class="content">
    <h2 class="header">display</h2>
    <p>
      The display setting allows you to control the visibility of selected values in multi-select dropdowns. This is
      particularly useful when you want to hide certain selected values from the user interface while still maintaining
      them in the underlying data.
    </p>
    <p>
      This feature is commonly used for managing hidden or system values, implementing complex selection logic, or
      creating user interfaces where some selections should remain invisible to users while still being part of the form
      data.
    </p>

    <div class="row">
      <select ref="selectdisplay" multiple></select>
    </div>

    <ShikiStyle language="javascript">
      <pre>
        const displaySelect = new SlimSelect({
          select: '#selectElement'
        })

        const displayData = [
          { value: 'value1', text: 'Value 1', display: false },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        displaySelect.setData(displayData)
        displaySelect.set(['value1', 'value3'])
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
        &lt;select id="selectMultiMandatory" multiple&gt;&lt;/select&gt;
      </pre>
    </ShikiStyle>

    <p>Or</p>
    <div class="row">
      <select ref="selectdisplay2" multiple>
        <option value="value1" style="display: none" selected>Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <ShikiStyle language="javascript">
      <pre>
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
        &lt;select id="selectdisplay2" multiple&gt;
          &lt;option value="value1" style="display: none;" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
