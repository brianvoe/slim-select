<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Closable',
  mounted() {
    new SlimSelect({
      select: this.$refs.closableSingle as HTMLSelectElement,
    })
    new SlimSelect({
      select: this.$refs.closableMultiple as HTMLSelectElement,
    })
  },
})
</script>

<template>
  <div id="closable" class="content">
    <h2 class="header">closable</h2>
    <p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p>
    <p>Values: <strong>"off"</strong> | <strong>"open"</strong> | <strong>"close"</strong></p>
    <p>Default: <strong>"off"</strong></p>

    <div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>

    <div class="row">
      <select ref="closableSingle">
        <optgroup label="Label 1" data-closable="off">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </optgroup>
        <optgroup label="Label 2" data-closable="open">
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </optgroup>
        <optgroup label="Label 3" data-closable="close">
          <option value="value7">Value 7</option>
          <option value="value8">Value 8</option>
          <option value="value9">Value 9</option>
        </optgroup>
      </select>
      <select ref="closableMultiple" multiple>
        <optgroup label="Label 1" data-selectall="true" data-closable="off">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </optgroup>
        <optgroup label="Label 2" data-selectall="true" data-closable="open">
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </optgroup>
        <optgroup label="Label 3" data-selectall="true" data-closable="close">
          <option value="value7">Value 7</option>
          <option value="value8">Value 8</option>
          <option value="value9">Value 9</option>
        </optgroup>
      </select>
    </div>
    <br />

    <h3>Via data</h3>
    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          data: [
            {
              label: 'Label 1',
              closable: 'off',
              options: [
                { text: 'Option 1', value: '1' },
                { text: 'Option 2', value: '2' },
                { text: 'Option 3', value: '3' },
              ],
            },
            {
              label: 'Label 2',
              closable: 'open',
              options: [
                { text: 'Option 4', value: '4' },
                { text: 'Option 5', value: '5' },
                { text: 'Option 6', value: '6' },
              ],
            },
            {
              label: 'Label 3',
              closable: 'close',
              options: [
                { text: 'Option 7', value: '7' },
                { text: 'Option 8', value: '8' },
                { text: 'Option 9', value: '9' },
              ],
            },
          ],
        })
      </code>
    </pre>
    <br />

    <h3>Via html</h3>
    <pre>
      <code class="language-html">
        &lt;select ref="closable" multiple&gt;
          &lt;optgroup label="Label 1" data-closable="off"&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/optgroup&gt;
          &lt;optgroup label="Label 2" data-closable="open"&gt;
            &lt;option value="value4"&gt;Value 4&lt;/option&gt;
            &lt;option value="value5"&gt;Value 5&lt;/option&gt;
            &lt;option value="value6"&gt;Value 6&lt;/option&gt;
          &lt;/optgroup&gt;
          &lt;optgroup label="Label 3" data-closable="close"&gt;
            &lt;option value="value7"&gt;Value 7&lt;/option&gt;
            &lt;option value="value8"&gt;Value 8&lt;/option&gt;
            &lt;option value="value9"&gt;Value 9&lt;/option&gt;
          &lt;/optgroup&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
