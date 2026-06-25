<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'SelectAll',
  components: {
    HighlightStyle
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.selectAll as HTMLSelectElement
    })
  }
})
</script>

<template>
  <div id="selectAll" class="content">
    <h2 class="header">selectAll</h2>
    <p>
      The selectAll setting adds a convenient "select all" option to optgroups, allowing users to quickly select all
      options within a specific group with a single click. This is particularly useful for multi-select dropdowns with
      categorized options.
    </p>
    <p>
      When enabled, a select all option appears at the top of the optgroup. It shows
      <strong>Select All</strong> until every option in the group is selected, then switches to
      <strong>Unselect All</strong> to clear the group in one click.
    </p>
    <div class="alert info">
      You can set <code>selectAll</code> by data or with the <code>data-selectall</code> attribute on an
      <code>&lt;optgroup&gt;</code> element.
    </div>

    <select ref="selectAll" multiple>
      <optgroup label="Label 1" data-selectall="true">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </optgroup>
      <optgroup label="Label 2">
        <option value="value4">Value 4</option>
        <option value="value5">Value 5</option>
        <option value="value6">Value 6</option>
      </optgroup>
    </select>
    <br />

    <h3>Via data</h3>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          data: [
            {
              label: 'Label 1',
              selectAll: true,
              options: [
                { text: 'Option 1', value: '1' },
                { text: 'Option 2', value: '2' },
                { text: 'Option 3', value: '3' },
              ],
            },
            {
              label: 'Label 2',
              selectAll: false,
              options: [
                { text: 'Option 4', value: '4' },
                { text: 'Option 5', value: '5' },
                { text: 'Option 6', value: '6' },
              ],
            },
          ],
        })
      </pre>
    </HighlightStyle>
    <br />

    <h3>Via html</h3>
    <HighlightStyle language="html">
      <pre>
        &lt;select ref="selectAll" multiple&gt;
          &lt;optgroup label="Label 1" data-selectall="true"&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/optgroup&gt;
          &lt;optgroup label="Label 2"&gt;
            &lt;option value="value4"&gt;Value 4&lt;/option&gt;
            &lt;option value="value5"&gt;Value 5&lt;/option&gt;
            &lt;option value="value6"&gt;Value 6&lt;/option&gt;
          &lt;/optgroup&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>
  </div>
</template>
