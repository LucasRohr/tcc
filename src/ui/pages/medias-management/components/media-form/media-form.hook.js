import { useEffect } from 'react'
import { useForm, useInput, useInputFile, useMedia } from 'app-hooks'
import { minLengthValidator } from 'app-validators'
import { HERITAGE_TYPES, UPLOAD_OPTIONS } from 'app-constants'

const useMediaForm = ({ initialData, mediaType, uploadOption }) => {
  const { isValid, getForm, fillFields, cleanFields } = useForm()
  const { uploadMediaContent, updateMediaInfo } = useMedia()

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
    label: UPLOAD_OPTIONS[uploadOption.key].multiple ? 'Mídias' : 'Mídia',
    accept: HERITAGE_TYPES[mediaType].extensions,
    mediaType: HERITAGE_TYPES[mediaType].key,
    defaultValue: initialData ? initialData.file : null,
    multiple: UPLOAD_OPTIONS[uploadOption.key].multiple,
  })

  const inputFields = [name, description]
  const allFields = [...inputFields, media]

  useEffect(() => {
    if (initialData) {
      fillFields(allFields, initialData)
    } else {
      cleanFields(allFields)
    }
  }, [initialData])

  useEffect(() => {
    cleanFields(allFields)
  }, [uploadOption.key])

  const buildApiObject = () => ({
    name: name.value,
    description: description.value,
  })

  const getMedia = () => (UPLOAD_OPTIONS[uploadOption.key].multiple ? media.filesList : media.file)

  const sendToApi = async mediaInfo => {
    const multiple = UPLOAD_OPTIONS[uploadOption.key].multiple

    if (initialData) {
      return await updateMediaInfo({ mediaInfo, mediaContent: getMedia() })
    }

    return await uploadMediaContent({ mediaInfo, mediaContent: getMedia(), multiple })
  }

  return {
    mediaContent: getMedia(),
    isValid: () => isValid({ fields: allFields }),
    renderInputFields: () => getForm(inputFields),
    renderMediaField: () => media.getInputComponent(),
    buildApiObject,
    sendToApi,
  }
}

export { useMediaForm }
