import { minLengthValidator } from 'app-validators'
import { useInput, useLoggedUser, useHeir, useForm } from 'app-hooks'

const useInviteRowForm = () => {
  const { createHeirAccount } = useHeir()

  const { loggedUser } = useLoggedUser()

  const { getForm, isValid } = useForm()

  const accountName = useInput({
    name: 'accountName',
    label: 'Nome da conta herdeira',
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

  const buildApiObject = ownerId => ({
    userId: loggedUser.id,
    name: accountName.value,
    cryptoPassword: cryptoPassword.value,
    ownerId,
  })

  const sendToApi = async apiObject => {
    return await createHeirAccount(apiObject)
  }

  const fields = [accountName, cryptoPassword]

  return {
    renderCreateHeirInput: () => getForm(fields),
    isValid: () => isValid({ fields }),
    buildApiObject,
    sendToApi,
  }
}

export { useInviteRowForm }
