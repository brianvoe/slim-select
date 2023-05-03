import React from 'react'

import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { SlimSelect } from '../src'

describe('Common render', () => {
  console.log(React.version)
  it('renders without crashing', () => {
    render(<SlimSelect />)
  })
})
