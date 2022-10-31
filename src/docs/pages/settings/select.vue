<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Select',
})
</script>

<template>
  <div class="content">
    <h2 class="header">select</h2>
    <p>
      The select option is used to identify the select element that will be used to create slim select. You can any
      value you normally would in a querySelector or pass the element directly.
    </p>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '.element .you #want',
          // or
          select: document.querySelector('.element .you #want')
        })

        // If you already have a created slim select you can select your div
        // and continue to use slim select off of the element using the .slim data value
        let el = document.querySelector('.element .you #want')
        el.slim.open() // Or any other options/methods
      </code>
    </pre>
  </div>
</template>
