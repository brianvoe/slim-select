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
      select: this.$refs.selectHtmlSingleText as HTMLSelectElement,
      settings: {
        valuesUseText: true,
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
      select: this.$refs.selectHtmlMultiText as HTMLSelectElement,
      settings: {
        valuesUseText: true,
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
  <div class="content">
    <h2 class="header">html</h2>
    <p>Slim select has the ability to set custom html in content in the select option.</p>
    <p>
      Due to html spec we cant do this directly on the select dropdown, but we can pass them as data values to slim
      select
    </p>

    <div class="row">
      <select ref="selectHtmlSingle"></select>
      <select ref="selectHtmlMulti" multiple></select>
    </div>
    <div class="row" style="padding: 16px 0 0 0">
      <h4>Use text for selected values</h4>
    </div>
    <div class="row">
      <select ref="selectHtmlSingleText"></select>
      <select ref="selectHtmlMultiText" multiple></select>
    </div>

    <pre>
      <code class="language-javascript">
        &lt;select id="select-html"&gt;&lt;/select&gt;

        var select = new SlimSelect({
          select: '#select-html',
          valuesUseText: false, // Use text instead of html for selected values - default false
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
