<script lang="ts">
import download from 'downloadjs'
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'

export default defineComponent({
  name: 'Install',
  components: {
    HighlightStyle
  },
  methods: {
    downloadJs() {
      download(`https://unpkg.com/slim-select@latest/dist/slimselect.js`)
    },
    downloadCss() {
      download(`https://unpkg.com/slim-select@latest/dist/slimselect.css`)
    }
  }
})
</script>

<style lang="scss">
#install {
  .download-btns {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-half);

    .btn {
      flex: 1 1 auto;
    }
  }
}
</style>

<template>
  <div id="install" class="contents">
    <div id="npm" class="content">
      <h2 class="header">Npm</h2>
      <p>Most common usage is npm</p>

      <HighlightStyle language="bash">
        <pre>
          npm install slim-select
        </pre>
      </HighlightStyle>

      <HighlightStyle language="javascript">
        <pre>
          import SlimSelect from 'slim-select'
          import 'slim-select/styles' // optional css import method
          import 'slim-select/scss' // optional scss import method

          new SlimSelect({
            select: '#selectElement'
          })
        </pre>
      </HighlightStyle>
    </div>

    <div id="cdn" class="content">
      <h2 class="header">Cdn</h2>
      <p>
        Cdn has a url link you can grab. Cdn exists on both
        <a target="_blank" href="https://cdnjs.com">cdnjs.com</a> and
        <a target="_blank" href="https://unpkg.com">unpkg.com</a>
      </p>
      <p>
        See full list of available options.<br />
        <strong>cdnjs</strong> -
        <a target="_blank" href="https://cdnjs.com/libraries/slim-select">cdnjs.com/libraries/slim-select</a><br />
        <strong>unpkg</strong> -
        <a target="_blank" href="https://unpkg.com/browse/slim-select/dist/"
          >https://unpkg.com/browse/slim-select/dist/</a
        >
      </p>
      <ul>
        <li>slimselect.js - UMD minified (default)</li>
        <li>slimselect.es.js - ES module build for modern browsers</li>
        <li>slimselect.cjs.js - CommonJS build for Node.js</li>
        <li>slimselect.iife.js - IIFE build for direct browser usage</li>
        <li>*.js.map - Source maps for debugging (included automatically)</li>
      </ul>
      <div class="alert info">New releases may be delayed until the next time its indexed</div>

      <HighlightStyle language="html">
        <pre>
          &lt;html&gt;
            &lt;head&gt;
              &lt;script src="https://unpkg.com/slim-select@latest/dist/slimselect.js"&gt;&lt;/script&gt;
              &lt;link href="https://unpkg.com/slim-select@latest/dist/slimselect.css" rel="stylesheet"&gt;&lt;/link&gt;
            &lt;/head&gt;
            &lt;body&gt;
              &lt;select id="selectElement"&gt;
                &lt;option&gt;Option 1&lt;/option&gt;
                &lt;option&gt;Option 2&lt;/option&gt;
                &lt;option&gt;Option 3&lt;/option&gt;
              &lt;/select&gt;
              &lt;script&gt;
                new SlimSelect({
                  select: '#selectElement'
                })
              &lt;/script&gt;
            &lt;/body&gt;
          &lt;/html&gt;
        </pre>
      </HighlightStyle>
    </div>

    <div id="download" class="content">
      <h2 class="header">Download</h2>
      <p>Download the latest minified umd version of slim select</p>
      <p>
        See full list of available downloadable options.
        <a target="_blank" href="https://cdnjs.com/libraries/slim-select">cdnjs.com/libraries/slim-select</a>
      </p>
      <div class="rows download-btns">
        <div class="btn" @click="downloadJs()">Download js</div>
        <div class="btn" @click="downloadCss()">Download css</div>
      </div>
    </div>
  </div>
</template>
