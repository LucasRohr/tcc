import { minLengthValidator } from 'app-validators'
import { useAccount, useInput, useLoggedUser, useForm } from 'app-hooks'

const useOwnerModalContentForm = () => {
  const { createOwnerAccount } = useAccount()
  const { loggedUser } = useLoggedUser()
  const { getForm, isValid } = useForm()

  const accountName = useInput({
    name: 'accountName',
    label: 'Nome da conta',
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

  const fields = [accountName, cryptoPassword]

  const buildApiObject = () => ({
    userId: loggedUser.id,
    accountName: accountName.value,
    cryptoPassword: cryptoPassword.value
  })

  const sendToApi = async apiObject => {
    return await createOwnerAccount(apiObject)
  }

  return {
    isValid: () => isValid({ fields }),
    renderCreateOwnerInput: () => getForm(fields),
    buildApiObject,
    sendToApi,
  }
}

export { useOwnerModalContentForm }
