<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../vue/slimselect.vue'

export default defineComponent({
  name: 'Vue',
  components: {
    SlimSelect,
  },
})
</script>

<template>
  <div id="error" class="content">
    <h2 class="header">Vue</h2>

    <div class="row">
      <SlimSelect>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      </code>
    </pre>
  </div>
</template>
