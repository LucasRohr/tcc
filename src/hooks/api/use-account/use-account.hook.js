import { useRequest } from '../use-request/use-request.hook'

const useAccount = () => {
  const { get, post } = useRequest('/account-service')

  const getAllUserAccounts = async userId => {
    return await get(`user/${userId}/accounts`)
  }

  const getAllOwnerHeirsAccounts = async ownerId => {
    return await get(`owner/${ownerId}/heirs-accounts`)
  }

  // accountObject = { name, type }
  const createAccount = async (userId, accountObject) => {
    return await post(`user/${userId}/account-creation`, accountObject)
  }

  return {
    getAllUserAccounts,
    getAllOwnerHeirsAccounts,
    createAccount,
  }
}

export { useAccount }
