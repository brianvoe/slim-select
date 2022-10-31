<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Placeholder',
  mounted() {
    new SlimSelect({
      select: '#placeholderSingle',
      settings: {
        placeholderText: 'Custom Placeholder Text',
      },
    })

    new SlimSelect({
      select: '#placeholderMultiple',
      settings: {
        placeholderText: 'Custom Placeholder Text',
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">placeholderText</h2>
    <p>
      Placeholders consists of setting the placeholder option value. The only difference is single selects require an
      empty option with data-placeholder set to true. Default value is "Select Value".
    </p>

    <div class="set-content">
      <select id="placeholderSingle">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="placeholderMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#placeholder',
            settings: {
              placeholderText: 'Custom Placeholder Text',
            }
          })
        </code>
      </pre>

    <pre>
        <code class="language-html">
          &lt;!-- Set empty option with data-placeholder if you to have placeholder --&gt;
          &lt;!-- text for single select, otherwise first option will be selected --&gt;
          &lt;select id="placeholderSingle"&gt;
            &lt;option data-placeholder="true"&gt;&lt;/option&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
  </div>
</template>
