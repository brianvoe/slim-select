<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'DataAttributes',
  mounted() {
    new SlimSelect({ select: this.$refs.optionsSingle as HTMLSelectElement })
    new SlimSelect({ select: this.$refs.optionsMultiple as HTMLSelectElement })
  },
})
</script>

<template>
  <div id="dataAttributes" class="content">
    <h2 class="header">Data Attributes</h2>
    <p>
      Slim select will take on attributes of the original as best as possible. Below are example usages of attributes
      added to the underlining select options that slim select picked up and used
    </p>

    <div class="row">
      <select ref="optionsSingle">
        <option data-placeholder="true"></option>
        <option value="value1" data-info="Here is info">Data Attributes</option>
        <option value="value2" disabled>Disabled Option</option>
        <option value="value3" class="green">Class Green</option>
        <option value="value4" style="color: purple">Inline Style</option>
      </select>
      <select ref="optionsMultiple" multiple>
        <option value="value1" data-info="Here is info">Data Attributes</option>
        <option value="value2" disabled>Disabled Option</option>
        <option value="value3" class="green">Class Green</option>
        <option value="value4" style="color: purple">Inline Style</option>
      </select>
    </div>
  </div>
</template>
