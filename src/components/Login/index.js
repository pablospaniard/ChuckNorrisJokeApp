import React, { useContext, useState } from 'react'
import { FlexContainer, FlexItem, Button, Input } from 'ui-components'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import colors from 'colors'

import JokesContext from '../../helpers/context'
import * as actions from '../../helpers/actions'
import { errors } from '../../helpers/helpers'

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

  const onLogInButtonClickHandler = () => {
    dispatch({ type: actions.SET_AUTH, payload: true })
    sessionStorage.setItem('user', JSON.stringify({ name, password }))
  }

  const notValid = errors(password).some(error => error.rule)

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
            maxLength="32"
            onChange={({ target }) => setPassword(target.value)}
          />
        </FlexItem>
      </FlexContainer>
      {errors(password).map(error => {
        return (
          <p
            key={error.string}
            css={css`
              color: ${error.rule ? colors.red : colors.green};
            `}
          >
            {error.string}
          </p>
        )
      })}
      <FlexContainer>
        <FlexItem>
          <Button
            disabled={!name || !password || notValid}
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
