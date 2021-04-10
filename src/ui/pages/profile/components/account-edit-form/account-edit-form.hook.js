import { useEffect } from 'react'
import { useInput, useLoggedUser, useAccount, useForm } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useAccountEditForm = ({ initialData }) => {
  const { updateAccount } = useAccount()
  const { loggedUser } = useLoggedUser()
  const { getForm, isValid } = useForm() 

  const name = useInput({
    name: 'name',
    label: 'Nome',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const cryptoPassword = useInput({
    name: 'cryptoPassword',
    label: 'Senha de segurança',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
    usePassword: true
  })

  useEffect(() => {
    if (initialData) {
      name.setInitialValue(initialData.name)
      cryptoPassword.setInitialValue(initialData.cryptoPassword)
    }
  }, [initialData])

  const buildApiObject = () => ({
    accountId: loggedUser.currentAccount.id,
    accountName: name.value,
    cryptoPassword: cryptoPassword.value
  })

  const sendToApi = async apiObject => {
    return await updateAccount(apiObject)
  }
  
  const fields = [name, cryptoPassword]

  return {
    isValid: () => isValid({ fields }),
    renderEditForm: () => getForm(fields),
    buildApiObject,
    sendToApi,
  }
}

export { useAccountEditForm }
