<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect, { Option, type SettingsPartial, type OptionOptional, type Events } from '../../../slim-select/vue'
import ComplexFieldExample, { type FieldOption } from './complex.vue'

export default defineComponent({
  name: 'Vue',
  components: {
    SlimSelect,
    ComplexFieldExample
  },
  data() {
    return {
      // v-model data for some selects
      simpleSingle: '2',
      simpleMultiple: ['2', '3'],

      // Misc
      settings: {
        showSearch: false
      } as SettingsPartial,
      data: [
        { value: 'value1', text: 'Value 1' },
        { value: 'value2', text: 'Value 2' },
        { value: 'value3', text: 'Value 3' }
      ],
      afterChangeData: [] as OptionOptional[],
      events: {
        afterChange: this.afterChange
      } as Events,

      // Dealing with disabled
      isDisabled: false,

      // Dealing with class attribute
      errorClass: '',

      // Complex CustomFields example
      customFieldsValues: {
        favoriteColors: ['blue'],
        skills: ['javascript', 'typescript']
      } as Record<string, string[]>,
      fieldOptions: {
        favoriteColors: [
          { value: 'red', name: 'Red' },
          { value: 'blue', name: 'Blue' },
          { value: 'green', name: 'Green' },
          { value: 'yellow', name: 'Yellow' }
        ],
        skills: [
          { value: 'javascript', name: 'JavaScript' },
          { value: 'typescript', name: 'TypeScript' },
          { value: 'vue', name: 'Vue.js' },
          { value: 'react', name: 'React' },
          { value: 'angular', name: 'Angular' }
        ]
      }
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
      const dataSingleSlim = dataSingle.getSlimSelect()
      dataSingleSlim.open()

      const dataMultiple = this.$refs.dataMultiple as any
      const dataMultipleSlim = dataMultiple.getSlimSelect()
      dataMultipleSlim.open()

      setTimeout(() => {
        this.data = [
          { value: 'value4', text: 'Value 4' },
          { value: 'value5', text: 'Value 5' },
          { value: 'value6', text: 'Value 6' }
        ]
      }, 500)
    },
    afterChange(newVal: Option[]) {
      this.afterChangeData = newVal
    }
  }
})
</script>

<template>
  <div id="vue" class="content">
    <h2 class="header">Vue</h2>

    <h3>Install</h3>
    <p>Install the slim-select package:</p>
    <pre>
      <code class="language-bash">
        npm install slim-select
      </code>
    </pre>

    <p>Import the Vue component and styles:</p>
    <pre>
      <code class="language-javascript">
        import SlimSelect from 'slim-select/vue'
        import 'slim-select/styles' // CSS
        // or
        import 'slim-select/scss' // SCSS
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
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

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
      Settings just like its passed as an object in normal SlimSelect will also be passed as an object to the component
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
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

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
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

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
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

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

    <h3>Complex Example: Custom Fields Pattern</h3>
    <p>
      This example demonstrates a real-world use case similar to a CustomFields component that manages multiple dynamic
      form fields with computed values, reactive slot content, and bidirectional data flow.
    </p>

    <div class="alert info">
      <strong>Pattern:</strong> Computed values → Reactive slots → v-model → afterChange callback → Update parent data
    </div>

    <div class="row">
      <ComplexFieldExample
        v-model="customFieldsValues.favoriteColors"
        :field-options="fieldOptions.favoriteColors"
        label="Favorite Colors"
      />

      <ComplexFieldExample v-model="customFieldsValues.skills" :field-options="fieldOptions.skills" label="Skills" />
    </div>

    <div class="alert info" style="margin-top: 16px">
      <strong>Parent Data:</strong>
      <pre style="margin: 8px 0 0 0; background: rgba(0, 0, 0, 0.1); padding: 8px; border-radius: 4px">{{
        JSON.stringify(customFieldsValues, null, 2)
      }}</pre>
    </div>

    <p><strong>Parent Component (vue.vue):</strong></p>
    <pre>
      <code class="language-javascript">
        import ComplexFieldExample from './complex.vue'

        export default {
          components: { ComplexFieldExample },
          data() {
            return {
              // Parent stores the values
              customFieldsValues: {
                favoriteColors: ['blue'],
                skills: ['javascript', 'typescript']
              },
              // Parent stores the options
              fieldOptions: {
                favoriteColors: [
                  { value: 'red', name: 'Red' },
                  { value: 'blue', name: 'Blue' },
                  { value: 'green', name: 'Green' }
                ],
                skills: [
                  { value: 'javascript', name: 'JavaScript' },
                  { value: 'typescript', name: 'TypeScript' },
                  { value: 'vue', name: 'Vue.js' }
                ]
              }
            }
          }
        }
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;!-- Parent template --&gt;
        &lt;ComplexFieldExample
          label="Favorite Colors"
          v-model="customFieldsValues.favoriteColors"
          :field-options="fieldOptions.favoriteColors"
        /&gt;

        &lt;ComplexFieldExample
          label="Skills"
          v-model="customFieldsValues.skills"
          :field-options="fieldOptions.skills"
        /&gt;
      </code>
    </pre>

    <p><strong>Child Component (complex.vue):</strong></p>
    <pre>
      <code class="language-javascript">
        import SlimSelect from 'slim-select/vue'

        export default {
          components: { SlimSelect },
          props: {
            modelValue: { type: Array, required: true },
            fieldOptions: { type: Array, required: true },
            label: { type: String, required: true }
          },
          emits: ['update:modelValue'],
          computed: {
            value: {
              get() { return this.modelValue || [] },
              set(newValue) { this.$emit('update:modelValue', newValue) }
            }
          },
          methods: {
            handleChange() {
              console.log(`${this.label} changed:`, this.value)
            }
          }
        }
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;!-- Child template with reactive slot content --&gt;
        &lt;SlimSelect
          v-model="value"
          multiple
          :events="{ afterChange: () => handleChange() }"&gt;
          &lt;option
            v-for="option in fieldOptions"
            :key="option.value"
            :value="option.value"&gt;
            &lcub;&lcub; option.name &rcub;&rcub;
          &lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>

    <div class="alert info">
      <strong>Key Features:</strong>
      <ul>
        <li>✅ <strong>Parent-child pattern</strong> - Parent stores data, child renders SlimSelect</li>
        <li>✅ <strong>v-model on child</strong> - Two-way binding between parent and child</li>
        <li>✅ <strong>Props down</strong> - fieldOptions and label passed to child</li>
        <li>✅ <strong>Events up</strong> - Child emits update:modelValue to parent</li>
        <li>✅ <strong>Reactive slots</strong> - Child uses v-for with SlimSelect slot options</li>
        <li>✅ <strong>Computed value</strong> - Child computes value getter/setter for v-model</li>
        <li>✅ <strong>afterChange callback</strong> - Custom logic in child component</li>
        <li>✅ <strong>Fully reactive</strong> - Parent data changes flow to child automatically</li>
      </ul>
    </div>
  </div>
</template>
