import { useEffect } from 'react'
import { useInput, useLoggedUser, useAccount } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useAccountEditForm = ({ initialData }) => {
  const { updateAccount } = useAccount()
  const { loggedUser } = useLoggedUser()

  const name = useInput({
    name: 'name',
    label: 'Nome',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  useEffect(() => {
    if (initialData) {
      name.setInitialValue(initialData.name)
    }
  }, [initialData])

  const buildApiObject = () => ({
    accountId: loggedUser.currentAccount.id,
    accountName: name.value,
  })

  const sendToApi = async apiObject => {
    return await updateAccount(apiObject)
  }

  return {
    isValid: () => name.isValid(),
    renderEditForm: () => name.getInputComponent(),
    buildApiObject,
    sendToApi,
  }
}

export { useAccountEditForm }
