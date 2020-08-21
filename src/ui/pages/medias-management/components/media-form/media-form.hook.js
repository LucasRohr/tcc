import { useEffect } from 'react'
import { useForm, useInput, useInputFile } from 'app-hooks'
import { minLengthValidator } from 'app-validators'
import { HERITAGE_TYPES } from 'app-constants'

const useMediaForm = ({ initialData, mediaType }) => {
  const { isValid, getForm, fillFields } = useForm()

  const name = useInput({
    name: 'name',
    label: 'Nome',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
    required: false,
  })

  const description = useInput({
    name: 'description',
    label: 'Descrição',
    variant: 'full',
    inputArea: true,
    validators: [value => minLengthValidator({ value, minLength: 2 })],
    required: false,
  })

  const media = useInputFile({
    name: 'media',
    label: 'Mídia',
    accept: HERITAGE_TYPES[mediaType].extensions,
    mediaType: HERITAGE_TYPES[mediaType].key,
    defaultValue: initialData ? initialData.file : null,
  })

  const inputFields = [name, description]
  const allFields = [...inputFields, media]

  useEffect(() => {
    if (initialData) {
      fillFields(allFields, initialData)
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
    isValid: () => isValid({ allFields }),
    renderInputFields: () => getForm(inputFields),
    renderMediaField: () => media.getInputComponent(),
    buildApiObject,
    sendToApi,
  }
}

export { useMediaForm }
