<script lang="ts">
import { defineComponent } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ShikiStyle from '@/docs/components/shiki_style.vue'

const h = React.createElement

export default defineComponent({
  name: 'React',
  components: {
    ShikiStyle
  },
  data() {
    return {
      simpleRoot: null as ReactDOM.Root | null,
      propsRoot: null as ReactDOM.Root | null,
      dataRoot: null as ReactDOM.Root | null,
      eventsRoot: null as ReactDOM.Root | null,
      emptyRoot: null as ReactDOM.Root | null,
      afterChangeSingle: [] as any[],
      afterChangeMultiple: [] as any[]
    }
  },
  async mounted() {
    // Dynamically import the React component from dist
    const { default: SlimSelectReact } = await import('../../../../dist/react/index.js' as any)
    const { useState } = React

    // Simple Example
    const simpleHost = this.$refs.simpleHost as HTMLElement
    if (simpleHost) {
      this.simpleRoot = ReactDOM.createRoot(simpleHost)
      const SimpleExample = () => {
        const [singleValue, setSingleValue] = useState('2')
        const [multipleValue, setMultipleValue] = useState(['2', '3'])

        return h(
          'div',
          { className: 'row' },
          h(
            'div',
            null,
            h('div', null, h('strong', null, 'Value: '), singleValue),
            h(
              SlimSelectReact,
              {
                value: singleValue,
                onChange: (val: any) => setSingleValue(val as string)
              },
              h('option', { value: '1' }, 'Option 1'),
              h('option', { value: '2' }, 'Option 2'),
              h('option', { value: '3' }, 'Option 3')
            )
          ),
          h(
            'div',
            null,
            h('div', null, h('strong', null, 'Value: '), JSON.stringify(multipleValue)),
            h(
              SlimSelectReact,
              {
                value: multipleValue,
                onChange: (val: any) => setMultipleValue(val as string[]),
                multiple: true
              },
              h('option', { value: '1' }, 'Option 1'),
              h('option', { value: '2' }, 'Option 2'),
              h('option', { value: '3' }, 'Option 3')
            )
          )
        )
      }
      this.simpleRoot.render(h(SimpleExample))
    }

    // Settings Example
    const propsHost = this.$refs.propsHost as HTMLElement
    if (propsHost) {
      this.propsRoot = ReactDOM.createRoot(propsHost)
      const PropsExample = () => {
        return h(
          'div',
          { className: 'row' },
          h(
            SlimSelectReact,
            {
              settings: { showSearch: false }
            },
            h('option', { value: '1' }, 'Option 1'),
            h('option', { value: '2' }, 'Option 2'),
            h('option', { value: '3' }, 'Option 3')
          ),
          h(
            SlimSelectReact,
            {
              settings: { showSearch: false },
              multiple: true
            },
            h('option', { value: '1' }, 'Option 1'),
            h('option', { value: '2' }, 'Option 2'),
            h('option', { value: '3' }, 'Option 3')
          )
        )
      }
      this.propsRoot.render(h(PropsExample))
    }

    // Data Example
    const dataHost = this.$refs.dataHost as HTMLElement
    if (dataHost) {
      this.dataRoot = ReactDOM.createRoot(dataHost)
      const DataExample = () => {
        const [data, setData] = useState([
          { value: 'value1', text: 'Value 1' },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' }
        ])

        const changeData = () => {
          setData([
            { value: 'value4', text: 'Value 4' },
            { value: 'value5', text: 'Value 5' },
            { value: 'value6', text: 'Value 6' }
          ])
        }

        return h(
          'div',
          null,
          h(
            'div',
            { className: 'row' },
            h('div', { className: 'btn info', onClick: changeData }, 'Change data'),
            h(SlimSelectReact, { data }),
            h(SlimSelectReact, { data, multiple: true })
          )
        )
      }
      this.dataRoot.render(h(DataExample))
    }

    // Events Example
    const eventsHost = this.$refs.eventsHost as HTMLElement
    if (eventsHost) {
      this.eventsRoot = ReactDOM.createRoot(eventsHost)

      const handleAfterChangeSingle = (newVal: any[]) => {
        this.afterChangeSingle = newVal
      }

      const handleAfterChangeMultiple = (newVal: any[]) => {
        this.afterChangeMultiple = newVal
      }

      const EventsExample = () => {
        return h(
          'div',
          { className: 'row' },
          h(
            SlimSelectReact,
            {
              events: { afterChange: handleAfterChangeSingle }
            },
            h('option', { value: '1' }, 'Option 1'),
            h('option', { value: '2' }, 'Option 2'),
            h('option', { value: '3' }, 'Option 3')
          ),
          h(
            SlimSelectReact,
            {
              events: { afterChange: handleAfterChangeMultiple },
              multiple: true
            },
            h('option', { value: '1' }, 'Option 1'),
            h('option', { value: '2' }, 'Option 2'),
            h('option', { value: '3' }, 'Option 3')
          )
        )
      }
      this.eventsRoot.render(h(EventsExample))
    }

    // Empty Selected Example
    const emptyHost = this.$refs.emptyHost as HTMLElement
    if (emptyHost) {
      this.emptyRoot = ReactDOM.createRoot(emptyHost)
      const EmptyExample = () => {
        const [emptySelected, setEmptySelected] = useState('')
        const [emptyArraySelected, setEmptyArraySelected] = useState([] as string[])

        return h(
          'div',
          { className: 'column empty-selected' },
          h('h4', null, 'Empty Selected'),
          h(
            'p',
            null,
            'SlimSelect will operate the same as a normal select element when the value is empty or a value that does not exist in the options.'
          ),
          h(
            'div',
            { className: 'column example' },
            h('div', null, h('strong', null, 'Value: '), emptySelected || "'' (empty string)"),
            h(
              SlimSelectReact,
              {
                value: emptySelected,
                onChange: (val: any) => setEmptySelected(val as string)
              },
              h('option', { value: 'opt1' }, 'Option 1'),
              h('option', { value: 'opt2' }, 'Option 2'),
              h('option', { value: 'opt3' }, 'Option 3')
            )
          ),
          h(
            'div',
            { className: 'row' },
            h('div', { className: 'btn', onClick: () => setEmptySelected('banana') }, 'Banana'),
            h('div', { className: 'btn', onClick: () => setEmptySelected('') }, 'Clear Selection')
          ),
          h(
            'div',
            { className: 'column example' },
            h('div', null, h('strong', null, 'Value: '), JSON.stringify(emptyArraySelected)),
            h(
              SlimSelectReact,
              {
                value: emptyArraySelected,
                onChange: (val: any) => setEmptyArraySelected(val as string[]),
                multiple: true
              },
              h('option', { value: 'opt1' }, 'Option 1'),
              h('option', { value: 'opt2' }, 'Option 2'),
              h('option', { value: 'opt3' }, 'Option 3')
            )
          ),
          h(
            'div',
            { className: 'row' },
            h('div', { className: 'btn', onClick: () => setEmptyArraySelected(['banana']) }, 'Banana'),
            h('div', { className: 'btn', onClick: () => setEmptyArraySelected(['']) }, 'Clear Selection')
          )
        )
      }
      this.emptyRoot.render(h(EmptyExample))
    }
  },
  beforeUnmount() {
    this.simpleRoot?.unmount()
    this.propsRoot?.unmount()
    this.dataRoot?.unmount()
    this.eventsRoot?.unmount()
    this.emptyRoot?.unmount()
  }
})
</script>

<style lang="scss">
#react {
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
  <div id="react" class="content">
    <h2 class="header">React</h2>

    <h3>Install</h3>
    <p>Install the slim-select package:</p>
    <ShikiStyle language="bash">
      <pre>
        npm install slim-select
      </pre>
    </ShikiStyle>

    <p>Import the React component and styles:</p>
    <ShikiStyle language="javascript">
      <pre>
        import SlimSelect from 'slim-select/react'
        import 'slim-select/styles' // CSS
        // or
        import 'slim-select/scss' // SCSS
      </pre>
    </ShikiStyle>
    <br />

    <h3>Simple example</h3>
    <div ref="simpleHost"></div>

    <ShikiStyle language="javascript">
      <pre>
        import { useState } from 'react'
        import SlimSelect from 'slim-select/react'
        import 'slim-select/styles'

        function App() {
          const [singleValue, setSingleValue] = useState('2')
          const [multipleValue, setMultipleValue] = useState(['2', '3'])

          return (
            &lt;div&gt;
              &lt;div&gt;
                &lt;div&gt;Value: &#123;singleValue&#125;&lt;/div&gt;
                &lt;SlimSelect value=&#123;singleValue&#125; onChange=&#123;setSingleValue&#125;&gt;
                  &lt;option value="1"&gt;Option 1&lt;/option&gt;
                  &lt;option value="2"&gt;Option 2&lt;/option&gt;
                  &lt;option value="3"&gt;Option 3&lt;/option&gt;
                &lt;/SlimSelect&gt;
              &lt;/div&gt;

              &lt;div&gt;
                &lt;div&gt;Value: &#123;JSON.stringify(multipleValue)&#125;&lt;/div&gt;
                &lt;SlimSelect 
                  value=&#123;multipleValue&#125; 
                  onChange=&#123;setMultipleValue&#125;
                  multiple&gt;
                  &lt;option value="1"&gt;Option 1&lt;/option&gt;
                  &lt;option value="2"&gt;Option 2&lt;/option&gt;
                  &lt;option value="3"&gt;Option 3&lt;/option&gt;
                &lt;/SlimSelect&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          )
        }
      </pre>
    </ShikiStyle>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Settings</h3>
    <p>Settings are passed as an object through the <code>settings</code> prop, just like in vanilla SlimSelect.</p>

    <div ref="propsHost"></div>

    <ShikiStyle language="javascript">
      <pre>
        import SlimSelect from 'slim-select/react'

        function App() {
          return (
            &lt;div&gt;
              &lt;SlimSelect settings=&#123;&#123; showSearch: false &#125;&#125;&gt;
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;

              &lt;SlimSelect settings=&#123;&#123; showSearch: false &#125;&#125; multiple&gt;
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;
            &lt;/div&gt;
          )
        }
      </pre>
    </ShikiStyle>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Data</h3>
    <p>
      Data can be passed as an array through the <code>data</code> prop. The component will update when the data
      changes.
    </p>

    <div ref="dataHost"></div>

    <ShikiStyle language="javascript">
      <pre>
        import { useState } from 'react'
        import SlimSelect from 'slim-select/react'

        function App() {
          const [data, setData] = useState([
            { value: 'value1', text: 'Value 1' },
            { value: 'value2', text: 'Value 2' },
            { value: 'value3', text: 'Value 3' }
          ])

          const changeData = () => {
            setData([
              { value: 'value4', text: 'Value 4' },
              { value: 'value5', text: 'Value 5' },
              { value: 'value6', text: 'Value 6' }
            ])
          }

          return (
            &lt;div&gt;
              &lt;button onClick=&#123;changeData&#125;&gt;Change data&lt;/button&gt;
              &lt;SlimSelect data=&#123;data&#125; /&gt;
              &lt;SlimSelect data=&#123;data&#125; multiple /&gt;
            &lt;/div&gt;
          )
        }
      </pre>
    </ShikiStyle>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Events</h3>
    <p>Events are passed as an object through the <code>events</code> prop.</p>

    <div v-if="afterChangeSingle.length > 0"><strong>Single afterChange:</strong> {{ afterChangeSingle }}</div>
    <div v-if="afterChangeMultiple.length > 0"><strong>Multiple afterChange:</strong> {{ afterChangeMultiple }}</div>

    <div ref="eventsHost"></div>

    <ShikiStyle language="javascript">
      <pre>
        import { useState } from 'react'
        import SlimSelect from 'slim-select/react'

        function App() {
          const [afterChangeData, setAfterChangeData] = useState([])

          const handleAfterChange = (newVal) => {
            setAfterChangeData(newVal)
            console.log('afterChange:', newVal)
          }

          return (
            &lt;div&gt;
              &#123;afterChangeData.length > 0 &amp;&amp; (
                &lt;div&gt;afterChange: &#123;JSON.stringify(afterChangeData)&#125;&lt;/div&gt;
              )&#125;
              
              &lt;SlimSelect events=&#123;&#123; afterChange: handleAfterChange &#125;&#125;&gt;
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;

              &lt;SlimSelect 
                events=&#123;&#123; afterChange: handleAfterChange &#125;&#125;
                multiple&gt;
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;
            &lt;/div&gt;
          )
        }
      </pre>
    </ShikiStyle>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Additional Props</h3>
    <p>The React component supports these additional props:</p>
    <ul>
      <li><code>value</code> - Controls the selected value(s). String for single select, array for multiple.</li>
      <li><code>onChange</code> - Callback fired when selection changes, receives the new value(s).</li>
      <li><code>data</code> - Array of option data objects.</li>
      <li><code>settings</code> - SlimSelect settings object.</li>
      <li><code>events</code> - SlimSelect events object.</li>
      <li><code>multiple</code> - Boolean to enable multiple selection.</li>
      <li><code>disabled</code> - Boolean to disable the select.</li>
      <li><code>className</code> - Additional CSS classes.</li>
    </ul>

    <div class="alert info">
      <strong>Note:</strong> The React component automatically handles cleanup when unmounted, so you don't need to
      manually destroy the SlimSelect instance.
    </div>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Setting v-model to an invalid value Example</h3>
    <p>
      SlimSelect will operate the same as a normal select element when the value is empty or a value that does not exist
      in the options.
    </p>

    <div ref="emptyHost"></div>
  </div>
</template>
