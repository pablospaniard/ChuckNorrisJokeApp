export default {
  jokes: [],
  favorites: JSON.parse(window.localStorage.getItem('favorites')) || [],
  clicked: false,
  error: false,
  showFavorites: false,
  auth: false
}
