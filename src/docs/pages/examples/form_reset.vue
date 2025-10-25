<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

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
  },
  components: {
    ShikiStyle
  }
})
</script>

<style lang="scss">
#formReset {
  .form-example {
    flex: 1;
    min-width: 300px;
    padding: var(--spacing);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: #f8f9fa;

    h3 {
      color: var(--color-primary);
      margin: 0 0 var(--spacing-quarter) 0;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-half);

      select {
        width: 100%;
      }

      .form-buttons {
        display: flex;
        gap: var(--spacing-half);
      }
    }
  }
}
</style>

<template>
  <div id="formReset" class="content">
    <h2 class="header">Form Reset</h2>
    <p>
      This example shows how to properly handle form reset functionality with SlimSelect. When a user clicks the reset
      button, SlimSelect will automatically restore the select to its original selected values, maintaining consistency
      with the native form behavior.
    </p>

    <div class="row">
      <div class="form-example">
        <h3>Single Select</h3>
        <form @submit="onSubmitSingle" @reset="onFormResetSingle">
          <select ref="single" name="select">
            <option value="value1">Value 1</option>
            <option value="value2" selected>Value 2</option>
            <option value="value3">Value 3</option>
          </select>
          <div class="form-buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset form</button>
          </div>
        </form>
      </div>

      <div class="form-example">
        <h3>Multiple Select</h3>
        <form @submit="onSubmitMultiple" @reset="onFormResetMultiple">
          <select ref="multiple" name="select" multiple>
            <option value="value1">Value 1</option>
            <option value="value2" selected>Value 2</option>
            <option value="value3" selected>Value 3</option>
          </select>
          <div class="form-buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset form</button>
          </div>
        </form>
      </div>
    </div>

    <ShikiStyle language="html">
      <pre>
        &lt;form id="form"&gt;
          &lt;select id="selectElement" name="select"&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
          &lt;button type="reset"&gt;Reset form&lt;/button&gt;
        &lt;/form&gt;
      </pre>
    </ShikiStyle>

    <ShikiStyle language="javascript">
      <pre>
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
      </pre>
    </ShikiStyle>
  </div>
</template>
