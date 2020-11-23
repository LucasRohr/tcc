import { useRequest } from '../use-request/use-request.hook'

const useCredential = () => {
  const { get, put, post } = useRequest('/credential-service')

  const getHeirReceivedCredentials = async heirId => {
    return await get(`${heirId}/heir-credentials`)
  }

  const getOwnerHeritageCredentials = async ownerId => {
    return await get(`credentials/owner-credentials?owner_id=${ownerId}`)
  }

  const getOwnerHeritageCredentialPassword = async (ownerId, credentialId) => {
    return await get(`credentials/credential-auth?owner_id=${ownerId}&credential_id=${credentialId}`)
  }

  const removeCredential = async removeObject => {
    const result = await put(`credentials/credential-remove`, removeObject)
    return result !== undefined
  }

  const createCredential = async createObject => {
    const result = await post(`credentials/creation`, createObject)
    return result !== undefined
  }

  const getAllHeirsForCredential = async (ownerId, credentialId) => {
    return await get(`credentials/owner/available-heirs?owner_id=${ownerId}&credential_id=${credentialId}`, {
      useToast: false,
      useLoader: false,
      showDefaultErrorToast: false,
    })
  }

  const updateCredentialHeirs = async updateObject => {
    const result = await put(`credentials/heirs-update`, updateObject)
    return result !== undefined
  }

  return {
    getHeirReceivedCredentials,
    getOwnerHeritageCredentials,
    getOwnerHeritageCredentialPassword,
    removeCredential,
    createCredential,
    getAllHeirsForCredential,
    updateCredentialHeirs,
  }
}

export { useCredential }
