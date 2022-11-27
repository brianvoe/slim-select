<script lang="ts">
import { defineComponent } from 'vue'

// We need to import from the root of the package
// Because if we use @slim-select/vue then we loose
// hot reloading of the file changes
import SlimSelectJS from '../../../slim-select'
import SlimSelect from '../../../vue/slimselect.vue'
import Settings from '../../../slim-select/settings'
import { Option, OptionOptional } from '../../../slim-select/store'
import { Events } from '../../../slim-select'

interface Person {
  id: string
  first_name: string
  last_name: string
  selected: number
}

export default defineComponent({
  name: 'Vue',
  components: {
    SlimSelect,
  },
  data() {
    return {
      // v-model data for some selects
      simpleSingle: '',
      simpleMultiple: [] as string[],
      dynamicSingle: '',
      dynamicMultiple: [] as string[],

      // Misc
      settings: {
        showSearch: false,
      } as Settings,
      data: [
        { value: 'value1', text: 'Value 1' },
        { value: 'value2', text: 'Value 2' },
        { value: 'value3', text: 'Value 3' },
      ],
      dynamicData: [] as OptionOptional[],
      afterChangeData: [] as OptionOptional[],
      events: {
        afterChange: this.afterChange,
      } as Events,
    }
  },
  mounted() {
    // Show the original select for debugging
    // const compSingle = this.$refs.simpleSingle as any
    // const slimSingle = compSingle.getSlimSelect()
    // slimSingle.select.showUI()
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
    randomDynamicData() {
      // Go fetch some gofakeit data via post to json
      fetch('https://api.gofakeit.com/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'array',
          rowcount: 20,
          indent: false,
          fields: [
            {
              name: 'key',
              function: 'password',
              params: {
                lower: true,
                upper: true,
                numeric: true,
                special: false,
                space: false,
                length: 10,
              },
            },
            { name: 'first_name', function: 'firstname', params: {} },
            { name: 'last_name', function: 'lastname', params: {} },
            { name: 'selected', function: 'number', params: { min: 1, max: 10 } },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data: Person[]) => {
          // Map the data to the format slim select expects
          this.dynamicData = data.map((person: Person) => {
            return {
              id: person.id,
              text: `${person.first_name} ${person.last_name}`,
              value: `${person.first_name} ${person.last_name}`,
              selected: person.selected >= 8,
            } as OptionOptional
          })
        })
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
        <div><strong>Value</strong> {{ simpleSingle }}</div>
        <SlimSelect v-model="simpleSingle" ref="simpleSingle">
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
              single: '',
              multiple: []
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

    <h3>Reactivity</h3>
    <p>
      Slim select will look out for any options changes that happen to the select options and SlimSelect will update
      accordingly. This is done via mutation observers.
    </p>

    <div class="row">
      <div class="btn info" @click="randomDynamicData">Change data</div>
      <div>
        <div><strong>Value:</strong> {{ dynamicSingle }}</div>
        <SlimSelect v-model="dynamicSingle">
          <option v-for="d in dynamicData" :key="d.id" :value="d.value" :selected="d.selected">{{ d.text }}</option>
        </SlimSelect>
      </div>

      <div>
        <div><strong>Value:</strong> {{ dynamicMultiple }}</div>
        <SlimSelect v-model="dynamicMultiple" multiple>
          <option v-for="d in dynamicData" :value="d.value" :selected="d.selected">{{ d.text }}</option>
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
              singleValue: '',
              mutipleValue: [],
              dynamicData: []
            }
          },
          methods: {
            changeData() {
              this.dynamicData = [
                { id: 1, value: 1, text: 'Option 1', selected: true },
                { id: 2, value: 2, text: 'Option 2', selected: false },
                { id: 3, value: 3, text: 'Option 3', selected: false },
              ]
            },
          },
        })
      </code>
    </pre>

    <pre>
      <code class="language-html">
        &lt;SlimSelect v-model="singleValue"&gt;
          &lt;option v-for="d in dynamicData" :key="d.id" :value="d.value" :selected="d.selected"&gt;&#123;&#123; d.text &#125;&#125;&lt;/option&gt;
        &lt;/SlimSelect&gt;

        &lt;SlimSelect v-model="mutipleValue" multiple&gt;
          &lt;option v-for="d in dynamicData" :value="d.value" :selected="d.selected"&gt;&#123;&#123; d.text &#125;&#125;&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>
  </div>
</template>
