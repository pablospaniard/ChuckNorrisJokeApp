import axios from 'axios'

export const getRandomJokes = () =>
  axios.get('http://api.icndb.com/jokes/random/10')

export const getOneRandomJoke = () =>
  axios.get('http://api.icndb.com/jokes/random/1')
