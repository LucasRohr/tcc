import { useRequest } from '../use-request/use-request.hook'

const useCredential = () => {
  const { get, put } = useRequest('/credential-service')

  const getHeirReceivedCredentials = async heirId => {
    return await get(`${heirId}/heir-credentials`)
  }

  const getOwnerHeritageCredentials = async ownerId => {
    return await get(`${ownerId}/owner-credentials`)
  }

  const getOwnerHeritageCredentialPassword = async credentialId => {
    return await get(`credentials/${credentialId}/auth`)
  }

  const updateCredential = async (credentialId, updateObject) => {
    const result = await put(`credentials/${credentialId}/edit`, updateObject)
    return result !== undefined
  }

  const removeCredential = async credentialId => {
    const result = await put(`credentials/${credentialId}/inactive`)
    return result !== undefined
  }

  return {
    getHeirReceivedCredentials,
    getOwnerHeritageCredentials,
    getOwnerHeritageCredentialPassword,
    updateCredential,
    removeCredential,
  }
}

export { useCredential }
