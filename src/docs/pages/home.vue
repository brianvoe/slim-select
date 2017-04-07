<script>
  import SlimSelect from 'slim-select/index.ts'

  export default {
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({
        select: '#slim-select'
      })
    }
  }
</script>

<style lang="scss">
  #home-content {
    .install-code, #slim-select, .example-code {
      width: 250px;
      margin: 0 auto;
    }
  }
</style>

<template>
  <div id="home-content">
    <div class="install-code">
      <pre v-highlightjs><code class="bash">
      yarn add slim-select
      </code></pre>
    </div>

    <select id="slim-select">
      <option value="best">Best</option>
      <option value="select">Select</option>
      <option value="ever">Ever</option>
    </select>

    <div class="example-code">
      <pre v-highlightjs><code class="javascript">
      new SlimSelect({
        select: '#slim-select'
      })
      </code></pre>
    </div>
  </div>
</template>
