<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'OpenPosition',
  mounted() {
    new SlimSelect({
      select: this.$refs.openPositionUp as HTMLSelectElement,
      settings: {
        openPosition: 'up',
      },
    })

    new SlimSelect({
      select: this.$refs.openPositionDown as HTMLSelectElement,
      settings: {
        openPosition: 'down',
      },
    })
  },
})
</script>

<template>
  <div id="openPosition" class="content">
    <h2 class="header">openPosition</h2>
    <p>
      openPosition is a string value that will decide where to show your content when it comes out. By default slim
      select will try to put the content where it can without going off screen. But you may want to always show it in
      one direction.
    </p>
    <p>Possible Options: <b>'auto', 'up' or 'down'</b>. Default is <b>'auto'</b></p>

    <div class="row">
      <select ref="openPositionUp">
        <option value="up1">Up 1</option>
        <option value="up2">Up 2</option>
        <option value="up3">Up 3</option>
      </select>
      <select ref="openPositionDown">
        <option value="down1">Down 1</option>
        <option value="down2">Down 2</option>
        <option value="down3">Down 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      </code>
    </pre>
  </div>
</template>
