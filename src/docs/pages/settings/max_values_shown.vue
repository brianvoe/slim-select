<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'MaxValuesShown',
  mounted() {
    new SlimSelect({
      select: this.$refs.maxValuesShown as HTMLSelectElement,
      settings: {
        maxValuesShown: 5,
        maxValuesMessage: '{number} selected',
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
  <div id="maxValuesShown" class="content">
    <h2 class="header">maxValuesShown</h2>
    <p>
      The maxValuesShown setting controls how many selected values are displayed individually before switching to a
      summary format. When the number of selected items exceeds this threshold, SlimSelect displays a count message
      instead of showing all individual values.
    </p>
    <p>
      This feature prevents the dropdown from becoming cluttered with too many selected value tags, maintaining a clean
      and readable interface. The summary message can be customized using the maxValuesMessage setting, which supports
      the '{number}' placeholder for dynamic count display.
    </p>
    <p><strong>Default:</strong> 20</p>

    <div class="row">
      <select ref="maxValuesShown" multiple>
        <option value="value1" selected>Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3" selected>Value 3</option>
        <option value="value4" selected>Value 4</option>
        <option value="value5" selected>Value 5</option>
        <option value="value6" selected>Value 6</option>
        <option value="value7">Value 7</option>
        <option value="value8">Value 8</option>
      </select>
    </div>

    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            maxValuesShown: 5, // Default 20
            maxValuesMessage: '{number} values selected', // Default '{number} selected'
          },
        });
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
        &lt;select id="maxValuesShown" multiple&gt;
          &lt;option value="value1" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
          &lt;option value="value3" selected&gt;Value 3&lt;/option&gt;
          &lt;option value="value4" selected&gt;Value 4&lt;/option&gt;
          &lt;option value="value5" selected&gt;Value 5&lt;/option&gt;
          &lt;option value="value6"&gt;Value 6&lt;/option&gt;
          &lt;option value="value7"&gt;Value 7&lt;/option&gt;
          &lt;option value="value8"&gt;Value 8&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
