<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'ContentPosition',
  mounted() {
    new SlimSelect({
      select: this.$refs.contentPositionRelative as HTMLSelectElement,
      settings: {
        contentPosition: 'relative',
        contentLocation: this.$refs.contentPositionRelativeContent as HTMLElement,
      },
    })

    new SlimSelect({
      select: this.$refs.contentPositionAbsolute as HTMLSelectElement,
      settings: {
        contentPosition: 'absolute',
      },
    })
  },
})
</script>

<style lang="scss">
#contentPosition {
  .row {
    .ss-main {
      height: 30px;
    }

    .relative {
      width: 200px;
    }

    .absolute {
      width: 200px;
    }
  }
}
</style>

<template>
  <div id="contentPosition" class="content">
    <h2 class="header">contentPosition</h2>
    <p>contentPosition will set the css position to either relative. Default is <b>'absolute'</b></p>

    <div class="alert info">
      If you do use relative position be sure to set the contentLocation to an element that will work best for your use
      case. Otherwise SlimSelect will add you content to the body of the html. See example usage below.
    </div>

    <div class="row">
      <select ref="contentPositionRelative" class="relative">
        <option data-placeholder="true">Relative</option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <div ref="contentPositionRelativeContent"></div>
      <select ref="contentPositionAbsolute" class="absolute">
        <option data-placeholder="true">Absolute</option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentPosition: 'relative' // 'absolute' or 'relative'

            // To help with relative positioning 
            // you can set the contentLocation
            contentLocation: document.getElementById('local')
          }
        })
      </code>
    </pre>
  </div>
</template>
