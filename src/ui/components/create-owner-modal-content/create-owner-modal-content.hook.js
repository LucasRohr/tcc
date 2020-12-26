import { minLengthValidator } from 'app-validators'
import { useAccount, useInput, useLoggedUser } from 'app-hooks'

const useOwnerModalContentForm = () => {
  const { createOwnerAccount } = useAccount()
  const { loggedUser } = useLoggedUser()

  const accountName = useInput({
    name: 'accountName',
    label: 'Nome da conta',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const buildApiObject = () => ({
    userId: loggedUser.id,
    accountName: accountName.value,
  })

  const sendToApi = async apiObject => {
    return await createOwnerAccount(apiObject)
  }

  return {
    renderCreateOwnerInput: () => accountName.getInputComponent(),
    isValid: () => accountName.isValid(),
    buildApiObject,
    sendToApi,
  }
}

export { useOwnerModalContentForm }
