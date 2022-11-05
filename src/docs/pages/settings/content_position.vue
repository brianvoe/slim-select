<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'ContentPosition',
  mounted() {
    new SlimSelect({
      select: this.$refs.contentPositionUp as HTMLSelectElement,
      settings: {
        contentPosition: 'up',
      },
    })

    new SlimSelect({
      select: this.$refs.contentPositionDown as HTMLSelectElement,
      settings: {
        contentPosition: 'down',
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">contentPosition</h2>
    <p>
      contentPosition is a string value that will decide where to show your content when it comes out. By default slim
      select will try to put the content where it can without going off screen. But you may want to always show it in
      one direction.
    </p>
    <p>Possible Options: <b>'auto', 'up' or 'down'</b>. Default is <b>'auto'</b></p>

    <div class="set-content">
      <select ref="contentPositionUp">
        <option value="up1">Up 1</option>
        <option value="up2">Up 2</option>
        <option value="up3">Up 3</option>
      </select>
      <select ref="contentPositionDown">
        <option value="down1">Down 1</option>
        <option value="down2">Down 2</option>
        <option value="down3">Down 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#contentPosition',
          settings: {
            contentPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      </code>
    </pre>
  </div>
</template>
