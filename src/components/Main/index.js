import React, { useContext } from 'react'
import { getRandomJokes, getOneRandomJoke } from 'global-api'
import { Button, FlexContainer, FlexItem } from 'ui-components'
import isEmpty from 'lodash/isEmpty'

import { css } from '@emotion/core'
import colors from 'colors'
import { isFull } from 'helpers'
import { useInterval } from 'hooks'

import JokesContext from '../../helpers/context'
import * as actions from '../../helpers/actions'
import Items from '../Items'

const Main = () => {
  const { state, dispatch } = useContext(JokesContext)
  const { jokes, favorites, clicked, showFavorites } = state

  const onFetchButtonClickHandler = () => {
    getRandomJokes()
      .then(res => {
        dispatch({ type: actions.SET_JOKES, payload: res.data.value })
      })
      .catch(() => dispatch({ type: actions.SET_ERROR, payload: true }))
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
      } else {
        dispatch({ type: actions.SET_CLICKED, payload: false })
      }
    },
    5000,
    clicked
  )

  const onRandomButtonClickHandler = () => {
    dispatch({ type: actions.SET_CLICKED, payload: !clicked })
  }

  const onSavedButtonClickHandler = () => {
    dispatch({ type: actions.SET_SHOW_FAVORITES, payload: !showFavorites })
  }

  return (
    <FlexContainer direction="column" alignItems="center">
      <FlexContainer
        alignItems="center"
        justifyContent="space-between"
        css={css`
          width: 100%;
          text-align: center;
        `}
      >
        <FlexItem flex="1">
          <Button
            bcg={colors.gold}
            disabled={isFull(favorites)}
            onClick={onRandomButtonClickHandler}
          >
            Help me
          </Button>
        </FlexItem>
        <FlexItem flex="2">
          <h1>Chuck Norris Jokes</h1>
        </FlexItem>
        <FlexItem flex="1">
          <p
            css={css`
              color: ${colors.gold};
              text-align: center;
            `}
          >{`Saved: ${favorites.length} ${
            favorites.length === 1 ? 'joke' : 'jokes'
          }`}</p>
          <Button bcg={colors.lightBlue} onClick={onSavedButtonClickHandler}>
            {!showFavorites ? 'show favorites' : 'show all'}
          </Button>
        </FlexItem>
      </FlexContainer>
      <Button onClick={onFetchButtonClickHandler} disabled={showFavorites}>
        {isEmpty(jokes) ? 'Get Jokes' : 'Try Again'}
      </Button>
      {isFull(favorites) ? (
        <p>You reached limit of size for favorite&#39;s list </p>
      ) : null}
      <Items />
    </FlexContainer>
  )
}

export default Main
