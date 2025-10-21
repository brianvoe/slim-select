<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'CustomCss',
  mounted() {
    new SlimSelect({ select: this.$refs.mainSelect as HTMLSelectElement, cssClasses: { option: 'primary-option' } })
    new SlimSelect({
      select: this.$refs.secondarySelect as HTMLSelectElement,
      cssClasses: { option: 'secondary-option' }
    })
  }
})
</script>

<style lang="scss">
.primary-option,
.secondary-option {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.primary-option {
  color: var(--ss-bg-color);
  background: var(--ss-primary-color);

  &:hover {
    color: var(--ss-primary-color);
    background: var(--ss-bg-color);
  }
}
.secondary-option {
  color: var(--ss-primary-color);
  background: var(--ss-bg-color);

  &:hover {
    color: var(--ss-bg-color);
    background: var(--ss-primary-color);
  }
}
</style>

<template>
  <div id="cssClasses" class="content">
    <h2 class="header">cssClasses</h2>
    <p>You can override the default CSS classes by setting them during initialization.</p>

    <div class="row">
      <select ref="mainSelect">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="secondarySelect">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-html">
        &lt;select id="primary-select"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#primary-select',
          cssClasses: {
            option: "primary-option" 
        })
      </code>
    </pre>
  </div>
</template>
