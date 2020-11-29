import { useRequest } from '../use-request/use-request.hook'

const useUser = () => {
  const { get, post, put } = useRequest('/user-service/users')

  const getPermissions = async accountId => {
    return await get(`permissions/${accountId}`)
  }

  const registerUser = async registerObject => {
    const result = await post('register', registerObject)
    return result !== undefined
  }

  const updateUserInfo = async userObject => {
    const result = await put('profile-update', userObject)
    return result !== undefined
  }

  const updatePassword = async passwordObject => {
    const result = await put('password-update', passwordObject)
    return result !== undefined
  }

  const removeUser = async removalObject => {
    const result = await put('user-inactivation', removalObject)
    return result !== undefined
  }

  return {
    getPermissions,
    registerUser,
    updateUserInfo,
    updatePassword,
    removeUser,
  }
}

export { useUser }
