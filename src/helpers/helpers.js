export const isFavorite = (favorites, joke) =>
  favorites.some(f => f.id === joke.id)
