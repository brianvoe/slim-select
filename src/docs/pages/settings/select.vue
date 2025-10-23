<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Select'
})
</script>

<template>
  <div id="select" class="content">
    <h2 class="header">select</h2>
    <p>
      The select field is the core configuration that identifies which HTML select element SlimSelect should transform.
      This is the most fundamental setting and must be provided for SlimSelect to work. You can use any valid CSS
      selector string or pass the DOM element directly.
    </p>
    <p>
      This setting determines the target element that SlimSelect will replace with its enhanced dropdown interface,
      maintaining all the original functionality while adding advanced features like search, customization, and better
      user experience.
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
