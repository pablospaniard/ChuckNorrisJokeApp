import React, { useReducer, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import styled from '@emotion/styled'
import colors from 'colors'
import { Button } from 'ui-components'

import { Main, Login } from './components'

import JokesContext from './helpers/context'
import initialState from './helpers/InitialState'
import reducer from './helpers/reducer'
import * as actions from './helpers/actions'

const StyledContainer = styled.div`
  width: 900px;
  margin: 0 auto;
  background-color: ${colors.background};
`

const StyledButton = styled(Button)`
  float: right;
  color: ${colors.black};
  :hover {
    cursor pointer
  }
`

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { auth } = state

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem('user'))
    if (savedUser) {
      dispatch({ type: actions.SET_AUTH, payload: true })
    } else {
      dispatch({ type: actions.SET_AUTH, payload: false })
    }
  }, [])

  const onLogOutButtonClickHandler = () => {
    dispatch({ type: actions.SET_AUTH, payload: false })
    sessionStorage.removeItem('user')
  }

  return (
    <JokesContext.Provider value={{ state, dispatch }}>
      <StyledButton bcg={colors.grey} onClick={onLogOutButtonClickHandler}>
        Log out
      </StyledButton>
      {auth !== null ? (
        <StyledContainer>{auth ? <Main /> : <Login />}</StyledContainer>
      ) : (
        <p>Loading...</p>
      )}
    </JokesContext.Provider>
  )
}

export default hot(module)(App)
