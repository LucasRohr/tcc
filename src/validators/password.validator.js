const VALIDATIONS = {
  hasLowercaseLetter: value => /.*[a-z].*/.test(value),
  hasCapitalLetter: value => /.*[A-Z].*/.test(value),
  hasOneNumber: value => /.*[0-9].*/.test(value),
  between6And100Characters: value => /^[\w\W]{6,100}$/.test(value),
}
const MESSAGE = 'Senha inválida.'

const passwordValidations = {
  hasLowercaseLetter: VALIDATIONS.hasLowercaseLetter,
  hasCapitalLetter: VALIDATIONS.hasCapitalLetter,
  hasOneNumber: VALIDATIONS.hasOneNumber,
  between6And100Characters: VALIDATIONS.between6And100Characters,
  isValid: value => {
    return (
      VALIDATIONS.hasLowercaseLetter(value) &&
      VALIDATIONS.hasCapitalLetter(value) &&
      VALIDATIONS.hasOneNumber(value) &&
      VALIDATIONS.between6And100Characters(value)
    )
  },
}

const { isValid } = passwordValidations

function passwordValidator({ value }) {
  return !isValid(value) ? MESSAGE : null
}

export { passwordValidations, passwordValidator }
