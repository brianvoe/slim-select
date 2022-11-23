<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@slim-select/vue'
import Settings from '../../../slim-select/settings'
import { Option } from '../../../slim-select/store'

export default defineComponent({
  name: 'Vue',
  components: {
    SlimSelect,
  },
  data() {
    return {
      settings: {
        showSearch: false,
      } as Settings,
      data: [
        { value: 'value1', text: 'Value 1' },
        { value: 'value2', text: 'Value 2' },
        { value: 'value3', text: 'Value 3' },
      ],
      afterChangeData: [] as Option[],
      events: {
        afterChange: this.afterChange,
      },
    }
  },
  methods: {
    afterChange(newVal: Option[]) {
      this.afterChangeData = newVal
    },
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
        npm install @slim-select/vue
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

      <SlimSelect multiple>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <pre>
      <code class="language-javascript">
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
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

        &lt;SlimSelect multiple&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Settings</h3>
    <p>
      Settings just like its passed as an object in normal SlimSelct will also be passed as an object to the component
      prop
    </p>

    <div class="row">
      <SlimSelect :settings="settings">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>

      <SlimSelect :settings="settings" multiple>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <pre>
      <code class="language-javascript">
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              data: [
                { value: 'value1', text: 'Value 1' },
                { value: 'value2', text: 'Value 2' },
                { value: 'value3', text: 'Value 3' },
              ],
            }
          },
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;SlimSelect :settings="settings"&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;

        &lt;SlimSelect :settings="settings" multiple&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Data</h3>
    <p>
      Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop.
    </p>
    <div class="alert info">
      You may pass data as a prop if you would like. But you can also have reactive options that when options change the
      select will update as well. This is done by SlimSelect mutation observer.
    </div>

    <div class="row">
      <SlimSelect :data="data" />
      <SlimSelect :data="data" multiple />
    </div>

    <pre>
      <code class="language-javascript">
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              settings: {
                showSearch: false,
              },
            }
          },
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;SlimSelect :data="data" /&gt;

        &lt;SlimSelect :data="data" multiple /&gt;
      </code>
    </pre>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Events</h3>
    <p>
      Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component
      prop.
    </p>

    <div v-if="afterChangeData.length"><strong>afterChange:</strong> {{ afterChangeData }}</div>
    <div class="row">
      <SlimSelect :events="events">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>

      <SlimSelect :events="events" multiple>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <pre>
      <code class="language-javascript">
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              events: {
                afterChange: this.afterChange,
              },
            }
          },
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;SlimSelect :events="events"&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;

        &lt;SlimSelect :events="events" multiple&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>
  </div>
</template>
