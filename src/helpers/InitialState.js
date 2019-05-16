export default {
  jokes: [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  clicked: false,
  error: false,
  showFavorites: false,
  auth: null
}
