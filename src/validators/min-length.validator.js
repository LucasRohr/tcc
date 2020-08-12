const minLengthValidator = ({ value = '', minLength }) => {
  if (value) {
    value = value.trim()

    const resultValidity = value.length >= Number(minLength)

    return !resultValidity ? `O preenchimento mínimo de ${minLength} caracteres é obrigatório.` : null
  }

  return null
}

export { minLengthValidator }
