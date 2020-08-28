const CERTIFICATE_CODE_VALID_LENGTH = 32

const INVALID_MESSAGE = 'O código da Certidão de Óbito Digital deve possuir 32 caracteres.'

const digitalCertificateCodeValidator = ({ value }) => {
  return value.length !== CERTIFICATE_CODE_VALID_LENGTH ? INVALID_MESSAGE : false
}

export { digitalCertificateCodeValidator }
