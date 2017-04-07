<script>
  import SlimSelect from 'slim-select/index.ts'

  export default {
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({
        select: '#slim-single-select'
      })
      new SlimSelect({
        select: '#slim-multi-select'
      })
    }
  }
</script>

<style lang="scss">
  #home-content {
    .install-code {
      width: 240px;
      margin: 0 auto;
    }
    #slim-select {

    }
    .example-code {
      width: 350px;
      margin: 0 auto;
    }

    .samples {
      display: flex;
      justify-content: space-between;
      .single {
        flex: 1 1 50%;
        padding: 0 10px 0 0;
      }
      .multi {
        flex: 1 1 50%;
        padding: 0 0 0 10px;
      }
    }

    .features {
      display: flex;
      > div {
        flex: 1 1 auto;
      }
    }
  }
</style>

<template>
  <div id="home-content">
    <div class="install-code">
      <pre v-highlightjs style="margin-top: 0px;"><code class="bash">
      npm install slim-select
      </code></pre>
    </div>

    <div class="samples">
      <div class="single">
        <select id="slim-single-select">
          <option value="best">Best</option>
          <option value="select" selected="true">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
      <div class="multi">
        <select id="slim-multi-select" multiple>
          <option value="best">Best</option>
          <option value="select" selected="true">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
    </div>

    <div class="example-code">
      <pre v-highlightjs><code class="javascript">
      import SlimSelect from 'slim-select'

      new SlimSelect({
        select: '#slim-select'
      })
      </code></pre>
    </div>

    <div class="features">

    </div>

  </div>
</template>
