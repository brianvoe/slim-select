<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Disabled',
  mounted() {
    // Disable via settings
    new SlimSelect({
      select: this.$refs.disabledSingle as HTMLSelectElement,
      settings: {
        disabled: true,
      },
    })

    // Disable via disabled html attribute
    new SlimSelect({
      select: this.$refs.disabledMultiple as HTMLSelectElement,
    })

    // Disable option via data
    new SlimSelect({
      select: this.$refs.disabledOptionSingle as HTMLSelectElement,
      data: [
        { text: 'Option 1', value: 'option1' },
        { text: 'Option 2', value: 'option2', disabled: true },
        { text: 'Option 3', value: 'option3' },
      ],
    })

    // Disable via disabled html attribute
    new SlimSelect({
      select: this.$refs.disabledOptionMultiple as HTMLSelectElement,
    })

    // Disable via disabled html attribute
    const dynamic = new SlimSelect({
      select: this.$refs.disabledDynamicSingle as HTMLSelectElement,
    })

    // Show the original select for disabledDynamicMultiple
    dynamic.select.showUI()
  },
  methods: {
    enableDisableDynamic() {
      const dis = this.$refs.disabledDynamicSingle as HTMLSelectElement
      // Disable via method
      if (dis) {
        dis.disabled = !dis.disabled
      }
    },
  },
})
</script>

<template>
  <div id="disabled" class="content">
    <h2 class="header">disabled</h2>
    <p>Allows the ability to disable the select dropdown as well as individual options</p>
    <div class="alert info">Methods also are provided to enable and disable SlimSelect via method call.</div>

    <div class="row">
      <select ref="disabledSingle">
        <option value="value1" selected>Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="disabledMultiple" multiple disabled>
        <option value="value1" selected>Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <br />

    <div class="row">
      <select ref="disabledOptionSingle">
        <option value="value1" selected>Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="disabledOptionMultiple" multiple>
        <option value="value1" selected>Value 1</option>
        <option value="value2" disabled>Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <br />

    <div class="row">
      <div class="btn" @click="enableDisableDynamic">Enable/Disable Original Select</div>
      <select ref="disabledDynamicSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        // Disable via settings
        new SlimSelect({
          select: '#selectElement',
          settings: {
            disabled: true,
          },
        })

        // Disable via disabled html attribute
        new SlimSelect({
          select: '#selectElement',
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="selectElement"&gt;
          &lt;option value="value1" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;select id="selectElement" multiple disabled&gt;
          &lt;option value="value1" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
