<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Html',
  mounted() {
    new SlimSelect({
      select: this.$refs.htmlSingle as HTMLSelectElement,
      settings: {
        searchHighlight: true,
      },
      data: [
        {
          html: '<b>Bold Text</b>',
          text: 'Bold Text',
          value: 'bold text',
        },
        {
          html: '<div style="border: solid 1px #666666;">Border</div>',
          text: 'Border',
          value: 'border',
        },
        {
          html: '<i>Slim Select is awesome</i>',
          text: 'Slim Select is awesome',
        },
      ],
    })

    new SlimSelect({
      select: this.$refs.htmlMulti as HTMLSelectElement,
      settings: {
        searchHighlight: true,
      },
      // data: [
      //   {
      //     html: '<b>Bold Text</b>',
      //     text: 'Bold Text',
      //     value: 'bold text',
      //   },
      //   {
      //     html: '<div style="border: solid 1px #666666;">Border</div>',
      //     text: 'Border',
      //     value: 'border',
      //   },
      //   {
      //     html: '<i>Slim Select is awesome</i>',
      //     text: 'Slim Select is awesome',
      //   },
      // ],
    })
  },
})
</script>

<template>
  <div id="html" class="content">
    <h2 class="header">html</h2>
    <p>
      Slim select has the ability to set custom html for the selected values and options dropdown. By default if the
      html field is set it will use that for the selected values and the options dropdown. For a multiple select
      selected values it will always use the text field.
    </p>

    <div class="row">
      <select ref="htmlSingle"></select>
      <select ref="htmlMulti" multiple>
        <option value="bold text" data-html="<b>Bold Text</b>">Bold Text</option>
        <option value="border" data-html="<div style='border: solid 1px #666666;'>Border</div>">Border</option>
        <option value="slim select" data-html="<i>Slim Select is awesome</i>">Slim Select is awesome</option>
      </select>
    </div>

    <h3>Via data</h3>
    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '&lt;b&gt;Bold Text&lt;/b&gt;', text: 'Bold Text', value: 'bold text'},
            {html: '&lt;div style="border: solid 1px #666666;"&gt;Border&lt;/div&gt;', text: 'Border', value: 'border'},
            {html: '&lt;i&gt;Slim Select is awesome&lt;/i&gt;', text: 'Slim Select is awesome'}
          ]
        })
      </code>
    </pre>

    <h3>Via data attribute</h3>
    <pre>
      <code class="language-html">
        &lt;select id="selectElement"&gt;
          &lt;option value="bold text" data-html="&lt;b&gt;Bold Text&lt;/b&gt;"&gt;Bold Text&lt;/option&gt;
          &lt;option value="border" data-html="&lt;div style=&quot;border: solid 1px #666666;&quot;&gt;Border&lt;/div&gt;"&gt;Border&lt;/option&gt;
          &lt;option value="slim select" data-html="&lt;i&gt;Slim Select is awesome&lt;/i&gt;"&gt;Slim Select awesome&lt;/option&gt;
        &lt;/select&gt;
      </code>
    </pre>
  </div>
</template>
