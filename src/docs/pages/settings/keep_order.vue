<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'KeepOrder',
  mounted() {
    new SlimSelect({
      select: this.$refs.keepOrder as HTMLSelectElement,
      settings: {
        keepOrder: true
      }
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="keepOrder" class="content">
    <h2 class="header">keepOrder</h2>
    <p>
      The keepOrder setting controls how SlimSelect returns selected values in multi-select mode, allowing you to choose
      between DOM order (how options appear in the HTML) or selection order (the order in which users clicked/selected
      the options).
    </p>
    <p>
      This setting is particularly useful when the order of selections matters for your application logic, such as when
      building ordered lists, prioritizing selections, or maintaining user interaction patterns. It gives you control
      over whether to preserve the original HTML structure or respect the user's selection sequence.
    </p>

    <div class="alert">
      <p>
        <strong>Important:</strong> This maintains <strong>selection order</strong> (the order you clicked), NOT DOM
        order!
      </p>
    </div>

    <p><strong>When false (default):</strong> Returns options in DOM order (how they appear in the HTML)</p>
    <p><strong>When true:</strong> Returns options in the order they were clicked/selected by the user</p>

    <h3>Example:</h3>
    <p>If you have options: Apple, Banana, Cherry</p>
    <ul>
      <li>You click: Cherry → Apple → Banana</li>
      <li><code>keepOrder: false</code> → returns <code>['Apple', 'Banana', 'Cherry']</code> (DOM order)</li>
      <li><code>keepOrder: true</code> → returns <code>['Cherry', 'Apple', 'Banana']</code> (click order)</li>
    </ul>

    <p>Values: <strong>true</strong> | <strong>false</strong></p>
    <p>Default: <strong>false</strong></p>

    <div class="row">
      <select ref="keepOrder" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
        <optgroup label="Label 1">
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </optgroup>
        <optgroup label="Label 2">
          <option value="value7">Value 7</option>
          <option value="value8">Value 8</option>
          <option value="value9">Value 9</option>
        </optgroup>
      </select>
    </div>
    <br />

    <h3>Via html</h3>
    <ShikiStyle language="html">
      <pre>
        &lt;select ref="closable" multiple&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;optgroup label="Label 1"&gt;
            &lt;option value="value4"&gt;Value 4&lt;/option&gt;
            &lt;option value="value5"&gt;Value 5&lt;/option&gt;
            &lt;option value="value6"&gt;Value 6&lt;/option&gt;
          &lt;/optgroup&gt;
          &lt;optgroup label="Label 2"&gt;
            &lt;option value="value7"&gt;Value 7&lt;/option&gt;
            &lt;option value="value8"&gt;Value 8&lt;/option&gt;
            &lt;option value="value9"&gt;Value 9&lt;/option&gt;
          &lt;/optgroup&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
