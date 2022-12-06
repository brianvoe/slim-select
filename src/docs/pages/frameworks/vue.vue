<script lang="ts">
import { defineComponent, ref } from 'vue'

// We need to import from the root of the package
// Because if we use @slim-select/vue then we loose
// hot reloading of the file changes
import SlimSelectJS from '../../../slim-select'
import SlimSelect from '../../../vue/slimselect.vue'
import Settings from '../../../slim-select/settings'
import { Option, OptionOptional } from '../../../slim-select/store'
import { Events } from '../../../slim-select'

export default defineComponent({
  name: 'Vue',
  components: {
    SlimSelect,
  },
  data() {
    return {
      // v-model data for some selects
      simpleSingle: '2',
      simpleMultiple: ['2', '3'],

      // Misc
      settings: {
        showSearch: false,
      } as Settings,
      data: [
        { value: 'value1', text: 'Value 1' },
        { value: 'value2', text: 'Value 2' },
        { value: 'value3', text: 'Value 3' },
      ],
      afterChangeData: [] as OptionOptional[],
      events: {
        afterChange: this.afterChange,
      } as Events,

      // Dealing with disabled
      isDisabled: false,

      // Dealing with class attribute
      errorClass: '',
    }
  },
  mounted() {
    // // Show the original select for debugging
    // const compSingle = this.$refs.simpleSingle as any
    // const slimSingle = compSingle.getSlimSelect() as SlimSelectJS
    // slimSingle.select.showUI()
    // setTimeout(() => {
    //   slimSingle.select.select.value = ''
    //   slimSingle.select.select.dispatchEvent(new Event('change'))
    // }, 1000)
    // const compMultiple = this.$refs.simpleMultiple as any
    // const slimMultiple = compMultiple.getSlimSelect()
    // slimMultiple.select.showUI()
  },
  methods: {
    changeData() {
      const dataSingle = this.$refs.dataSingle as any
      const dataSingleSlim = dataSingle.getSlimSelect() as SlimSelectJS
      dataSingleSlim.open()

      const dataMultiple = this.$refs.dataMultiple as any
      const dataMultipleSlim = dataMultiple.getSlimSelect() as SlimSelectJS
      dataMultipleSlim.open()

      setTimeout(() => {
        this.data = [
          { value: 'value4', text: 'Value 4' },
          { value: 'value5', text: 'Value 5' },
          { value: 'value6', text: 'Value 6' },
        ]
      }, 500)
    },
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
    <p>
      The vue component is in a sub package under SlimSelect. All functionality still work in the implementation. I have
      also added a v-model bind capability to it as well.
    </p>
    <pre>
      <code class="language-bash">
        npm install @slim-select/vue
      </code>
    </pre>
    <br />

    <h3>Simple example</h3>
    <div class="row">
      <div>
        <!-- <div class="btn" @click="simpleSingle = '2'">Set v-model</div> -->
        <div><strong>Value</strong> {{ simpleSingle }}</div>
        <SlimSelect v-model="simpleSingle" ref="simpleSingle">
          <option value="all">All</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      </div>

      <div>
        <div><strong>Value</strong> {{ simpleMultiple }}</div>
        <SlimSelect v-model="simpleMultiple" ref="simpleMultiple" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      </div>
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
              single: '2',
              multiple: ['2', '3']
            }
          }
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;SlimSelect v-model="single"&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;

        &lt;SlimSelect v-model="multiple" multiple&gt;
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
              settings: {
                showSearch: false,
              }
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
      select will update as well. See Reactivity below for more info.
    </div>

    <div class="row">
      <div class="btn info" @click="changeData">Change data</div>
      <SlimSelect ref="dataSingle" :data="data" />
      <SlimSelect ref="dataMultiple" :data="data" multiple />
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
          methods: {
            afterChange(newVal) {
              console.log(newVal)
            },
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

    <br />
    <div class="separator"></div>
    <br />

    <h3>Attributes</h3>
    <p>There are certain attributes that are reactive to changes</p>

    <h4>disabled</h4>
    <div class="row">
      <div class="btn" @click="isDisabled = !isDisabled">Toggle Disabled</div>
      <SlimSelect :disabled="isDisabled">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <pre>
      <code class="language-html">
        &lt;SlimSelect :disabled="isDisabled"&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>

    <h4>class</h4>
    <div class="row">
      <div class="btn" @click="errorClass = errorClass === '' ? 'error' : ''">Toggle Error</div>
      <SlimSelect class="dynamicClass" :class="errorClass">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <pre>
      <code class="language-html">
        &lt;SlimSelect :class="myClass"&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Reactivity</h3>
    <p>
      Slim select handles the underlying select option alterations for you. But the issue is that if you allow Vue to
      also handle the select option alterations then you will have two things trying to alter the select options and
      that will cause Vue to error out. So for now you can add static options to the SlimSelect component but then no
      more altering after that. Any dynamic data should be passed into the data prop.
    </p>

    <div class="alert info">That being said props added to the main SlimSelect component can be dynamic.</div>

    <p>
      If anyone knows how to deal with this in a reasonable way please go the
      <a target="_blank" href="https://github.com/brianvoe/slim-select/issues/386">github repo</a> and submit a pr.
    </p>

    <pre>
      <code class="language-html">
        &lt;SlimSelect v-model="value"&gt;

          //////////////////////
          // DON'T DO THIS!!! //
          //////////////////////
          &lt;option v-for="d in data" :key="d.id" :value="d.value" :selected="d.selected"&gt;&lcub;&lcub; d.text &rcub;&rcub;&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>
  </div>
</template>
