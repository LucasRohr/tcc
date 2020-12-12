import { useRequest } from '../use-request/use-request.hook'

const useOwner = () => {
  const { get, put } = useRequest('user-service/accounts/owner')

  const getManagementOwnerHeirs = async ownerId => {
    return await get(`heirs?owner_id=${ownerId}`)
  }

  const getAllOwnerHeirsForCredential = async ownerId => {
    return await get(`credential-heirs?owner_id=${ownerId}`)
  }

  const removeHeir = async removeObject => {
    const result = await put('heir-remove', removeObject)
    return result !== undefined
  }

  const getOwnerHeitsTotalNumber = async ownerId => {
    const result = await getManagementOwnerHeirs(ownerId)
    return result ? result.length : 0
  }

  return {
    removeHeir,
    getManagementOwnerHeirs,
    getAllOwnerHeirs: () => [],
    getAllOwnerHeirsForCredential,
    getOwnerHeitsTotalNumber,
  }
}

export { useOwner }
