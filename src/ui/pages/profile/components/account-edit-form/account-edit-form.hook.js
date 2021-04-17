import { useEffect } from 'react'
import { useInput, useLoggedUser, useAccount, useForm } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useAccountEditForm = ({ initialData }) => {
  const { updateAccount } = useAccount()
  const { loggedUser } = useLoggedUser()
  const { getForm } = useForm() 

  const name = useInput({
    name: 'name',
    label: 'Nome',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const cryptoPassword = useInput({
    name: 'cryptoPassword',
    label: 'Senha atual de segurança',
    variant: 'full',
    usePassword: true,
    required: false
  })

  const newCryptoPassword = useInput({
    name: 'newCryptoPassword',
    label: 'Nova senha de segurança',
    variant: 'full',
    usePassword: true,
    required: false
  })

  const newCryptoPasswordConfirmation = useInput({
    name: 'newCryptoPasswordConfirmation',
    label: 'Confirme sua nova senha',
    variant: 'full',
    usePassword: true,
    required: false
  })

  useEffect(() => {
    if (initialData) {
      name.setInitialValue(initialData.name)
    }
  }, [initialData])

  const isPasswordConfirmed = () => newCryptoPassword.value === newCryptoPasswordConfirmation.value

  const validateForm = async () => {
    if (name.isValid && isPasswordConfirmed()) {
      return true
    }

    if (!name.isValid && isPasswordConfirmed()) {
      return false
    }

    return 0
  }

  const buildApiObject = () => ({
    accountId: loggedUser.currentAccount.id,
    accountName: name.value,
    cryptoPassword: cryptoPassword.value,
    newCryptoPassword: newCryptoPassword.value
  })

  const sendToApi = async apiObject => {
    return await updateAccount(apiObject)
  }
  
  const fields = [name, cryptoPassword, newCryptoPassword, newCryptoPasswordConfirmation]

  return {
    isValid: () => validateForm(),
    renderEditForm: () => getForm(fields),
    buildApiObject,
    sendToApi,
  }
}

export { useAccountEditForm }
