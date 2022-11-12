<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Html',
  mounted() {
    new SlimSelect({
      select: this.$refs.selectHtmlSingle as HTMLSelectElement,
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
          html: '<i>Slim Select you are awesome</i>',
          text: 'Slim Select awesome',
        },
        {
          html: '<div style="border: solid 1px #666666;">Border</div>',
          text: 'Border',
          value: 'border',
        },
      ],
    })

    new SlimSelect({
      select: this.$refs.selectHtmlMulti as HTMLSelectElement,
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
          html: '<i>Slim Select you are awesome</i>',
          text: 'Slim Select awesome',
        },
        {
          html: '<div style="border: solid 1px #666666;">Border</div>',
          text: 'Border',
          value: 'border',
        },
      ],
    })
  },
})
</script>

<template>
  <div id="html" class="content">
    <h2 class="header">html</h2>
    <p>
      Slim select has the ability to set custom html for the selected values and options dropdown. By default if the
      html field is set it will use that for the selected values and the options dropdown. For a multiple select it will
      always use the text field.
    </p>

    <div class="row">
      <select ref="selectHtmlSingle"></select>
      <select ref="selectHtmlMulti" multiple></select>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '&lt;img height="30" width="30" src="http://lorempixel.com/30/30" /&gt;&nbsp;Image', text: 'Image', value: 'image'},
            {html: '&lt;b&gt;Bold Text&lt;/b&gt;', text: 'Bold Text', value: 'bold text'},
            {html: '&lt;div style="border: solid 1px #666666;"&gt;Border&lt;/div&gt;', text: 'Border', value: 'border'},
            {html: '&lt;i&gt;Slim Select you are awesome&lt;/i&gt;', text: 'Slim Select awesome'}
          ]
        })
      </code>
    </pre>
  </div>
</template>
