<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'DataAttributes',
  mounted() {
    new SlimSelect({ select: this.$refs.optionsSingle as HTMLSelectElement })
    new SlimSelect({ select: this.$refs.optionsMultiple as HTMLSelectElement })
  }
})
</script>

<template>
  <div id="dataAttributes" class="content">
    <h2 class="header">Data Attributes</h2>
    <p>
      SlimSelect automatically inherits and preserves data attributes from the original select element and its options,
      ensuring that any custom data you've attached to your HTML elements is maintained in the enhanced interface. This
      includes standard HTML attributes like disabled, class, style, and custom data attributes.
    </p>
    <p>
      This feature allows you to maintain all your existing HTML attributes and data while gaining the enhanced
      functionality of SlimSelect, making the transition seamless and preserving any custom behavior or styling that
      depends on these attributes.
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
