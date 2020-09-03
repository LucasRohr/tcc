import { useRequest } from '../use-request/use-request.hook'

const useOwner = () => {
  const { get, post, put } = useRequest('/owner')

  const getPageableOwnerHeirs = async (ownerId, page) => {
    return await get(`${ownerId}/heirs?page=${page}`)
  }

  const getAllOwnerHeirs = async ownerId => {
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

  const getOwnerHeitsTotalNumber = async ownerId => {
    return await get(`${ownerId}/heirs-total`)
  }

  return {
    inviteHeir,
    removeHeir,
    getPageableOwnerHeirs,
    getAllOwnerHeirs,
    getHeritageMedias,
    getOwnerHeitsTotalNumber,
  }
}

export { useOwner }
