<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Classes',
  components: {
    HighlightStyle
  },
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
    <p>
      The cssClasses setting allows you to add custom CSS classes to SlimSelect's default classes. Your custom classes
      are appended to the default SlimSelect classes (like 'ss-main', 'ss-option', etc.), giving you the ability to add
      additional styling without breaking SlimSelect's core functionality.
    </p>
    <p>
      You can add classes to various elements like options, the main container, search input, and more. The default
      classes are always preserved to ensure proper functionality, while your custom classes provide additional styling
      hooks. This allows you to integrate seamlessly with CSS frameworks like Tailwind CSS or your own design system.
    </p>

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

    <HighlightStyle language="html">
      <pre>
        &lt;select id="primary-select"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#primary-select',
          cssClasses: {
            option: "primary-option" // Appended to 'ss-option', resulting in class="ss-option primary-option"
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
