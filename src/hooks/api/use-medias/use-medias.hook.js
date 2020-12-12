import { objectToUrl } from 'app-helpers'
import { useRequest } from '../use-request/use-request.hook'

const useMedia = () => {
  const { get, post, put } = useRequest('/file-service/files')

  const getAllHeirsForMedia = async ownerId =>
    await get(`file-owner-heirs?owner_id=${ownerId}`, {
      useToast: false,
      useLoader: false,
      showDefaultErrorToast: false,
    })

  const uploadMediaContent = async ({ mediaContent, mediaInfo, multiple }) => {
    const formData = new FormData()

    formData.append('file-info', new Blob([JSON.stringify(mediaInfo)], { type: 'application/json' }))

    if (multiple) {
      mediaContent.forEach(media => {
        formData.append('file-content', media)
      })
    } else {
      formData.append('file-content', mediaContent)
    }

    const uploadEndpoint = multiple ? 'multiple-media-upload' : 'single-media-upload'

    const result = await post(uploadEndpoint, formData, { 'Content-Type': undefined })
    return result !== undefined
  }

  const updateMedia = async ({ mediaContent, mediaInfo }) => {
    const formData = new FormData()

    formData.append('file-info', new Blob([JSON.stringify(mediaInfo)], { type: 'application/json' }))
    formData.append('file-content', mediaContent)

    const result = await put('file-update', formData, { 'Content-Type': undefined })
    return result !== undefined
  }

  const removeMedia = async mediaId => {
    const result = await put(`file-removal?media_id=${mediaId}`)
    return result !== undefined
  }

  const updateMediaHeirs = async mediaObject => {
    const result = await put(`file-heirs-update`, mediaObject)
    return result !== undefined
  }

  const getOwnerMedias = async requestObject => {
    const url = objectToUrl({ baseUrl: 'owner-files', data: requestObject })
    return await get(url)
  }

  const getHeirMedias = async requestObject => {
    const url = objectToUrl({ baseUrl: 'heir-files', data: requestObject })
    return await get(url)
  }

  const getMediaForDownload = async fileId => {
    return await get(`file-to-download?file_id=${fileId}`)
  }

  return {
    uploadMediaContent,
    updateMedia,
    getAllHeirsForMedia,
    removeMedia,
    updateMediaHeirs,
    getOwnerMedias,
    getHeirMedias,
    getMediaForDownload,
  }
}

export { useMedia }
