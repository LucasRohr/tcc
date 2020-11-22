import { useEffect } from 'react'
import { useForm, useInput, useCredential } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useCredentialCard = ({ initialData }) => {
  const { isValid, getForm, fillFields } = useForm()
  const { createCredential } = useCredential()

  const name = useInput({
    name: 'name',
    label: 'Nome',
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
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const link = useInput({
    name: 'link',
    label: 'Link',
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

  const mainFields = [name, login, password]
  const extraFields = [link, description]

  const allFields = [...mainFields, ...extraFields]

  useEffect(() => {
    if (initialData) {
      fillFields(allFields, initialData)
    }
  }, [initialData])

  const buildApiObject = () => {
    const apiObject = {}

    allFields.forEach(field => {
      apiObject[field.name] = field.value
    })

    apiObject.credentialId = initialData.credentialId
    apiObject.ownerId = initialData.credentialOwnerId
    apiObject.heirsIds = initialData.heirsIds

    return apiObject
  }

  const sendToApi = async apiObject => {
    return await createCredential(apiObject)
  }

  return {
    getMainFormFields: () => getForm(mainFields),
    getExtraFormFields: () => getForm(extraFields),
    isValid: () => isValid({ fields: allFields }),
    buildApiObject,
    sendToApi,
  }
}

export { useCredentialCard }
