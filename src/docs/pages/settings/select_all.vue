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
      select: this.$refs.selectAllGlobal as HTMLSelectElement,
      settings: {
        selectAll: true
      }
    })

    new SlimSelect({
      select: this.$refs.selectAllNoSearch as HTMLSelectElement,
      settings: {
        selectAll: true,
        showSearch: false,
        selectAllText: 'Everything',
        unselectAllText: 'Nothing'
      }
    })

    new SlimSelect({
      select: this.$refs.selectAllOptgroup as HTMLSelectElement
    })
  }
})
</script>

<template>
  <div id="selectAll" class="content">
    <h2 class="header">selectAll</h2>
    <p>
      The <code>selectAll</code> setting adds a convenient "Select All" control for multi-select dropdowns. Enable it
      globally in settings (or with <code>data-selectall="true"</code> on the <code>&lt;select&gt;</code>) to place a
      checkbox next to the search input, or per optgroup to select everything in that group.
    </p>
    <p>
      The control shows <strong>Select All</strong> until every selectable option is selected, then switches to
      <strong>Unselect All</strong>. Customize the labels with <code>selectAllText</code> and
      <code>unselectAllText</code>.
    </p>
    <div class="alert info">
      Global select all stays in the search row even when <code>showSearch</code> is <code>false</code>, so the control
      remains available without growing the dropdown height.
    </div>

    <h3>Global (settings)</h3>
    <div class="row" style="padding: 0 0 var(--spacing-quarter) 0">
      <select ref="selectAllGlobal" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <option value="value4">Value 4</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            selectAll: true,
            
            // Optional
            // selectAllText: 'Select All',
            // unselectAllText: 'Unselect All',
          },
        })
      </pre>
    </HighlightStyle>
    <HighlightStyle language="html">
      <pre>
        &lt;select multiple data-selectall="true"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>

    <h3>With showSearch false</h3>
    <div class="row" style="padding: 0 0 var(--spacing-quarter) 0">
      <select ref="selectAllNoSearch" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <option value="value4">Value 4</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            selectAll: true,
            showSearch: false,
          },
        })
      </pre>
    </HighlightStyle>

    <h3>Per optgroup</h3>
    <p>
      Set <code>selectAll</code> on data or use the <code>data-selectall</code> attribute on an
      <code>&lt;optgroup&gt;</code> element.
    </p>
    <div class="row" style="padding: 0 0 var(--spacing-quarter) 0">
      <select ref="selectAllOptgroup" multiple>
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
    </div>

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

    <HighlightStyle language="html">
      <pre>
        &lt;select multiple&gt;
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
