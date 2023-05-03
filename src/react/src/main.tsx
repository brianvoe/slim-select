import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { SlimSelect } from './'
import { SlimSelectRef } from './slimselect'

const TestComponent = () => {
  const slimRef = useRef(null)

  const onValueChange = (newVal: any) => {
    console.log('OUTER CHANGE', newVal)
    const value = (slimRef.current as unknown as SlimSelectRef).get()
    console.log('Value using REF-get', value)
  }

  return (
    <SlimSelect
      ref={slimRef}
      events={{
        afterChange: onValueChange,
      }}
      multiple={true}
    >
      <option value={'value1'}>Value1</option>
      <option value={'value2'}>Value2</option>
      <option value={'value3'}>Value3</option>
    </SlimSelect>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>,
)
