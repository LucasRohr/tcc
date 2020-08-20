import { useRequest } from '../use-request/use-request.hook'

const useOwner = () => {
  const { get, post, put } = useRequest('/owner')

  const getOwnerHeirs = async ownerId => {
    return await get(`${ownerId}/heirs`)
  }

  const inviteHeir = async inviteObject => {
    const result = await post('heir-invite', inviteObject)
    return result !== undefined
  }

  const removeHeir = async removeObject => {
    const result = await put('heir-remove', removeObject)
    return result !== undefined
  }

  const getHeritageMedias = async ownerId => {
    return await get(`${ownerId}/medias`)
  }

  const getOwnerHeirsForMedia = async (ownerId, mediaId) => {
    return await get(`${ownerId}/${mediaId}/heirs`)
  }

  return {
    inviteHeir,
    removeHeir,
    getHeritageMedias,
    getOwnerHeirs,
    getOwnerHeirsForMedia,
  }
}

export { useOwner }
