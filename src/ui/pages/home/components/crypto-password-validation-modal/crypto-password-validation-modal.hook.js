import { useForm, useInput, useAccount, useLoggedUser } from 'app-hooks'

const useCryptoPasswordValidation = () => {
  const { isValid, getForm } = useForm()
  const { validateCryptoPassword } = useAccount()
  const { loggedUser } = useLoggedUser()

  const cryptoPassword = useInput({
    name: 'cryptoPassword',
    type: 'text',
    label: 'Senha de segurança',
    usePassword: true,
    variant: 'full',
    minLength: 2
  })

  const fields = [cryptoPassword]
  
  const buildApiObject = () => ({
    accountId: loggedUser.currentAccount.id,
    cryptoPassword: cryptoPassword.value,
  })

  const sendToApi = async apiObject => {
    return await validateCryptoPassword(apiObject)
  }

  return {
    renderFields: () => getForm(fields),
    buildApiObject,
    sendToApi,
    isValid: () => isValid({ fields })
  }
}

export { useCryptoPasswordValidation }