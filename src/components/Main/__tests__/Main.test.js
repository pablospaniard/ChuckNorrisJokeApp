import React from 'react'
import { render } from 'react-testing-library'

import Main from '../index'

describe('Main component should works properly', () => {
  it('should match Snapshot', () => {
    const { container } = render(<Main />)
    expect(container.firstChild).toMatchSnapshot('Main_1')
  })
})
