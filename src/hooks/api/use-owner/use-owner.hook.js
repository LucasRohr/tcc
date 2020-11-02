import { useRequest } from '../use-request/use-request.hook'

const useOwner = () => {
  const { get, put } = useRequest('user-service/accounts/owner')

  const getManagementOwnerHeirs = async ownerId => {
    return await get(`heirs?owner_id=${ownerId}`)
  }

  const getAllOwnerHeirs = async ownerId => {
    return await get(`${ownerId}/heirs`)
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
    removeHeir,
    getManagementOwnerHeirs,
    getAllOwnerHeirs,
    getHeritageMedias,
    getOwnerHeitsTotalNumber,
  }
}

export { useOwner }
