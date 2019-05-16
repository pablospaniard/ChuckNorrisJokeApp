import React, { useContext, useEffect } from 'react'
import { FlexContainer, FlexItem } from 'ui-components'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import isEmpty from 'lodash/isEmpty'
import { isFavorite, isFull } from 'helpers'
import colors from 'colors'

import JokeContext from '../../helpers/context'
import * as actions from '../../helpers/actions'

const StyledItem = styled(FlexItem)`
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
  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${colors.darkGrey};
    cursor: not-allowed;
    pointer-events: none;`}
`

const Items = () => {
  const {
    state: { favorites, jokes, error, showFavorites },
    dispatch
  } = useContext(JokeContext)

  const onItemClickHandler = joke => {
    if (!isFavorite(favorites, joke)) {
      dispatch({ type: actions.SET_FAVORITES, payload: [...favorites, joke] })
    } else {
      const newArray = favorites.filter(f => f.id !== joke.id)
      dispatch({ type: actions.SET_FAVORITES, payload: newArray })
    }
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const items = showFavorites ? favorites : jokes

  return (
    <FlexContainer
      direction="column"
      css={css`
        margin: 0;
      `}
    >
      {isEmpty(items) || error ? (
        <p>
          {!error
            ? 'List is empty'
            : 'Something went wrong, please try later...'}
        </p>
      ) : (
        items.map(item => (
          <StyledItem
            favorite={isFavorite(favorites, item)}
            disabled={isFull(favorites) && !showFavorites}
            key={item.id}
            onClick={() => onItemClickHandler(item)}
          >
            {item.joke}
          </StyledItem>
        ))
      )}
    </FlexContainer>
  )
}

export default Items
