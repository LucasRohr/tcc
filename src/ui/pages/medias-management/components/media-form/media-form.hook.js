import { useEffect } from 'react'
import { useForm, useInput } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useMediaForm = ({ initialData }) => {
  const { isValid, getForm, fillFields } = useForm()

  const name = useInput({
    name: 'name',
    label: 'Nome',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const description = useInput({
    name: 'description',
    label: 'Descrição',
    variant: 'full',
    inputArea: true,
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const fields = [name, description]

  useEffect(() => {
    if (initialData) {
      fillFields(fields, initialData)
    }
  }, [initialData])

  const buildApiObject = () => ({
    name: name.value,
    description: description.value,
  })

  const sendToApi = async apiObject => {
    return apiObject
  }

  return {
    isValid: () => isValid({ fields }),
    renderMediaFields: () => getForm(fields),
    buildApiObject,
    sendToApi,
  }
}

export { useMediaForm }
