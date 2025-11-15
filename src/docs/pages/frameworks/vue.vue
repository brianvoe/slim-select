<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect, { Settings, Option, type Events } from '@/slim-select/vue'
import ComplexFieldExample, { type FieldOption } from './complex.vue'
import ShikiStyle from '../../components/shiki_style.vue'

export default defineComponent({
  name: 'Vue',
  components: {
    ShikiStyle,
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
      },
      data: [
        { value: 'value1', text: 'Value 1' },
        { value: 'value2', text: 'Value 2' },
        { value: 'value3', text: 'Value 3' }
      ],
      afterChangeData: [] as Option[],
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
      },

      // Empty v-model example
      ogSelected: '' as string,
      emptySelected: '' as string
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

<style lang="scss">
#vue {
  .empty-selected {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-half);

    .example {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-quarter);
    }
  }
}
</style>

<template>
  <div id="vue" class="content">
    <h2 class="header">Vue</h2>

    <h3>Install</h3>
    <p>Install the slim-select package:</p>
    <ShikiStyle language="bash">
      <pre>
        npm install slim-select
      </pre>
    </ShikiStyle>

    <p>Import the Vue component and styles:</p>
    <ShikiStyle language="javascript">
      <pre>
        import SlimSelect from 'slim-select/vue'
        import 'slim-select/styles' // CSS
        // or
        import 'slim-select/scss' // SCSS
      </pre>
    </ShikiStyle>

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

    <ShikiStyle language="javascript">
      <pre>
        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
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
      </pre>
    </ShikiStyle>

    <div class="separator"></div>

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

    <ShikiStyle language="javascript">
      <pre>
        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
        </pre
      >
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
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
      </pre>
    </ShikiStyle>

    <div class="separator"></div>

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

    <ShikiStyle language="javascript">
      <pre>
        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
        &lt;SlimSelect :data="data" /&gt;

        &lt;SlimSelect :data="data" multiple /&gt;
      </pre>
    </ShikiStyle>

    <div class="separator"></div>

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

    <ShikiStyle language="javascript">
      <pre>
        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
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
      </pre>
    </ShikiStyle>

    <div class="separator"></div>

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

    <ShikiStyle language="html">
      <pre>
        &lt;SlimSelect :disabled="isDisabled"&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </pre>
    </ShikiStyle>

    <h4>class</h4>
    <div class="row">
      <div class="btn" @click="errorClass = errorClass === '' ? 'error' : ''">Toggle Error</div>
      <SlimSelect class="dynamicClass" :class="errorClass">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </SlimSelect>
    </div>

    <ShikiStyle language="html">
      <pre>
        &lt;SlimSelect :class="myClass"&gt;
          &lt;option value="1"&gt;Option 1&lt;/option&gt;
          &lt;option value="2"&gt;Option 2&lt;/option&gt;
          &lt;option value="3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </pre>
    </ShikiStyle>

    <div class="separator"></div>

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
    <ShikiStyle language="javascript">
      <pre>
        import ComplexFieldExample from 'slim-select/vue'

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
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
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
      </pre>
    </ShikiStyle>

    <p><strong>Child Component (complex.vue):</strong></p>
    <ShikiStyle language="javascript">
      <pre>
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
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
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
      </pre>
    </ShikiStyle>

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

    <div class="separator"></div>

    <h3>Empty v-model Example</h3>
    <p></p>

    <div class="column empty-selected">
      <h4>Original Selected</h4>
      <p>
        The normal select element within vue will not select an option if the value is not in the options list. but the
        value can still be set to any value you desire.
      </p>
      <div class="column example">
        <div><strong>Value</strong> {{ ogSelected || "'' (empty string)" }}</div>
        <select v-model="ogSelected">
          <option value="opt1">Option 1</option>
          <option value="opt2">Option 2</option>
          <option value="opt3">Option 3</option>
        </select>
      </div>

      <div class="row">
        <div class="btn" @click="ogSelected = 'banana'">Banana</div>
        <div class="btn" @click="ogSelected = ''">Clear Selection</div>
      </div>
    </div>

    <div class="column empty-selected">
      <h4>Empty Selected</h4>
      <div class="column example">
        <div><strong>Value</strong> {{ emptySelected || "'' (empty string)" }}</div>
        <SlimSelect v-model="emptySelected">
          <option value="opt1">Option 1</option>
          <option value="opt2">Option 2</option>
          <option value="opt3">Option 3</option>
        </SlimSelect>
      </div>

      <div class="row">
        <div class="btn" @click="emptySelected = 'banana'">Banana</div>
        <div class="btn" @click="emptySelected = ''">Clear Selection</div>
      </div>
    </div>

    <ShikiStyle language="javascript">
      <pre>
        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect
          },
          data() {
            return {
              selected: '' // Start with empty string
            }
          }
        })
      </pre>
    </ShikiStyle>

    <ShikiStyle language="html">
      <pre>
        &lt;SlimSelect v-model="selected"&gt;
          &lt;option value="opt1"&gt;Option 1&lt;/option&gt;
          &lt;option value="opt2"&gt;Option 2&lt;/option&gt;
          &lt;option value="opt3"&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;

        &lt;!-- Display current value --&gt;
        &lt;div&gt;Selected: &lcub;&lcub; selected || 'No selection' &rcub;&rcub;&lt;/div&gt;

        &lt;!-- Programmatically update v-model --&gt;
        &lt;button @click="selected = 'opt1'"&gt;Select Option 1&lt;/button&gt;
        &lt;button @click="selected = ''"&gt;Clear Selection&lt;/button&gt;
      </pre>
    </ShikiStyle>

    <div class="alert info">
      <strong>📝 Key Points:</strong>
      <ul>
        <li>Initialize v-model as an empty string (<code>''</code>) for no initial selection</li>
        <li>Options are provided via slot content (standard HTML <code>&lt;option&gt;</code> elements)</li>
        <li>v-model automatically updates when user selects an option</li>
        <li>You can programmatically update v-model from the parent component</li>
        <li>SlimSelect syncs to v-model changes via the watch handler</li>
        <li>Works exactly like a normal select element with v-model binding</li>
      </ul>
    </div>
  </div>
</template>
