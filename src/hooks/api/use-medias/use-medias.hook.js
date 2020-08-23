import { useRequest } from '../use-request/use-request.hook'

const MEDIA_OPTIONS = {
  IMAGE: '/image-service',
  VIDEO: '/video-service',
  DOCUMENT: '/document-service',
}

const useMedia = ({ mediaType }) => {
  const { get, del } = useRequest(MEDIA_OPTIONS[mediaType])

  const getOwnerHeirsForMedia = async (ownerId, mediaId) => {
    return await get(`${ownerId}/${mediaId}/heirs`, { useToast: false, useLoader: false, showDefaultErrorToast: false })
  }

  const removeMedia = async (ownerId, mediaId) => {
    const result = await del(`${ownerId}/media-remove/${mediaId}`)
    return result !== undefined
  }

  return {
    getOwnerHeirsForMedia,
    removeMedia,
  }
}

export { useMedia }
