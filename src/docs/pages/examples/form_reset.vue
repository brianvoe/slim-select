<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'FormReset',
  data() {
    return {
      single: null as SlimSelect | null,
      multiple: null as SlimSelect | null
    }
  },
  mounted() {
    this.single = new SlimSelect({
      select: this.$refs.single as HTMLSelectElement
    })
    this.multiple = new SlimSelect({
      select: this.$refs.multiple as HTMLSelectElement
    })
  },
  methods: {
    onSubmitSingle(e: Event) {
      e.preventDefault()

      alert(JSON.stringify(this.single!.getSelected()))
    },
    onSubmitMultiple(e: Event) {
      e.preventDefault()

      alert(JSON.stringify(this.multiple!.getSelected()))
    },
    onFormResetSingle(e: Event) {
      const selectElement = e.target as HTMLFormElement

      setTimeout(() => {
        this.single!.setSelected(
          Array.from((selectElement.elements.namedItem('select') as HTMLSelectElement).selectedOptions).map(
            (option) => option.value
          ),
          false
        )
      })
    },
    onFormResetMultiple(e: Event) {
      const selectElement = e.target as HTMLFormElement

      setTimeout(() => {
        this.multiple!.setSelected(
          Array.from((selectElement.elements.namedItem('select') as HTMLSelectElement).selectedOptions).map(
            (option) => option.value
          ),
          false
        )
      })
    }
  }
})
</script>

<template>
  <div id="formReset" class="content">
    <h2 class="header">Form reset</h2>
    <p>Reset select to defaultSelected value on form reset</p>

    <div class="row">
      <form class="row" @submit="onSubmitSingle" @reset="onFormResetSingle">
        <select ref="single" name="select">
          <option value="value1">Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <button type="submit">Submit</button>
        <button type="reset">Reset form</button>
      </form>

      <form class="row" @submit="onSubmitMultiple" @reset="onFormResetMultiple">
        <select ref="multiple" name="select" multiple>
          <option value="value1">Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3" selected>Value 3</option>
        </select>
        <button type="submit">Submit</button>
        <button type="reset">Reset form</button>
      </form>
    </div>

    <pre>
      <code class="language-html">
        &lt;form id="form"&gt;
          &lt;select id="selectElement" name="select"&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
          &lt;button type="reset"&gt;Reset form&lt;/button&gt;
        &lt;/form&gt;
      </code>
    </pre>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement'
        })

        document.querySelector('#form').addEventListener('reset', (e) => {
          // Updating SlimSelect from actual native select element value
          select.setSelected(
            Array.from(e.target.elements.select.selectedOptions).map((option) => option.value),
            false
          )
        })
      </code>
    </pre>
  </div>
</template>
