import { useForm, useInput } from 'app-hooks'

const useCryptoPasswordValidation = () => {
  const { isValid, getForm } = useForm()

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
    cryptoPassword: cryptoPassword.value,
  })

  // const sendToApi = async apiObject => {
  //   return await validateCryptoPassword(apiObject.cryptoPassword)
  // }

  return {
    renderFields: () => getForm(fields),
    buildApiObject,
    // sendToApi,
    isValid: () => isValid({ fields })
  }
}

export { useCryptoPasswordValidation }