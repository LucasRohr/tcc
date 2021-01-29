import { useRequest } from '../use-request/use-request.hook'

const useLogin = () => {
  const { post } = useRequest('/auth')

  const login = async loginObject => {
    return await post('', loginObject, { returnHeader: true, returnError: true })
  }

  return {
    login,
  }
}

export { useLogin }
