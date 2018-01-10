<script>
  import SlimSelect from 'slim-select/index.ts'
  import packageJson from 'src/../package.json'

  export default {
    data: () => {
      return {
        version: packageJson.version
      }
    }
  }
</script>

<style lang="scss">
  #install-content {
    .npm-content {
      padding: 0 0 30px 0;

      .install-code {
        max-width: 180px;
        margin-left: auto;
        margin-right: auto;
      }
      .example-code {
        max-width: 310px;
        margin: 0 auto;
      }
    }

    .cdn-content {
      .example-code {
        max-width: 200px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
</style>

<template>
  <div id="install-content" class="content">

    <div class="npm-content">
      <h2>Npm</h2>
      <pre class="install-code">
        <code class="language-bash">
          npm install slim-select
        </code>
      </pre>

      <pre class="example-code">
        <code class="language-javascript">
          import SlimSelect from 'slim-select'

          new SlimSelect({
            select: '#slim-select'
          })
        </code>
      </pre>
    </div>

    <div class="cdn-content">
      <h2>Cdn</h2>
      <pre class="install-code">
        <code class="language-html">
          &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/slim-select/{{version}}/slimselect.min.js"&gt;&lt;/script&gt;
          &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/slim-select/{{version}}/slimselect.min.css" rel="stylesheet"&gt;&lt;/link&gt;
        </code>
      </pre>

      <pre class="example-code">
        <code class="language-javascript">
          new SlimSelect({
            select: '#slim-select'
          })
        </code>
      </pre>
    </div>

  </div>
</template>
