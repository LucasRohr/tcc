const MESSAGE = 'Campo obrigatório'

const requiredValidator = ({ value = '' }) => {
  if (typeof value === 'boolean') {
    return !value ? MESSAGE : null
  }

  const stringValue = value.toString().trim()

  if (!stringValue) {
    return MESSAGE
  } else {
    return null
  }
}

export { requiredValidator }
