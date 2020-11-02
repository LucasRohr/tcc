import { minLengthValidator } from 'app-validators'
import { useInput, useLoggedUser, useHeir } from 'app-hooks'

const useInviteRowForm = () => {
  const { createHeirAccount } = useHeir()

  const { loggedUser } = useLoggedUser()

  const accountName = useInput({
    name: 'accountName',
    label: 'Nome da conta herdeira',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const buildApiObject = ownerId => ({
    userId: loggedUser.id,
    name: accountName.value,
    ownerId,
  })

  const sendToApi = async apiObject => {
    return await createHeirAccount(apiObject)
  }

  return {
    renderCreateHeirInput: () => accountName.getInputComponent(),
    isValid: () => accountName.isValid(),
    buildApiObject,
    sendToApi,
  }
}

export { useInviteRowForm }
