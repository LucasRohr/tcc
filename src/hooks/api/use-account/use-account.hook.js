import { useRequest } from '../use-request/use-request.hook'

const useAccount = () => {
  const { get, post, put } = useRequest('/user-service/accounts')

  const getAllUserAccounts = async userId => {
    return await get(`all-accounts?user_id=${userId}`)
  }

  const getAllOwnerHeirsAccounts = async ownerId => {
    return await get(`owner/heirs?owner_id=${ownerId}`)
  }

  const createOwnerAccount = async accountObject => {
    return await post(`owner/owner-creation`, accountObject)
  }

  const updateAccount = async accountObject => {
    const result = await put(`account-update`, accountObject)
    return result !== undefined
  }

  const removeAccount = async removalObject => {
    const result = await put('account-inactivation', removalObject)
    return result !== undefined
  }

  const validateCryptoPassword = async validationObject => {
    return await put('crypto-password-validation', validationObject)
  }

  return {
    getAllUserAccounts,
    getAllOwnerHeirsAccounts,
    createOwnerAccount,
    updateAccount,
    removeAccount,
    validateCryptoPassword
  }
}

export { useAccount }
