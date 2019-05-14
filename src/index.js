import React, { useReducer } from 'react'
import { render } from 'react-dom'
import styled from '@emotion/styled'
import colors from 'colors'

import { Main } from './components'

import JokesContext from './helpers/context'
import initialState from './helpers/InitialState'
import reducer from './helpers/reducer'

const StyledContainer = styled.div`
  width: 900px;
  height: 100vh;
  margin: 0 auto;
  background-color: ${colors.background};
`

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <JokesContext.Provider value={{ state, dispatch }}>
      <StyledContainer>
        <Main />
      </StyledContainer>
    </JokesContext.Provider>
  )
}

render(<App />, document.getElementById('root'))
