<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect, { Settings, Option, type Events } from '@/slim-select/vue'
import ComplexFieldExample, { type FieldOption } from './complex.vue'
import HighlightStyle from '../../components/highlight_style.vue'

export default defineComponent({
  name: 'Vue',
  components: {
    HighlightStyle,
    SlimSelect,
    ComplexFieldExample
  },
  data() {
    return {
      // v-model data for some selects
      simpleSingle: '2',
      simpleMultiple: ['2', '3'],
      simpleSingleOptions: [
        { value: 'all', text: 'All' },
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
      ],
      basicOptions: [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
      ],

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
      emptySelected: '' as string,
      emptyArraySelected: [] as string[],
      emptyVmodelOptions: [
        { value: 'opt1', text: 'Option 1' },
        { value: 'opt2', text: 'Option 2' },
        { value: 'opt3', text: 'Option 3' }
      ]
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
    <HighlightStyle language="bash">
      <pre>
        npm install slim-select
      </pre>
    </HighlightStyle>

    <p>Import the Vue component and styles:</p>
    <HighlightStyle language="javascript">
      <pre>
        import SlimSelect from 'slim-select/vue'
        import 'slim-select/styles' // CSS
        // or
        import 'slim-select/scss' // SCSS
      </pre>
    </HighlightStyle>

    <h3>Simple example</h3>
    <div class="row">
      <div>
        <!-- <div class="btn" @click="simpleSingle = '2'">Set v-model</div> -->
        <div><strong>Value</strong> {{ simpleSingle }}</div>
        <SlimSelect v-model="simpleSingle" :data="simpleSingleOptions" ref="simpleSingle" />
      </div>

      <div>
        <div><strong>Value</strong> {{ simpleMultiple }}</div>
        <SlimSelect v-model="simpleMultiple" :data="basicOptions" ref="simpleMultiple" multiple />
      </div>
    </div>

    <HighlightStyle language="javascript">
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
              multiple: ['2', '3'],
              options: [
                { value: '1', text: 'Option 1' },
                { value: '2', text: 'Option 2' },
                { value: '3', text: 'Option 3' }
              ]
            }
          }
        })
      </pre>
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;SlimSelect v-model="single" :data="options" /&gt;

        &lt;SlimSelect v-model="multiple" :data="options" multiple /&gt;
      </pre>
    </HighlightStyle>

    <div class="separator"></div>

    <h3>Settings</h3>
    <p>
      Settings just like its passed as an object in normal SlimSelect will also be passed as an object to the component
      prop
    </p>

    <div class="row">
      <SlimSelect :settings="settings" :data="basicOptions" />

      <SlimSelect :settings="settings" :data="basicOptions" multiple />
    </div>

    <HighlightStyle language="javascript">
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
              },
              options: [
                { value: '1', text: 'Option 1' },
                { value: '2', text: 'Option 2' },
                { value: '3', text: 'Option 3' }
              ]
            }
          },
        })
        </pre
      >
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;SlimSelect :settings="settings" :data="options" /&gt;

        &lt;SlimSelect :settings="settings" :data="options" multiple /&gt;
      </pre>
    </HighlightStyle>

    <div class="separator"></div>

    <h3>Data</h3>
    <p>
      Pass options via the required <code>data</code> prop — the same array shape as core SlimSelect. When the array
      changes, the select updates reactively.
    </p>

    <div class="row">
      <div class="btn info" @click="changeData">Change data</div>
      <SlimSelect ref="dataSingle" :data="data" />
      <SlimSelect ref="dataMultiple" :data="data" multiple />
    </div>

    <HighlightStyle language="javascript">
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
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;SlimSelect :data="data" /&gt;

        &lt;SlimSelect :data="data" multiple /&gt;
      </pre>
    </HighlightStyle>

    <div class="separator"></div>

    <h3>Events</h3>
    <p>
      Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component
      prop.
    </p>

    <div v-if="afterChangeData.length"><strong>afterChange:</strong> {{ afterChangeData }}</div>
    <div class="row">
      <SlimSelect :events="events" :data="basicOptions" />

      <SlimSelect :events="events" :data="basicOptions" multiple />
    </div>

    <HighlightStyle language="javascript">
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
              options: [
                { value: '1', text: 'Option 1' },
                { value: '2', text: 'Option 2' },
                { value: '3', text: 'Option 3' }
              ]
            }
          },
          methods: {
            afterChange(newVal) {
              console.log(newVal)
            },
          },
        })
      </pre>
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;SlimSelect :events="events" :data="options" /&gt;

        &lt;SlimSelect :events="events" :data="options" multiple /&gt;
      </pre>
    </HighlightStyle>

    <div class="separator"></div>

    <h3>Attributes</h3>
    <p>There are certain attributes that are reactive to changes</p>

    <h4>disabled</h4>
    <div class="row">
      <div class="btn" @click="isDisabled = !isDisabled">Toggle Disabled</div>
      <SlimSelect :disabled="isDisabled" :data="basicOptions" />
    </div>

    <HighlightStyle language="html">
      <pre>
        &lt;SlimSelect :disabled="isDisabled" :data="options" /&gt;
      </pre>
    </HighlightStyle>

    <h4>class</h4>
    <div class="row">
      <div class="btn" @click="errorClass = errorClass === '' ? 'error' : ''">Toggle Error</div>
      <SlimSelect class="dynamicClass" :class="errorClass" :data="basicOptions" />
    </div>

    <HighlightStyle language="html">
      <pre>
        &lt;SlimSelect :class="myClass" :data="options" /&gt;
      </pre>
    </HighlightStyle>

    <div class="separator"></div>

    <h3>Complex Example: Custom Fields Pattern</h3>
    <p>
      This example demonstrates a real-world use case similar to a CustomFields component that manages multiple dynamic
      form fields with computed values, reactive data, and bidirectional data flow.
    </p>

    <div class="alert info">
      <strong>Pattern:</strong> Computed values → Reactive <code>data</code> prop → v-model → afterChange callback → Update parent data
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
    <HighlightStyle language="javascript">
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
    </HighlightStyle>

    <HighlightStyle language="html">
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
    </HighlightStyle>

    <p><strong>Child Component (complex.vue):</strong></p>
    <HighlightStyle language="javascript">
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
            selectData() {
              return this.fieldOptions.map((option) => ({
                value: option.value,
                text: option.name
              }))
            },
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
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;!-- Child template maps fieldOptions to SlimSelect data --&gt;
        &lt;SlimSelect
          v-model="value"
          multiple
          :data="selectData"
          :events="{ afterChange: () => handleChange() }" /&gt;
      </pre>
    </HighlightStyle>

    <div class="alert info">
      <strong>Key Features:</strong>
      <ul>
        <li>✅ <strong>Parent-child pattern</strong> - Parent stores data, child renders SlimSelect</li>
        <li>✅ <strong>v-model on child</strong> - Two-way binding between parent and child</li>
        <li>✅ <strong>Props down</strong> - fieldOptions and label passed to child</li>
        <li>✅ <strong>Events up</strong> - Child emits update:modelValue to parent</li>
        <li>✅ <strong>Reactive data</strong> - Child maps fieldOptions to the <code>data</code> prop</li>
        <li>✅ <strong>Computed value</strong> - Child computes value getter/setter for v-model</li>
        <li>✅ <strong>afterChange callback</strong> - Custom logic in child component</li>
        <li>✅ <strong>Fully reactive</strong> - Parent data changes flow to child automatically</li>
      </ul>
    </div>

    <div class="separator"></div>

    <h3>Setting v-model to an invalid value Example</h3>
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
      <p>
        SlimSelect will operate the same as a normal select element when the v-model is empty or a value that does not
        exist in the options.
      </p>
      <div class="column example">
        <div><strong>Value</strong> {{ emptySelected || "'' (empty string)" }}</div>
        <SlimSelect v-model="emptySelected" :data="emptyVmodelOptions" />
      </div>
      <div class="column example">
        <div><strong>Value</strong> {{ emptyArraySelected }}</div>
        <SlimSelect v-model="emptyArraySelected" :data="emptyVmodelOptions" multiple />
      </div>

      <div class="row">
        <div class="btn" @click="emptyArraySelected = ['banana']">Banana</div>
        <div class="btn" @click="emptyArraySelected = ['']">Clear Selection</div>
      </div>
    </div>
  </div>
</template>
