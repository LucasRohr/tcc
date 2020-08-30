import { useEffect, useState } from 'react'
import { useForm, useInput, useLoggedUser, useUser } from 'app-hooks'
import { passwordValidator } from 'app-validators'

const CURRENT_PASSWORD_ERROR = 'Senha precisa ser igual à atual'
const PASSWORD_CONFIRM_ERROR = 'Senha precisa ser igual a anterior'

const usePasswordEditForm = () => {
  const [userPassword, setUserPassword] = useState('')

  const { isValid, getForm } = useForm()
  const { updatePassword, getUserPassword } = useUser()
  const { loggedUser } = useLoggedUser()

  const retrieveUserPassword = async () => {
    const result = await getUserPassword(loggedUser.id)

    if (result) {
      setUserPassword(result.auth)
    }
  }

  useEffect(() => {
    retrieveUserPassword()
  }, [])

  const samePasswordValidator = ({ value, password, message }) => (value === password ? null : message)

  const currentPassword = useInput({
    name: 'currentPassword',
    label: 'Senha atual',
    variant: 'full',
    validators: [value => samePasswordValidator({ value, password: userPassword, message: CURRENT_PASSWORD_ERROR })],
    usePassword: true,
  })

  const newPassword = useInput({
    name: 'newPassword',
    label: 'Nova senha',
    variant: 'full',
    validators: [value => passwordValidator({ value })],
    usePassword: true,
  })

  const newPasswordConfirmation = useInput({
    name: 'newPasswordConfirmation',
    label: 'Confirmação da nova senha',
    variant: 'full',
    validators: [
      value => samePasswordValidator({ value, password: newPassword.value, message: PASSWORD_CONFIRM_ERROR }),
    ],
    usePassword: true,
  })

  const fields = [currentPassword, newPassword, newPasswordConfirmation]

  const buildApiObject = () => ({
    newAuth: newPassword.value,
  })

  const sendToApi = async apiObject => {
    return await updatePassword(loggedUser.id, apiObject)
  }

  return {
    isValid: () => isValid({ fields }),
    renderPasswordForm: () => getForm(fields),
    buildApiObject,
    sendToApi,
  }
}

export { usePasswordEditForm }
