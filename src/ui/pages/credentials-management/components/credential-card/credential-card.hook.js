import { useState, useEffect } from 'react'
import { useForm, useInput, useCredential } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const DEFAULT_VALUE = 'defaultValue'

const useCredentialCard = ({ initialData }) => {
  const [credentialPassword, setCredentialPassword] = useState(DEFAULT_VALUE)

  const { isValid, getForm } = useForm()
  const { getOwnerHeritageCredentialPassword } = useCredential()

  const getCredentialPassword = async () => {
    if (credentialPassword === DEFAULT_VALUE) {
      const result = await getOwnerHeritageCredentialPassword(initialData.id)

      if (result) {
        setCredentialPassword(result.auth)
      }
    }
  }

  const name = useInput({
    name: 'credentialName',
    label: 'Nome',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const login = useInput({
    name: 'credentialLogin',
    label: 'Login',
    variant: 'full',
    required: false,
  })

  const password = useInput({
    name: 'credentialPassword',
    label: 'Senha',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
    onFocus: getCredentialPassword,
  })

  const link = useInput({
    name: 'credentialLink',
    label: 'Link',
    variant: 'full',
    required: false,
  })

  const description = useInput({
    name: 'credentialDescription',
    label: 'Descrição',
    variant: 'full',
    required: false,
    inputArea: true,
  })

  const mainFields = [name, login, password]
  const extraFields = [link, description]

  const allFields = [...mainFields, ...extraFields]

  useEffect(() => {}, [initialData])

  const buildApiObject = () => {
    const apiObject = {}

    allFields.forEach(field => {
      apiObject[field.name] = field.value
    })

    return apiObject
  }

  const sendToApi = apiObject => apiObject

  return {
    getMainFormFields: () => getForm(mainFields),
    getExtraFormFields: () => getForm(extraFields),
    isValid: () => isValid(allFields),
    buildApiObject,
    sendToApi,
  }
}

export { useCredentialCard }
