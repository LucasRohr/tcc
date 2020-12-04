import { useRequest } from '../use-request/use-request.hook'

const useMedia = () => {
  const { get, post, put } = useRequest('/file-service')

  const getAllHeirsForMedia = async (ownerId, mediaId) =>
    await get(`file-owner-heirs?owner_id=${ownerId}&file_id=${mediaId}`, {
      useToast: false,
      useLoader: false,
      showDefaultErrorToast: false,
    })

  const uploadMediaContent = async ({ mediaContent, mediaInfo, multiple }) => {
    const formData = new FormData()

    formData.append('file-info', mediaInfo)
    formData.append('file-content', mediaContent)

    const uploadEndpoint = multiple ? 'multiple-media-upload' : 'single-media-upload'

    const result = await post(uploadEndpoint, formData)
    return result !== undefined
  }

  const removeMedia = async (ownerId, mediaId) => {
    const result = await put(`${ownerId}/media-remove/${mediaId}`)
    return result !== undefined
  }

  const updateMediaHeirs = async mediaObject => {
    const result = await put(`file-heirs-update`, mediaObject)
    return result !== undefined
  }

  return {
    uploadMediaContent,
    getAllHeirsForMedia,
    removeMedia,
    updateMediaHeirs,
  }
}

export { useMedia }
