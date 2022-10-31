<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Deselect',
  mounted() {
    new SlimSelect({
      select: '#allowDeselect',
      settings: {
        allowDeselect: true,
      },
    })

    new SlimSelect({
      select: '#deselectLabel',
      settings: {
        allowDeselect: true,
        deselectLabel: '<span class="red">✖</span>',
      },
    })

    new SlimSelect({
      select: '#allowDeselectOption',
      settings: {
        allowDeselectOption: true,
      },
    })

    new SlimSelect({
      select: '#allowDeselectOptionMultiple',
      settings: {
        allowDeselectOption: true,
      },
    })
  },
})
</script>

<style lang="scss">
.deselectLabel {
  .red {
    color: red;
  }
}
</style>

<template>
  <div class="content">
    <h2 class="header">allowDeselect</h2>
    <p>
      This will allow you to deselect a value on a single select dropdown.<br />
      Be sure to have an empty option data placeholder so slim select has an empty string value to select.
    </p>

    <div class="set-content">
      <select id="allowDeselect">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '.element .you #want',
          allowDeselect: true
        })
      </code>
    </pre>
    <pre>
      <code class="language-html">
        &lt;!-- Requires emtpy data-placeholder option --&gt;
        &lt;select id="allowDeselect"&gt;
          &lt;option data-placeholder="true"&gt;&lt;/option&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>

  <div class="content">
    <h2 class="header">deselectLabel</h2>
    <p>
      This will allow you to change the deselect label (default 'x') on single select lists, and the delete label on
      multiple-select lists.
    </p>
    <p>Note: Be aware of the lmited space available for it</p>

    <div class="set-content">
      <select id="deselectLabel" class="deselectLabel">
        <option data-placeholder="true"></option>
        <option selected value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '.element .you #want',
          allowDeselect: true,
          deselectLabel: '&lt;span class="red"&gt;✖&lt;/span&gt;'
        })
      </code>
    </pre>
    <pre>
      <code class="language-html">
        &lt;!-- Requires emtpy data-placeholder option --&gt;
        &lt;select id="deselectLabel"&gt;
          &lt;option data-placeholder="true"&gt;&lt;/option&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>

  <div class="content">
    <h2 class="header">allowDeselectOption</h2>
    <p>
      This will allow you to deselect a value in the dropdown. By simple clicking the option again.<br />
      Be sure to have an empty option data placeholder so slim select has an empty string value to select.
    </p>

    <div class="set-content">
      <select id="allowDeselectOption">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="allowDeselectOptionMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '.element .you #want',
          allowDeselectOption: true
        })
      </code>
    </pre>
    <pre>
      <code class="language-html">
        &lt;!-- Requires emtpy data-placeholder option --&gt;
        &lt;select id="allowDeselectOption"&gt;
          &lt;option data-placeholder="true"&gt;&lt;/option&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
