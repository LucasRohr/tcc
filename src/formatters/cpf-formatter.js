const formatters = [
  {
    rule: value => value.length > 9,
    action: value => `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`
  },
  {
    rule: value => value.length > 6 && value.length < 10,
    action: value => `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`
  },
  {
    rule: value => value.length > 3 && value.length < 7,
    action: value => `${value.slice(0, 3)}.${value.slice(3)}`
  },
  {
    rule: value => value.length > 1 && value.length < 4,
    action: value => value
  }
]

const CPFFormatter = value => {
  value = value.replace(/\D/g, '')

  /* eslint-disable no-unused-vars */
  for (const formatter of formatters) {
    const { rule, action } = formatter
    if (rule(value)) {
      return action(value)
    }
  }
  /* eslint-enable no-unused-vars */

  return value
}
export { CPFFormatter }
