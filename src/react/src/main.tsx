import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { SlimSelect } from './'

const TestComponent = () => {
  const slimRef = useRef(null)

  const myCustomAfterChange = (newValue: any) => {
    console.log('Slim Select myCustomAfterChange - ', JSON.stringify(newValue))
  }

  return (
    <div>
      <SlimSelect
        ref={slimRef}
        events={{
          afterChange: myCustomAfterChange,
        }}
        multiple={true}
      >
        <option value={'value1'}>Value 1</option>
        <option value={'value2'}>Value 2</option>
        <option value={'value3'}>Value 3</option>
      </SlimSelect>
      <SlimSelect
        ref={null}
        events={{
          afterChange: myCustomAfterChange,
        }}
      >
        <option value={'value1'}>Value 1</option>
        <option value={'value2'}>Value 2</option>
      </SlimSelect>
    </div>
  )
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>,
)
