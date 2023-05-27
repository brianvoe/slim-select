import React from 'react'
import ReactDOM from 'react-dom/client'
import { SlimSelect } from '.'
import { useState } from 'react'

const ShowComponent = () => {
  const [simpleSingle, setSimpleSingle] = useState('2')
  const [simpleMultiple, setSimpleMultiple] = useState(['2', '3'])

  return (
    <div id="react" className="content">
      <h2 className="header">React</h2>
      <h3>Install</h3>
      <p>
        The react component is in a sub package under SlimSelect. All functionality still work in the implementation.
      </p>
      <div className="code-toolbar">
        <pre className="language-bash">
          <code>npm install @slim-select/react</code>
        </pre>
      </div>
      <br />
      <h3>Simple example</h3>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ flex: 0.5 }}>
          <strong>Value</strong> {simpleSingle}
          <SlimSelect
            modelValue={simpleSingle}
            events={{ afterChange: (values) => setSimpleSingle(values[0].value as unknown as string) }}
            style={{ marginLeft: '5px' }}
            ref={null}
          >
            <option value="all">All</option>
            <option value={'1'}>Option 1</option>
            <option value={'2'}>Option 2</option>
            <option value={'3'}>Option 3</option>
          </SlimSelect>
        </div>
        <div style={{ flex: 0.6, marginLeft: 15 }}>
          <div>
            <strong>Value</strong> {JSON.stringify(simpleMultiple)}
          </div>
          <SlimSelect
            modelValue={simpleMultiple}
            ref={null}
            multiple={true}
            events={{ afterChange: (values) => setSimpleMultiple(values.map((v) => v.value) as unknown as string[]) }}
          >
            <option value={'1'}>Option 1</option>
            <option value={'2'}>Option 2</option>
            <option value={'3'}>Value 3</option>
          </SlimSelect>
        </div>
      </div>
      <div className="code-toolbar">
        <pre className="language-javascript">
          <code className="language-javascript">
            import React from &quot;react&quot; <br />
            import SlimSelect from &quot;@slim-select/react&quot; <br />
            import {`{`} useState {`}`} from &quot;react&quot;
            <br />
            <br />
            export default MySelect = () {`=>`} {`{`}
            <br />
            const [simpleSingle, setSimpleSingle] = useState(&quot;2&quot;) <br />
            return ( <br />
            &lt;SlimSelect <br />
            modelValue= {`{`}simpleSingle{`}`}
            <br />
            events={`{{ afterChange: (values) => setSimpleSingle(values[0].value as unknown as string) }}`}
            &gt; <br />
            &lt;option value=&quot;all&quot;&gt;All&lt;/option&gt; <br />
            &lt;option value=&quot;1&quot;&gt;Option 1&lt;/option&gt; <br />
            &lt;option value=&quot;2&quot;&gt;Option 2&lt;/option&gt; <br />
            &lt;option value=&quot;3&quot;&gt;Option 3&lt;/option&gt; <br />
            &lt;/SlimSelect&gt; <br /> ){`}`}
          </code>
        </pre>
      </div>

      <br />
      <div className="separator"></div>
      <br />

      <h3>Attributes</h3>
      <p>There are certain attributes that are reactive to changes</p>

      <h4>disabled</h4>
      <SlimSelect settings={{ disabled: true }}>
        <option value={'1'}>Option 1</option>
        <option value={'2'}>Option 2</option>
        <option value={'3'}>Value 3</option>
      </SlimSelect>
      <div className="code-toolbar">
        <pre className="language-javascript">
          <code className="language-javascript">
            import React from &quot;react&quot; <br />
            import SlimSelect from &quot;@slim-select/react&quot; <br />
            import {`{`} useState {`}`} from &quot;react&quot;
            <br />
            <br />
            export default MySelect = () {`=>`} {`{`}
            <br />
            const [simpleSingle, setSimpleSingle] = useState(&quot;2&quot;) <br />
            return ( <br />
            &lt;SlimSelect <br />
            settings={`{`}
            {`{`}disabled: true {`}`}
            {`}`}&gt;
            <br />
            &lt;option value=&quot;all&quot;&gt;All&lt;/option&gt; <br />
            &lt;option value=&quot;1&quot;&gt;Option 1&lt;/option&gt; <br />
            &lt;option value=&quot;2&quot;&gt;Option 2&lt;/option&gt; <br />
            &lt;option value=&quot;3&quot;&gt;Option 3&lt;/option&gt; <br />
            &lt;/SlimSelect&gt; <br /> ){`}`}
          </code>
        </pre>
      </div>
    </div>
  )
}
const timeout = document.getElementById('app') ? 100 : 0
;(function () {
  const interval = window.setInterval(() => {
    if (document.getElementById('react-root') != null && document.getElementById('react-hide') != null) {
      ReactDOM.createRoot(document.getElementById('react-root') as HTMLElement).render(
        <React.StrictMode>
          <ShowComponent />
        </React.StrictMode>,
      )
    }
  }, timeout)
})()
