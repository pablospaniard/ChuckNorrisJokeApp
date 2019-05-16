import * as actions from './actions'

export default (state, action) => {
  switch (action.type) {
    case actions.SET_JOKES:
      return { ...state, jokes: action.payload }
    case actions.SET_FAVORITES:
      return { ...state, favorites: action.payload }
    case actions.SET_SHOW_FAVORITES:
      return { ...state, showFavorites: action.payload }
    case actions.SET_CLICKED:
      return { ...state, clicked: action.payload }
    case actions.SET_ERROR:
      return { ...state, error: action.payload }
    case actions.SET_AUTH:
      return { ...state, auth: action.payload }

    default:
      throw new Error(`There is no action type ${action.type} defined`)
  }
}
