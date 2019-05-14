import React, { useContext } from 'react'
import { getRandomJokes, getOneRandomJoke } from 'global-api'
import { Button, FlexContainer, FlexItem } from 'ui-components'
import isEmpty from 'lodash/isEmpty'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import colors from 'colors'
import { isFavorite, isFull } from 'helpers'
import { useInterval } from 'hooks'

import JokesContext from '../../helpers/context'
import * as actions from '../../helpers/actions'

const StyledFlexItem = styled(FlexItem)`
  width: 90%;
  margin: 10px auto;
  border: 1px solid ${colors.black};
  padding: 10px;
  background-color: ${({ favorite }) => (favorite ? colors.gold : 'inherit')}};
  :hover {
    cursor: pointer;
    background-color: ${colors.darkGrey};
  }
  :active {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`

const Main = () => {
  const { state, dispatch } = useContext(JokesContext)

  const { jokes, favorites, clicked, error } = state

  const onFetchButtonClickHandler = () => {
    getRandomJokes()
      .then(res => {
        dispatch({ type: actions.SET_JOKES, payload: res.data.value })
      })
      .catch(() => dispatch({ type: actions.SET_ERROR, payload: true }))
  }

  const onJokeClickHandler = joke => {
    if (!isFavorite(favorites, joke)) {
      dispatch({ type: actions.SET_FAVORITES, payload: [...favorites, joke] })
    } else {
      const newArray = favorites.filter(f => f.id !== joke.id)
      dispatch({ type: actions.SET_FAVORITES, payload: newArray })
    }
  }

  useInterval(
    () => {
      if (!isFull(favorites)) {
        getOneRandomJoke()
          .then(res => {
            dispatch({
              type: actions.SET_FAVORITES,
              payload: [...favorites, ...res.data.value]
            })
          })
          .catch(() => dispatch({ type: actions.SET_ERROR, payload: true }))
      }
    },
    1000,
    clicked
  )

  const onRandomButtonClickHandler = () => {
    dispatch({ type: actions.SET_CLICKED, payload: !clicked })
  }

  return (
    <FlexContainer direction="column" alignItems="center">
      <FlexContainer alignItems="center" justifyContent="space-between">
        <FlexItem>
          <Button
            bcg={colors.gold}
            disabled={isFull(favorites)}
            onClick={onRandomButtonClickHandler}
          >
            Help me
          </Button>
        </FlexItem>
        <FlexItem>
          <h1>Chuck Norris Jokes</h1>
        </FlexItem>
        <FlexItem>
          <p
            css={css`
                color: ${colors.gold};
                fon
              `}
          >
            favorites: {favorites.length}
          </p>
        </FlexItem>
      </FlexContainer>
      <Button onClick={onFetchButtonClickHandler}>
        {isEmpty(jokes) ? 'Get Jokes' : 'Try Again'}
      </Button>
      <FlexContainer direction="column">
        {isEmpty(jokes) || error ? (
          <p>
            {!error
              ? 'Please press the button'
              : 'Something went wrong, please try later...'}
          </p>
        ) : (
          jokes.map(joke => (
            <StyledFlexItem
              key={joke.id}
              favorite={isFavorite(favorites, joke)}
              onClick={() => onJokeClickHandler(joke)}
            >
              {joke.joke}
            </StyledFlexItem>
          ))
        )}
      </FlexContainer>
    </FlexContainer>
  )
}

export default Main
