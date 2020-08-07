import { useForm, useInput } from 'app-hooks'
import { emailValidator } from 'app-validators'

const useLogin = () => {
  const { isValid, getForm } = useForm()

  const email = useInput({
    name: 'email',
    type: 'email',
    label: 'Email',
    variant: 'full',
    validators: [value => emailValidator({ value })],
  })

  const password = useInput({
    name: 'password',
    type: 'password',
    variant: 'full',
    label: 'Digite sua senha',
    usePassword: true,
  })

  const fields = [email, password]

  const buildApiObject = () => ({
    email: email.value,
    password: password.value,
  })

  const sendToApi = apiObject => apiObject

  return {
    renderFields: () => getForm(fields),
    buildApiObject,
    sendToApi,
    isValid: () => isValid({ fields }),
  }
}

export { useLogin }
