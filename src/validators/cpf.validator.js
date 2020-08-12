import { ArrayUtils } from 'app-helpers'

/**
 * @description Invalid groups
 * @example 00000000000, 11111111111, 22222222222, etc.
 */
const INVALID_GROUPS = ArrayUtils.range(0, 10).map(digit => Array(11).fill(digit).join(''))

const MESSAGE = 'CPF inválido.'
export function CPFValidator({ value }) {
  let sum = 0
  let rest = null

  value = value.replace(/\D+/g, '')

  if (value.length === 11) {
    if (INVALID_GROUPS.some(rule => rule === value)) {
      return MESSAGE
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i)
    }

    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }

    if (rest !== parseInt(value.substring(9, 10))) {
      return MESSAGE
    }

    sum = 0

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i)
    }

    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }

    if (rest !== parseInt(value.substring(10, 11))) {
      return MESSAGE
    }

    return null
  }

  return MESSAGE
}
