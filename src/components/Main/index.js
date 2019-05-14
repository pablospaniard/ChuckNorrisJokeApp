import React, { useState } from 'react'
import { getRandomJokes } from 'global-api'
import { Button, FlexContainer, FlexItem } from 'ui-components'
import isEmpty from 'lodash/isEmpty'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import colors from 'colors'
import { isFavorite } from 'helpers'

import JokesContext from '../context'

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
  // we can use here useReducer and for scalability it probably a proper solution, but here i'll stay with useState as it should be enough
  const [jokes, setJokes] = useState([])
  const [favorites, setFavorites] = useState([])
  const onFetchButtonClickHandler = () => {
    getRandomJokes()
      .then(res => {
        setJokes(res.data.value)
      })
      .catch(err => console.log(err.response))
  }

  const onJokeClickHandler = joke => {
    if (!isFavorite(favorites, joke)) {
      setFavorites([...favorites, joke])
    } else {
      const newArray = favorites.filter(f => f.id !== joke.id)
      setFavorites(newArray)
    }
  }

  return (
    <JokesContext.Provider value={{ jokes }}>
      <FlexContainer direction="column" alignItems="center">
        <FlexContainer alignItems="center" justifyContent="space-between">
          <FlexItem>
            <Button bcg={colors.gold}>random</Button>
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
        <Button onClick={onFetchButtonClickHandler}>Get Jokes</Button>
        <FlexContainer direction="column">
          {isEmpty(jokes) ? (
            <p>Please press the button</p>
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
    </JokesContext.Provider>
  )
}

export default Main
