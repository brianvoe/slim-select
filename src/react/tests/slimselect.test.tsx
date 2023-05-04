import React from 'react'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import 'jest-canvas-mock'

import SlimSelectComponent from '../src/slimselect'

describe('Slim Select', () => {
  console.log(React.version)
  it('renders successfully', () => {
    const { queryByTestId, queryAllByText, getByText } = render(
      <SlimSelectComponent id="slimselect" ref={null} multiple={true}>
        <option value={'value1'}>Value 1</option>
        <option value={'value2'}>Value 2</option>
        <option value={'value3'}>Value 3</option>
      </SlimSelectComponent>,
    )
    expect(queryByTestId('slimselect')).not.toEqual(null)
    expect(queryByTestId('slimselect')).not.toBeVisible()
    expect(getByText('Select Value')).not.toEqual(null)
    expect(queryAllByText('Value 1')[1].getAttribute('aria-selected')).toEqual('false')
    expect(queryAllByText('Value 2')[1].getAttribute('aria-selected')).toEqual('false')
    expect(queryAllByText('Value 3')[1].getAttribute('aria-selected')).toEqual('false')
  })
  it('can be selected with onchange callback', async () => {
    const { queryAllByText } = render(
      <SlimSelectComponent id="slimselect" ref={null} multiple={true}>
        <option value={'value1'}>Value 1</option>
        <option value={'value2'}>Value 2</option>
        <option value={'value3'}>Value 3</option>
      </SlimSelectComponent>,
    )

    // First original html select element gets hidden, after comes slimselect div - that is why array index = 1
    const firstSlimOption = queryAllByText('Value 1')[1]
    const thirdSlimOpption = queryAllByText('Value 3')[1]

    expect(firstSlimOption).not.toBeUndefined()
    expect(thirdSlimOpption).not.toBeUndefined()

    await userEvent.click(firstSlimOption as HTMLElement)
    await userEvent.click(thirdSlimOpption as HTMLElement)

    expect(queryAllByText('Select Value')).toHaveLength(0)
    expect(queryAllByText('Value 1')[1].getAttribute('aria-selected')).toEqual('true')
    expect(queryAllByText('Value 2')[1].getAttribute('aria-selected')).toEqual('false')
    expect(queryAllByText('Value 3')[1].getAttribute('aria-selected')).toEqual('true')
  })
})
