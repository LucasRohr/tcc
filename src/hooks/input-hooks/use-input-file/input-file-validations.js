import { MediaDimensions, MediaExtentionsValidity, getVideoDuration } from 'app-helpers'
import { MIME_TYPES, HERITAGE_TYPES } from 'app-constants'

export const inputFileValidations = async (file, accept, mediaTypes, mediaConfig) => {
  if (!file || !file.name) {
    return 'Upload obrigatório.'
  }

  if (accept === MIME_TYPES.TXT) {
    accept = 'txt'
  }

  const transformAccept = accept
    .replace(new RegExp('application/vnd.ms-excel', 'g'), '.xls')
    .replace(new RegExp('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'g'), '.xlsx')
    .replace(new RegExp(' .', 'g'), '')
    .replace('.', '')
    .replace(new RegExp(',', 'g'), '|')
  const transformAcceptArray = transformAccept.split('|')
  const mediaConfigItem = mediaConfig[mediaTypes]
  const allowedExtensions = `(.*?)\\.(${transformAccept})$` || ''
  const regEx = new RegExp(allowedExtensions, 'gi')
  const realFileType = await MediaExtentionsValidity.getRealFileType(file)

  if (!regEx.test(file.name)) {
    return 'Tipo de extensão inválida.'
  }

  if (realFileType) {
    const isValid = transformAcceptArray.find(fileType => {
      const mimeType = MIME_TYPES[fileType.toUpperCase()]
      return realFileType.mime === mimeType
    })

    if (!isValid) {
      return `Arquivo ${realFileType.ext} é inválido.`
    }
  } else {
    return 'Arquivo desconhecido.'
  }

  const media = mediaTypes === HERITAGE_TYPES.IMAGE.key ? await MediaDimensions.getImageDimensionsFromFile(file) : null

  if (file.size > mediaConfigItem.maxSizeInBytes) {
    const friendlySize =
      mediaTypes === HERITAGE_TYPES.VIDEO.key
        ? `${mediaConfigItem.maxSizeInBytes / 1024 / 1024}MB`
        : `${mediaConfigItem.maxSizeInBytes / 1024}KB`
    return `Mídia maior que ${friendlySize}.`
  }

  if (mediaTypes === HERITAGE_TYPES.IMAGE.key) {
    if (media.width < mediaConfigItem.width || media.height < mediaConfigItem.height) {
      return `Resolução mínima aceita é ${mediaConfigItem.width}px x ${mediaConfigItem.height}px.`
    }

    if (media.width > mediaConfigItem.maxWidth || media.height > mediaConfigItem.maxHeight) {
      return `Resolução máxima aceita é ${mediaConfigItem.maxWidth}px x ${mediaConfigItem.maxHeight}px.`
    }
  } else if (mediaTypes === HERITAGE_TYPES.VIDEO.key) {
    const videoDuration = await getVideoDuration(file)

    if (videoDuration > mediaConfigItem.maxDurationInSeconds) {
      return `O vídeo deve ter no máximo ${mediaConfigItem.maxDurationInSeconds} segundos.`
    }
  }
}
