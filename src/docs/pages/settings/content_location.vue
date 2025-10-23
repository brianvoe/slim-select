<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'ContentLocation',
  mounted() {
    new SlimSelect({
      select: this.$refs.contentLocation as HTMLSelectElement,
      settings: {
        contentLocation: this.$refs.local as HTMLElement
      }
    })
  }
})
</script>

<template>
  <div id="contentLocation" class="content">
    <h2 class="header">contentLocation</h2>
    <p>
      The contentLocation setting allows you to specify where the dropdown content (search input and options) should be
      rendered in the DOM. By default, SlimSelect appends the content to the document body, but you can redirect it to
      any container element.
    </p>
    <p>
      This is particularly useful for maintaining proper z-index layering, avoiding overflow issues, or ensuring the
      dropdown appears within a specific container. The content container includes the search input field and all
      available options, giving you control over where this interactive area appears.
    </p>

    <div class="row">
      <select ref="contentLocation" style="width: 50%">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <div ref="local"></div>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;select id="contentLocation"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;!-- The content will go in this div --&gt;
        &lt;div id="local"&gt;&lt;/div&gt;
      </code>
    </pre>
  </div>
</template>
