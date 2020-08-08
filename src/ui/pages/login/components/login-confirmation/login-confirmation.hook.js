import { useForm, useInput } from 'app-hooks'

const useLoginConfirmation = () => {
  const { isValid, getForm } = useForm()

  const loginCode = useInput({
    name: 'loginCode',
    type: 'text',
    label: 'Código de confirmação',
    variant: 'full',
  })

  const fields = [loginCode]

  const buildApiObject = () => ({
    loginCode: loginCode.value,
  })

  const sendToApi = apiObject => apiObject

  return {
    renderFields: () => getForm(fields),
    buildApiObject,
    sendToApi,
    isValid: () => isValid({ fields }),
  }
}

export { useLoginConfirmation }
