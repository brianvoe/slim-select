<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'CloseOnSelect',
  mounted() {
    new SlimSelect({
      select: this.$refs.closeOnSelectSingle as HTMLSelectElement,
      settings: {
        closeOnSelect: false,
      },
    })

    new SlimSelect({
      select: this.$refs.closeOnSelectMultiple as HTMLSelectElement,
      settings: {
        closeOnSelect: false,
        selectByGroup: true,
      },
    })
  },
})
</script>

<template>
  <div id="closeOnSelect" class="content">
    <h2 class="header">closeOnSelect</h2>
    <p>
      closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a
      value.
    </p>

    <div class="row">
      <select ref="closeOnSelectSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <optgroup label="Super Values">
          <option value="value11">Value 1</option>
          <option value="value22">Value 2</option>
          <option value="value33">Value 3</option>
        </optgroup>
      </select>
      <select ref="closeOnSelectMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <optgroup label="Super Values">
          <option value="value11">Value 1</option>
          <option value="value22">Value 2</option>
          <option value="value33">Value 3</option>
        </optgroup>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      </code>
    </pre>
  </div>
</template>
