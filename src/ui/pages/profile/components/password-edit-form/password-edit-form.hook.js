import { useForm, useInput, useLoggedUser, useUser } from 'app-hooks'
import { passwordValidator } from 'app-validators'

const PASSWORD_CONFIRM_ERROR = 'Senha precisa ser igual a anterior'

const usePasswordEditForm = () => {
  const { isValid, getForm } = useForm()
  const { updatePassword } = useUser()
  const { loggedUser } = useLoggedUser()

  const samePasswordValidator = ({ value, password, message }) => (value === password ? null : message)

  const currentPassword = useInput({
    name: 'currentPassword',
    label: 'Senha atual',
    variant: 'full',
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
    id: loggedUser.id,
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
  })

  const sendToApi = async apiObject => {
    return await updatePassword(apiObject)
  }

  return {
    isValid: () => isValid({ fields }),
    renderPasswordForm: () => getForm(fields),
    buildApiObject,
    sendToApi,
  }
}

export { usePasswordEditForm }
