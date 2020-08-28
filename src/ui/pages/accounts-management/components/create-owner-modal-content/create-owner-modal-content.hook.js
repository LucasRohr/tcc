import { ROLES } from 'app-constants'
import { minLengthValidator } from 'app-validators'
import { useAccount, useInput, useLoggedUser } from 'app-hooks'

const useOwnerModalContentForm = () => {
  const { createAccount } = useAccount()
  const { loggedUser } = useLoggedUser()

  const accountName = useInput({
    name: 'accountName',
    label: 'Nome da conta',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const buildApiObject = () => ({
    accountName: accountName.value,
    type: ROLES.OWNER,
  })

  const sendToApi = async apiObject => {
    return await createAccount(loggedUser.id, apiObject)
  }

  return {
    renderCreateOwnerInput: () => accountName.getInputComponent(),
    isValid: () => accountName.isValid(),
    buildApiObject,
    sendToApi,
  }
}

export { useOwnerModalContentForm }
