<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Select',
})
</script>

<template>
  <div id="select" class="content">
    <h2 class="header">select</h2>
    <p>
      The select field is used to identify the select element that will be used to create slim select. You can use any
      value you normally would in a querySelector or pass the element directly.
    </p>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          // or
          select: document.querySelector('#selectElement')
        })

        // If you already have a currenlty running SlimSelect but lost the reference to it.
        // You can access from the original select element.
        let el = document.querySelector('#selectElement')
        el.slim.open() // Or any other options/methods
      </code>
    </pre>
  </div>
</template>
