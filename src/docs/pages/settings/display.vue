<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Display',
  mounted() {
    const displaySelect = new SlimSelect({
      select: this.$refs.selectdisplay as HTMLSelectElement,
    })

    const displayData = [
      { value: 'value1', text: 'Value 1', display: false },
      { value: 'value2', text: 'Value 2' },
      { value: 'value3', text: 'Value 3' },
    ]

    displaySelect.setData(displayData)
    displaySelect.setSelected(['value1', 'value3'])

    new SlimSelect({
      select: this.$refs.selectdisplay2 as HTMLSelectElement,
    })
  },
})
</script>

<template>
  <div id="display" class="content">
    <h2 class="header">display</h2>
    <p>Allows to hide elements of selected values.</p>

    <div class="row">
      <select ref="selectdisplay" multiple></select>
    </div>

    <pre>
      <code class="language-javascript">
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
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="selectMultiMandatory" multiple&gt;&lt;/select&gt;
      </code>
    </pre>

    <p>Or</p>
    <div class="row">
      <select ref="selectdisplay2" multiple>
        <option value="value1" style="display: none" selected>Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="selectdisplay2" multiple&gt;
          &lt;option value="value1" style="display: none;" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
