<script>
  import SlimSelect from 'slim-select/index.ts'

  export default {
    data: () => {
      return {
        version: false
      }
    },
    mounted () {
      fetch('https://api.github.com/repos/brianvoe/slim-select/git/refs/tags').then((response) => {
        return response.json()
      }).then((json) => {
        var values = json[json.length - 1].ref.split('v')
        if (values[1]) {
          this.version = values[1]
        }
      })
    }
  }
</script>

<style lang="scss">
  #install-content {
    .install-code {
      max-width: 225px;
      margin: 0 auto;
    }
    .install-code-cdn {
      max-width: 735px;
      margin: 0 auto;
    }
    .example-code {
      max-width: 330px;
      margin: 0 auto;
    }

    .or {
      text-align: center;
      font-weight: bold;
      padding: 0 0 10px 0;
    }
  }
</style>

<template>
  <div id="install-content" class="content">
    <div class="install-code">
    <pre v-highlightjs style="margin-top: 0px;"><code class="bash">
    npm install slim-select
    </code></pre>
    </div>

    <div class="or">Or</div>

    <div class="install-code-cdn" v-if="version">
    <pre v-highlightjs style="margin-top: 0px;"><code class="bash">
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/slim-select/{{version}}/slimselect.min.js"&gt;&lt;/script&gt;
    &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/slim-select/{{version}}/slimselect.min.css" rel="stylesheet"&gt;&lt;/link&gt;
    </code></pre>
    </div>

    <div class="example-code">
    <pre v-highlightjs><code class="javascript">
    import SlimSelect from 'slim-select'

    new SlimSelect({
      select: '#slim-select'
    })
    </code></pre>
    </div>

  </div>
</template>
