import { useInput, useHeir, useLoggedUser } from 'app-hooks'
import { digitalCertificateCodeValidator } from 'app-validators'

const useOwnerWarningForm = () => {
  const { validateDigitalDeathCertificate } = useHeir()
  const { loggedUser } = useLoggedUser()

  const certificateCode = useInput({
    name: 'certificateCode',
    label: 'Código da Certidão Digital',
    variant: 'full',
    maxLength: 32,
    validators: [value => digitalCertificateCodeValidator({ value })],
  })

  const buildApiObject = () => ({
    certificateHashCode: certificateCode.value,
    heirId: loggedUser.currentAccount.id,
  })

  const sendToApi = async apiObject => {
    return await validateDigitalDeathCertificate(apiObject)
  }

  return {
    renderField: () => certificateCode.getInputComponent(),
    buildApiObject,
    sendToApi,
    isValid: () => certificateCode.isValid(),
  }
}

export { useOwnerWarningForm }
