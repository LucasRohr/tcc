import { useRequest } from '../use-request/use-request.hook'

const useUser = () => {
  const { get, post, put } = useRequest('/user-service')

  const getPermissions = async accountId => {
    return await get(`permissions/${accountId}`)
  }

  const registerUser = async registerObject => {
    const result = await post('register', registerObject)
    return result !== undefined
  }

  const updateUserInfo = async (userId, userObject) => {
    const result = await put(`update/${userId}`, userObject)
    return result !== undefined
  }

  const updatePassword = async (userId, passwordObject) => {
    const result = await put(`update-auth/${userId}`, passwordObject)
    return result !== undefined
  }

  const getUserPassword = async userId => {
    return await get(`${userId}/user-auth`)
  }

  const removeUser = async userId => {
    const result = await put(`remove/${userId}`)
    return result !== undefined
  }

  return {
    getPermissions,
    registerUser,
    updateUserInfo,
    updatePassword,
    getUserPassword,
    removeUser,
  }
}

export { useUser }
