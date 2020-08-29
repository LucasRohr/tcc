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

  const updateUser = async (userId, userObject) => {
    const result = await put(`update/${userId}`, userObject)
    return result !== undefined
  }

  const removeUser = async userId => {
    const result = await put(`remove/${userId}`)
    return result !== undefined
  }

  return {
    getPermissions,
    registerUser,
    updateUser,
    removeUser,
  }
}

export { useUser }
