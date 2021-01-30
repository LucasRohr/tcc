import { useForm, useInput, useLoggedUser } from 'app-hooks'

const useLoginConfirmation = () => {
  const { isValid, getForm } = useForm()
  const { sendLoginToken } = useLoggedUser()

  const loginToken = useInput({
    name: 'loginToken',
    type: 'text',
    label: 'Código de confirmação',
    maxLength: 6,
    variant: 'full',
  })

  const fields = [loginToken]

  const buildApiObject = () => ({
    loginToken: loginToken.value,
  })

  const sendToApi = async apiObject => {
    return await sendLoginToken(apiObject.loginToken)
  }

  return {
    renderFields: () => getForm(fields),
    buildApiObject,
    sendToApi,
    isValid: () => isValid({ fields }),
  }
}

export { useLoginConfirmation }
