import React from 'react'
import ReactDOM from 'react-dom/client'
import { SlimSelect } from '.'

const TestComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SlimSelect ref={null} multiple={true}>
        <option value={'value1'}>Value 1</option>
        <option value={'value2'}>Value 2</option>
        <option value={'value3'}>Value 3</option>
      </SlimSelect>
      <SlimSelect style={{ marginLeft: '5px' }} ref={null}>
        <option value={'value1'}>Value 1</option>
        <option value={'value2'}>Value 2</option>
        <option value={'value3'}>Value 3</option>
      </SlimSelect>
    </div>
  )
}
const timeout = document.getElementById('app') ? 1000 : 0
;(function () {
  window.setTimeout(() => {
    ReactDOM.createRoot(document.getElementById('react-root') as HTMLElement).render(
      <React.StrictMode>
        <TestComponent />
      </React.StrictMode>,
    )
  }, timeout)
})()
