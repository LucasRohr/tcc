const formatters = [
  {
    rule: value => value.length > 7,
    action: value => `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`
  },
  {
    rule: value => value.length > 2 && value.length < 5,
    action: value => `${value.slice(0, 2)}/${value.slice(2, value.length)}`
  },
  {
    rule: value => value.length > 4 && value.length < 8,
    action: value => `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, value.length)}`
  }
]

const fullDateFormatter = value => {
  value = value.replace(/\D/g, '')

  /* eslint-disable no-unused-vars */
  for (const formatter of formatters) {
    const { rule, action } = formatter
    if (rule(value)) return action(value)
  }
  /* eslint-enable no-unused-vars */
  return value
}

export { fullDateFormatter }
