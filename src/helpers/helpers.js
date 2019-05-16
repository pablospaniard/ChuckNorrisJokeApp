import { threeInARow, exclude, twoIdentical, lowerCase } from './regex'

export const isFavorite = (favorites, joke) =>
  favorites.some(f => f.id === joke.id)

export const isFull = favorites => favorites.length >= 10

export const errors = str => {
  const lowerCaseRule = {
    string: 'passwords can only contain lower case alphabetic characters',
    rule: !lowerCase.test(str)
  }
  const threeInARowRule = {
    string:
      'password must include one increasing straight of at least three letters (abc)',
    rule: !threeInARow.test(str)
  }
  const excludeRule = {
    string: 'password may not contain the letters i, O, or l',
    rule: exclude.test(str)
  }
  const twoIdenticalRule = {
    string:
      'password must contain at least two non-overlapping pairs of letters',
    rule: !twoIdentical.test(str)
  }

  return [lowerCaseRule, threeInARowRule, excludeRule, twoIdenticalRule]
}
