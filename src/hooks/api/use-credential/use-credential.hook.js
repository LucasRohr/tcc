import { useRequest } from '../use-request/use-request.hook'

const useCredential = () => {
  const { get } = useRequest('/credential-service')

  const getHeirReceivedCredentials = async heirId => {
    return await get(`${heirId}/heir-credentials`)
  }

  const getOwnerHeritageCredentials = async ownerId => {
    return await get(`${ownerId}/owner-credentials`)
  }

  const getOwnerHeritageCredentialPassword = async credentialId => {
    return await get(`credentials/${credentialId}/auth`)
  }

  return {
    getHeirReceivedCredentials,
    getOwnerHeritageCredentials,
    getOwnerHeritageCredentialPassword,
  }
}

export { useCredential }
