<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'OpenPosition',
  mounted() {
    new SlimSelect({
      select: this.$refs.openPositionUp as HTMLSelectElement,
      settings: {
        openPosition: 'up'
      }
    })

    new SlimSelect({
      select: this.$refs.openPositionDown as HTMLSelectElement,
      settings: {
        openPosition: 'down'
      }
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="openPosition" class="content">
    <h2 class="header">openPosition</h2>
    <p>
      The openPosition setting controls the direction in which the dropdown content opens. By default, SlimSelect
      automatically determines the best direction based on available screen space, but you can force it to always open
      in a specific direction.
    </p>
    <p>
      This setting is particularly useful for maintaining consistent user interface behavior, ensuring the dropdown
      always appears in a predictable location, or when you have specific design requirements that need the dropdown to
      open in a particular direction regardless of screen position.
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

    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      </pre>
    </ShikiStyle>
  </div>
</template>
