import { ROLES } from 'app-constants'
import { minLengthValidator } from 'app-validators'
import { useInput, useAccount, useLoggedUser } from 'app-hooks'

const useInviteRowForm = () => {
  const { createAccount } = useAccount()

  const { loggedUser } = useLoggedUser()

  const accountName = useInput({
    name: 'accountName',
    label: 'Nome da conta herdeira',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const buildApiObject = () => ({
    accountName: accountName.value,
    type: ROLES.HEIR,
  })

  const sendToApi = async apiObject => {
    return await createAccount(loggedUser.id, apiObject)
  }

  return {
    renderCreateHeirInput: () => accountName.getInputComponent(),
    isValid: () => accountName.isValid(),
    buildApiObject,
    sendToApi,
  }
}

export { useInviteRowForm }
