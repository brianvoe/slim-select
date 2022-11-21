<script lang="ts">
import download from 'downloadjs'
import { defineComponent } from 'vue'
import packageJson from '../../../package.json'

export default defineComponent({
  name: 'Install',
  data: () => {
    return {
      version: packageJson.version,
    }
  },
  methods: {
    downloadLink() {
      download(`https://cdnjs.cloudflare.com/ajax/libs/slim-select/${this.version}/slimselect.min.js`)
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
      <p>Cdn has a url link you can grab.</p>
      <p>
        See full list of available options.
        <a target="_blank" href="https://cdnjs.com/libraries/slim-select">cdnjs.com/libraries/slim-select</a>
      </p>
      <div class="alert info">New releases may be delayed until the next time its indexed</div>

      <pre class="install-code">
        <code class="language-html">
          &lt;html&gt;
            &lt;head&gt;
              &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/slim-select/{{version}}/slimselect.js"&gt;&lt;/script&gt;
              &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/slim-select/{{version}}/slimselect.css" rel="stylesheet"&gt;&lt;/link&gt;
              
              &lt;script&gt;
                new SlimSelect({
                  select: '#selectElement'
                })
              &lt;script&gt;
            &lt;/head&gt;
            &lt;body&gt;
              &lt;select id="selectElement"&gt;
                &lt;option&gt;Option 1&lt;/option&gt;
                &lt;option&gt;Option 2&lt;/option&gt;
                &lt;option&gt;Option 3&lt;/option&gt;
              &lt;/select&gt;
            &lt;/body&gt;
          &lt;/html&gt;
        </code>
      </pre>
    </div>

    <div id="download" class="content">
      <h2>Download</h2>
      <p>Download the latest minified version of slim select</p>
      <div class="btn" @click="downloadLink()">Click Here To Download</div>
    </div>
  </div>
</template>
