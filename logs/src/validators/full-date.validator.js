const MESSAGE = 'Data inválida'

export function fullDateValidator({ value, required }) {
  if (value.length === 0 && !required) {
    return null
  }

  if (value.length !== 10) {
    return MESSAGE
  }

  const day = value.slice(0, 2)
  const month = value.slice(3, 5)

  if (day > 31 || day < 1) {
    return MESSAGE
  }

  if (month > 12 || month < 1) {
    return MESSAGE
  }

  return null
}
