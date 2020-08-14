import { useRequest } from '../use-request/use-request.hook'

const useOwner = () => {
  const { post } = useRequest('/owner')

  const inviteHeir = async inviteObject => {
    const result = await post('heir-invite', inviteObject)
    return result !== undefined
  }

  const removeHeir = async removeObject => {
    const result = await post('heir-remove', removeObject)
    return result !== undefined
  }

  return {
    inviteHeir,
    removeHeir,
  }
}

export { useOwner }
