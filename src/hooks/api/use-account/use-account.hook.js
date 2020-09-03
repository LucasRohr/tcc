import { useRequest } from '../use-request/use-request.hook'

const useAccount = () => {
  const { get, post, put } = useRequest('/account-service')

  const getAllUserAccounts = async userId => {
    return await get(`user/${userId}/accounts`)
  }

  const getAllOwnerHeirsAccounts = async ownerId => {
    return await get(`owner/${ownerId}/heirs-accounts`)
  }

  const createAccount = async (userId, accountObject) => {
    return await post(`user/${userId}/account-creation`, accountObject)
  }

  const updateAccount = async (accountId, accountObject) => {
    return await put(`update/${accountId}`, accountObject)
  }

  const removeAccount = async accountId => {
    const result = await put(`remove/${accountId}`)
    return result !== undefined
  }

  return {
    getAllUserAccounts,
    getAllOwnerHeirsAccounts,
    createAccount,
    updateAccount,
    removeAccount,
  }
}

export { useAccount }
