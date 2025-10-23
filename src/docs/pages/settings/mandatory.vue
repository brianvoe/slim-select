<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Mandatory',
  mounted() {
    const mandatorySelect = new SlimSelect({
      select: this.$refs.selectMultiMandatory as HTMLSelectElement
    })

    const mandatoryData = [
      { value: 'value1', text: 'Value 1', mandatory: true },
      { value: 'value2', text: 'Value 2' },
      { value: 'value3', text: 'Value 3' }
    ]

    mandatorySelect.setData(mandatoryData)
    mandatorySelect.setSelected(['value1', 'value3'])

    new SlimSelect({
      select: this.$refs.selectMultiMandatory2 as HTMLSelectElement
    })
  }
})
</script>

<template>
  <div id="mandatory" class="content">
    <h2 class="header">mandatory</h2>
    <p>
      The mandatory setting allows you to mark certain options as required in multi-select dropdowns, preventing users
      from deselecting them once they've been chosen. This is particularly useful for options that represent essential
      or system-required selections that must always remain active.
    </p>
    <p>
      When an option is marked as mandatory, users can select it normally, but once selected, they cannot deselect it,
      ensuring that critical options remain part of the selection. Note that mandatory options are not selected by
      default - users must actively choose them, but once selected, they become permanently locked in the selection.
    </p>

    <div class="row">
      <select ref="selectMultiMandatory" multiple></select>
    </div>

    <pre>
      <code class="language-javascript">
        const slim = new SlimSelect({
          select: '#selectElement'
        });

        const data = [
          { value: 'value1', text: 'Value 1', mandatory: true },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        slim.setData(data)
        slim.set(["value1", "value3"])
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="selectMultiMandatory" multiple&gt;&lt;/select&gt;
      </code>
    </pre>

    <p>Or</p>
    <div class="row">
      <select ref="selectMultiMandatory2" multiple>
        <option value="value1" data-mandatory="true" selected>Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="selectMultiMandatory" multiple&gt;
          &lt;option value="value1" data-mandatory="true" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
