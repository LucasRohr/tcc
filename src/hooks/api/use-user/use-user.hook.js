import { useRequest } from '../use-request/use-request.hook'

const useUser = () => {
  const { get } = useRequest('/user')

  const getPermissions = async userId => {
    return await get(`permissions/${userId}`)
  }

  return {
    getPermissions,
  }
}

export { useUser }
