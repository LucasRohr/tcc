// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const MESSAGE = 'Email inválido'

const emailValidator = ({ value }) => {
  const resultValidity = EMAIL_REGEX.test(value)
  return !resultValidity ? MESSAGE : null
}

export { emailValidator }
