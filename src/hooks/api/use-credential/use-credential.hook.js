import { useRequest } from '../use-request/use-request.hook'

const useCredential = () => {
  const { get, put, post } = useRequest('/credential-service')

  const getHeirReceivedCredentials = async heirId => {
    return await get(`${heirId}/heir-credentials`)
  }

  const getOwnerHeritageCredentials = async ownerId => {
    return await get(`${ownerId}/owner-credentials`)
  }

  const getOwnerHeritageCredentialPassword = async credentialId => {
    return await get(`credentials/${credentialId}/auth`)
  }

  const removeCredential = async credentialId => {
    const result = await put(`credentials/${credentialId}/inactive`)
    return result !== undefined
  }

  const createCredential = async createObject => {
    const result = await post(`credentials/creation`, createObject)
    return result !== undefined
  }

  const getAllHeirsForCredential = async (ownerId, credentialId) => {
    return await get(`credentials/${credentialId}/owner/${ownerId}/available-heirs`, {
      useToast: false,
      useLoader: false,
      showDefaultErrorToast: false,
    })
  }

  const updateCredentialHeirs = async (credentialId, heirs) => {
    const result = await put(`credentials/${credentialId}/heirs-update`, heirs)
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
