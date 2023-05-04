<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'React',
  components: {},
  mounted() {},
})
</script>

<template>
  <div id="react" class="content">
    <h2 class="header">React</h2>

    <h3>Install</h3>
    <p>The react component is in a sub package under SlimSelect. All functionality still work in the implementation.</p>
    <pre>
      <code class="language-bash">
        npm install @slim-select/react
      </code>
    </pre>
    <div id="react-root"></div>
    <br />
  </div>
</template>
