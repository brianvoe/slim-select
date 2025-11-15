<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'InvalidValue',
  data() {
    return {
      slim: null as SlimSelect | null
    }
  },
  mounted() {
    this.slim = new SlimSelect({
      select: this.$refs.invalidValueSelect as HTMLSelectElement,
      settings: {
        placeholderText: 'Select an option'
      }
    })
  },
  beforeUnmount() {
    if (this.slim) {
      this.slim.destroy()
    }
  },
  methods: {
    setInvalidValue() {
      if (this.slim) {
        this.slim.setSelected('banana') // This value doesn't exist in options
      }
    },
    setEmptyValue() {
      if (this.slim) {
        this.slim.setSelected('')
      }
    },
    setValidValue() {
      if (this.slim) {
        this.slim.setSelected('opt2')
      }
    }
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="invalid-value" class="content">
    <h2 class="header">Invalid Value Handling</h2>
    <p>
      SlimSelect now automatically handles invalid values. When you set a value that doesn't exist in the options,
      SlimSelect will:
    </p>
    <ul>
      <li>Add a placeholder option if one doesn't exist</li>
      <li>Clear the selection to show the placeholder text</li>
      <li>Preserve the invalid value (won't auto-select the first option)</li>
    </ul>
    <p>
      This matches the behavior of a regular HTML select element, where invalid values don't select anything and the
      placeholder is shown instead.
    </p>

    <div class="row">
      <select ref="invalidValueSelect">
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
        <option value="opt3">Option 3</option>
      </select>
    </div>

    <div class="row">
      <button @click="setInvalidValue" class="button">Set Invalid Value ('banana')</button>
      <button @click="setEmptyValue" class="button">Set Empty Value</button>
      <button @click="setValidValue" class="button">Set Valid Value ('opt2')</button>
    </div>

    <ShikiStyle language="javascript">
      <pre>
        const slim = new SlimSelect({
          select: '#invalid-value',
          settings: {
            placeholderText: 'Select an option'
          }
        })

        // Set an invalid value - will show placeholder
        slim.setSelected('banana')

        // Set empty value - will show placeholder
        slim.setSelected('')

        // Set valid value - will select normally
        slim.setSelected('opt2')
      </pre>
    </ShikiStyle>
  </div>
</template>
