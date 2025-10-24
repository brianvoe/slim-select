<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'MinMax',
  mounted() {
    new SlimSelect({
      select: this.$refs.selectMultiMax as HTMLSelectElement,
      settings: {
        allowDeselect: true,
        closeOnSelect: false,
        minSelected: 2,
        maxSelected: 5
      },
      events: {
        addable: (value: string): string => {
          return value
        }
      }
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="minmax" class="content">
    <h2 class="header">Min/Max Selected</h2>
    <p>
      The min/max selected settings allow you to enforce selection limits in multi-select dropdowns, ensuring users
      select the appropriate number of options for your application's requirements. This is essential for forms that
      need specific selection counts or business logic that depends on selection constraints.
    </p>
    <p>
      You can set both minimum and maximum selection limits independently. The minimum setting ensures users select at
      least a certain number of options, while the maximum setting prevents them from selecting too many. This provides
      fine-grained control over user selections and helps maintain data integrity.
    </p>

    <div class="row">
      <select ref="selectMultiMax" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <option value="value4">Value 4</option>
        <option value="value5">Value 5</option>
        <option value="value6">Value 6</option>
      </select>
    </div>

    <ShikiStyle language="javascript">
      <pre>
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
        &lt;select id="selectMultiMax" multiple&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;option value="value4"&gt;Value 4&lt;/option&gt;
          &lt;option value="value5"&gt;Value 5&lt;/option&gt;
          &lt;option value="value6"&gt;Value 6&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
