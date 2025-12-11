<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'CloseOnSelect',
  components: {
    HighlightStyle
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.closeOnSelectSingle as HTMLSelectElement,
      settings: {
        closeOnSelect: false
      }
    })

    new SlimSelect({
      select: this.$refs.closeOnSelectMultiple as HTMLSelectElement,
      settings: {
        closeOnSelect: false
      }
    })
  }
})
</script>

<template>
  <div id="closeOnSelect" class="content">
    <h2 class="header">closeOnSelect</h2>
    <p>
      The closeOnSelect setting controls whether the dropdown closes automatically after a user makes a selection. This
      behavior is particularly important for multi-select dropdowns where you might want to keep the dropdown open so
      users can make multiple selections without having to reopen it each time.
    </p>
    <p>
      When set to false, the dropdown remains open after each selection, making it easier for users to select multiple
      options in succession. This is especially useful for multi-select scenarios where users need to choose several
      items from a list.
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

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
