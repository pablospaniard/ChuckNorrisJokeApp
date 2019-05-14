export const isFavorite = (favorites, joke) =>
  favorites.some(f => f.id === joke.id)

export const isFull = favorites => favorites.length >= 10
