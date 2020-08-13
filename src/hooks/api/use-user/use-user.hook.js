import { useRequest } from '../use-request/use-request.hook'

const useUser = () => {
  const { get } = useRequest('/user')

  const getPermissions = async accountId => {
    return await get(`permissions/${accountId}`)
  }

  return {
    getPermissions,
  }
}

export { useUser }
