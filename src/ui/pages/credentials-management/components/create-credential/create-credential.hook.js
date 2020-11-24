import { useInput, useForm, useCredential } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useCreateCredential = () => {
  const { isValid, getForm } = useForm()
  const { createCredential } = useCredential()

  const name = useInput({
    name: 'name',
    label: 'Nome da credencial',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const login = useInput({
    name: 'login',
    label: 'Login',
    variant: 'full',
    required: false,
    autoComplete: 'new-password',
  })

  const password = useInput({
    name: 'password',
    label: 'Senha',
    variant: 'full',
    autoComplete: 'new-password',
    usePassword: true,
  })

  const link = useInput({
    name: 'link',
    label: 'Link para utilização',
    variant: 'full',
    required: false,
  })

  const description = useInput({
    name: 'description',
    label: 'Descrição',
    variant: 'full',
    required: false,
    inputArea: true,
  })

  const fields = [name, login, password, link, description]

  const cleanFields = () => {
    fields.forEach(field => {
      field.resetInput()
    })
  }

  const buildApiObject = () => {
    const apiObject = {}

    fields.forEach(field => {
      apiObject[field.name] = field.value
    })

    return apiObject
  }

  const sendToApi = async apiObject => {
    return await createCredential(apiObject)
  }

  return {
    getCreateCredentialFields: () => getForm(fields),
    isValid: () => isValid({ fields }),
    buildApiObject,
    sendToApi,
    cleanFields,
  }
}

export { useCreateCredential }
