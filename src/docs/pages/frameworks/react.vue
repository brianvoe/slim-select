<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'

const h = React.createElement

export default defineComponent({
  name: 'React',
  setup() {
    const simpleHost = ref<HTMLElement | null>(null)
    const propsHost = ref<HTMLElement | null>(null)
    const dataHost = ref<HTMLElement | null>(null)
    const eventsHost = ref<HTMLElement | null>(null)

    let simpleRoot: ReactDOM.Root | null = null
    let propsRoot: ReactDOM.Root | null = null
    let dataRoot: ReactDOM.Root | null = null
    let eventsRoot: ReactDOM.Root | null = null

    onMounted(async () => {
      // Dynamically import the React component from dist
      const { default: SlimSelectReact } = await import('../../../../dist/react/index.js' as any)
      const { useState } = React

      // Simple Example
      if (simpleHost.value) {
        simpleRoot = ReactDOM.createRoot(simpleHost.value)
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
        simpleRoot.render(h(SimpleExample))
      }

      // Settings Example
      if (propsHost.value) {
        propsRoot = ReactDOM.createRoot(propsHost.value)
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
        propsRoot.render(h(PropsExample))
      }

      // Data Example
      if (dataHost.value) {
        dataRoot = ReactDOM.createRoot(dataHost.value)
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
        dataRoot.render(h(DataExample))
      }

      // Events Example
      if (eventsHost.value) {
        eventsRoot = ReactDOM.createRoot(eventsHost.value)
        const EventsExample = () => {
          const [afterChangeData, setAfterChangeData] = useState<any[]>([])

          const handleAfterChange = (newVal: any[]) => {
            setAfterChangeData(newVal)
          }

          return h(
            'div',
            null,
            afterChangeData.length > 0 &&
              h('div', null, h('strong', null, 'afterChange: '), JSON.stringify(afterChangeData)),
            h(
              'div',
              { className: 'row' },
              h(
                SlimSelectReact,
                {
                  events: { afterChange: handleAfterChange }
                },
                h('option', { value: '1' }, 'Option 1'),
                h('option', { value: '2' }, 'Option 2'),
                h('option', { value: '3' }, 'Option 3')
              ),
              h(
                SlimSelectReact,
                {
                  events: { afterChange: handleAfterChange },
                  multiple: true
                },
                h('option', { value: '1' }, 'Option 1'),
                h('option', { value: '2' }, 'Option 2'),
                h('option', { value: '3' }, 'Option 3')
              )
            )
          )
        }
        eventsRoot.render(h(EventsExample))
      }
    })

    onBeforeUnmount(() => {
      simpleRoot?.unmount()
      propsRoot?.unmount()
      dataRoot?.unmount()
      eventsRoot?.unmount()
    })

    return {
      simpleHost,
      propsHost,
      dataHost,
      eventsHost
    }
  }
})
</script>

<template>
  <div id="react" class="content">
    <h2 class="header">React</h2>

    <h3>Install</h3>
    <p>Install the slim-select package:</p>
    <pre>
      <code class="language-bash">
        npm install slim-select
      </code>
    </pre>

    <p>Import the React component and styles:</p>
    <pre>
      <code class="language-javascript">
        import SlimSelect from 'slim-select/react'
        import 'slim-select/styles' // CSS
        // or
        import 'slim-select/scss' // SCSS
      </code>
    </pre>
    <br />

    <h3>Simple example</h3>
    <div ref="simpleHost"></div>

    <pre>
      <code class="language-javascript">
        import { useState } from 'react'
        import SlimSelect from 'slim-select/react'
        import 'slim-select/styles'

        function App() {
          const [singleValue, setSingleValue] = useState('2')
          const [multipleValue, setMultipleValue] = useState(['2', '3'])

          return (
            &lt;div&gt;
              &lt;div&gt;
                &lt;div&gt;Value: {'{'}singleValue{'}'}&lt;/div&gt;
                &lt;SlimSelect value={'{'}singleValue{'}'} onChange={'{'}setSingleValue{'}'}&gt;
                  &lt;option value="1"&gt;Option 1&lt;/option&gt;
                  &lt;option value="2"&gt;Option 2&lt;/option&gt;
                  &lt;option value="3"&gt;Option 3&lt;/option&gt;
                &lt;/SlimSelect&gt;
              &lt;/div&gt;

              &lt;div&gt;
                &lt;div&gt;Value: {'{'}JSON.stringify(multipleValue){'}'}&lt;/div&gt;
                &lt;SlimSelect 
                  value={'{'}multipleValue{'}'} 
                  onChange={'{'}setMultipleValue{'}'}
                  multiple&gt;
                  &lt;option value="1"&gt;Option 1&lt;/option&gt;
                  &lt;option value="2"&gt;Option 2&lt;/option&gt;
                  &lt;option value="3"&gt;Option 3&lt;/option&gt;
                &lt;/SlimSelect&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          )
        }
      </code>
    </pre>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Settings</h3>
    <p>Settings are passed as an object through the <code>settings</code> prop, just like in vanilla SlimSelect.</p>

    <div ref="propsHost"></div>

    <pre>
      <code class="language-javascript">
        import SlimSelect from 'slim-select/react'

        function App() {
          return (
            &lt;div&gt;
              &lt;SlimSelect settings={'{'}{ showSearch: false }{'}'}&gt;
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;

              &lt;SlimSelect settings={'{'}{ showSearch: false }{'}'} multiple&gt;
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;
            &lt;/div&gt;
          )
        }
      </code>
    </pre>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Data</h3>
    <p>
      Data can be passed as an array through the <code>data</code> prop. The component will update when the data
      changes.
    </p>

    <div ref="dataHost"></div>

    <pre>
      <code class="language-javascript">
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
              &lt;button onClick={'{'}changeData{'}'}&gt;Change data&lt;/button&gt;
              &lt;SlimSelect data={'{'}data{'}'} /&gt;
              &lt;SlimSelect data={'{'}data{'}'} multiple /&gt;
            &lt;/div&gt;
          )
        }
      </code>
    </pre>

    <br />
    <div class="separator"></div>
    <br />

    <h3>Events</h3>
    <p>Events are passed as an object through the <code>events</code> prop.</p>

    <div ref="eventsHost"></div>

    <pre>
      <code class="language-javascript">
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
              {'{'}afterChangeData.length > 0 &amp;&amp; (
                &lt;div&gt;afterChange: {'{'}JSON.stringify(afterChangeData){'}'}&lt;/div&gt;
              ){'}'}
              
              &lt;SlimSelect events={'{'}{ afterChange: handleAfterChange }{'}'}{'>'}
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;

              &lt;SlimSelect 
                events={'{'}{ afterChange: handleAfterChange }{'}'}
                multiple{'>'}
                &lt;option value="1"&gt;Option 1&lt;/option&gt;
                &lt;option value="2"&gt;Option 2&lt;/option&gt;
                &lt;option value="3"&gt;Option 3&lt;/option&gt;
              &lt;/SlimSelect&gt;
            &lt;/div&gt;
          )
        }
      </code>
    </pre>

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
  </div>
</template>
