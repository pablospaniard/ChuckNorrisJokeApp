import React from 'react'
import { render } from 'react-dom'
import styled from '@emotion/styled'
import colors from 'colors'

import { Main } from './components'

const StyledContainer = styled.div`
  width: 900px;
  height: 100vh;
  margin: 0 auto;
  background-color: ${colors.background};
`

const App = () => {
  return (
    <StyledContainer>
      <Main />
    </StyledContainer>
  )
}

render(<App />, document.getElementById('root'))
