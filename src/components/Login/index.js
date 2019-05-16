import React, { useContext, useState, useEffect } from 'react'
import { FlexContainer, FlexItem, Button, Input } from 'ui-components'
import styled from '@emotion/styled'

import JokesContext from '../../helpers/context'
import * as actions from '../../helpers/actions'

const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Login = () => {
  const { dispatch } = useContext(JokesContext)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem('user'))
    if (savedUser) {
      dispatch({ type: actions.SET_AUTH, payload: true })
    }
  }, [])

  const onLogInButtonClickHandler = () => {
    dispatch({ type: actions.SET_AUTH, payload: true })
    sessionStorage.setItem('user', JSON.stringify({ name, password }))
  }

  return (
    <StyledDiv>
      <FlexContainer>
        <FlexItem>
          <p>Username</p>
          <Input type="text" onChange={({ target }) => setName(target.value)} />
        </FlexItem>
        <FlexItem>
          <p>Password</p>
          <Input
            type="text"
            onChange={({ target }) => setPassword(target.value)}
          />
        </FlexItem>
      </FlexContainer>
      <FlexContainer>
        <FlexItem>
          <Button
            disabled={!name || !password}
            onClick={onLogInButtonClickHandler}
          >
            Log In
          </Button>
        </FlexItem>
      </FlexContainer>
    </StyledDiv>
  )
}

export default Login
