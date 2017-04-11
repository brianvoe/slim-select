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
      width: 250px;
      margin: 0 auto;
    }
    .example-code {
      width: 355px;
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

    .callouts {
      padding: 20px 0 0 0;
      display: flex;
      justify-content: space-around;

      > div {
        flex: 0 1 auto;

        .list {
          line-height: 20px;
        }
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

    <div class="callouts">
      <div class="features">
        <div class="header"><h2>Features</h2></div>
        <ul class="list">
          <li>No Dependencies</li>
          <li>Small File Size 15kb</li>
          <li>Single Select</li>
          <li>Multiple Select</li>
          <li>Html Options</li>
          <li>Searching</li>
        </ul>
      </div>

      <div>
        <div class="header"><h2>&nbsp;</h2></div>
        <ul class="list">
          <li>Placeholders</li>
          <li>Options Via Data</li>
          <li>Event Callbacks</li>
          <li>Light Css</li>
          <li>Clean Animations</li>
          <li>Performant</li>
        </ul>
      </div>

      <div class="browsers">
        <div class="header"><h2>Browsers</h2></div>
        <ul class="list">
          <li>IE 11+</li>
          <li>Edge 13+</li>
          <li>Chrome 30+</li>
          <li>FireFox 25+</li>
        </ul>
      </div>
    </div>

  </div>
</template>
