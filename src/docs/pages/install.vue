<script lang="ts">
import download from 'downloadjs'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Install',
  methods: {
    downloadJs() {
      download(`https://unpkg.com/slim-select@latest/dist/slimselect.min.js`)
    },
    downloadCss() {
      download(`https://unpkg.com/slim-select@latest/dist/slimselect.css`)
    },
  },
})
</script>

<template>
  <div id="install" class="contents">
    <div id="npm" class="content">
      <h2>Npm</h2>
      <p>Most common usage is npm</p>

      <pre class="install-code">
        <code class="language-bash">
          npm install slim-select
        </code>
      </pre>

      <pre class="example-code">
        <code class="language-javascript">
          import SlimSelect from 'slim-select'

          new SlimSelect({
            select: '#selectElement'
          })
        </code>
      </pre>
    </div>

    <div id="cdn" class="content">
      <h2>Cdn</h2>
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
        <li>slimselct.js - UMD unminified</li>
        <li>slimselct.min.js - UMD minified</li>
        <li>slimselect.cjs.js - CommonJS (for Node) and ES module (for bundlers) build</li>
        <li>slimselect.umd.js - UMD build for browsers</li>
        <li>slimselect.es.js - ES module build for modern browsers</li>
        <li>slimselect.global.js - IIFE build for modern browsers</li>
      </ul>
      <div class="alert info">New releases may be delayed until the next time its indexed</div>

      <pre class="install-code">
        <code class="language-html">
          &lt;html&gt;
            &lt;head&gt;
              &lt;script src="https://unpkg.com/slim-select@latest/dist/slimselect.min.js"&gt;&lt;/script&gt;
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
        </code>
      </pre>
    </div>

    <div id="download" class="content">
      <h2>Download</h2>
      <p>Download the latest minified umd version of slim select</p>
      <p>
        See full list of available downloadable options.
        <a target="_blank" href="https://cdnjs.com/libraries/slim-select">cdnjs.com/libraries/slim-select</a>
      </p>
      <div class="btn" @click="downloadJs()">Download js</div>
      <div class="btn" @click="downloadCss()">Download css</div>
    </div>
  </div>
</template>
