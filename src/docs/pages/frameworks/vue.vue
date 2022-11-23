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
  <div id="vue" class="content">
    <h2 class="header">Vue</h2>

    <h3>Install</h3>
    <p>The vue component is in a sub package under SlimSelect</p>
    <pre>
      <code class="language-bash">
        npm install slim-select@vue
      </code>
    </pre>
    <br />

    <h3>Simple example</h3>
    <div class="row">
      <SlimSelect>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <pre>
      <code class="language-javascript">
        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

        export default defineComponent({
          name: 'Vue',
          components: {
            SlimSelect,
          },
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;SlimSelect&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>
  </div>
</template>
