const MESSAGE = 'Informe seu nome completo.'

const fullNameValidator = ({ value }) => {
  value = value.trim()
  value = value.split(' ')
  if (value.length > 1 && value[0] && value[1]) {
    return null
  }

  return MESSAGE
}

export { fullNameValidator }
