import { useRequest } from '../use-request/use-request.hook'

const useInvite = () => {
  const { get, put, post } = useRequest('/invite-service/invites')

  const getAllHeirInvites = async userId => {
    return await get(`user-invites?user_id=${userId}`)
  }

  const respondInvite = async responseObject => {
    const result = await put('invite-response', responseObject)
    return result !== undefined
  }

  const updateInviteCode = async codeObject => {
    const result = await put('invite-code-update', codeObject, { useLoader: false })
    return result !== undefined
  }

  const checkInviteByCode = async code => {
    return await get(`invite-check?code=${code}`, { useLoader: false })
  }

  const getInviteById = async inviteId => {
    return await get(`invite-by-id?invite_id=${inviteId}`, { useLoader: false })
  }

  const inviteHeir = async inviteObject => {
    const result = await post('heir-invite', inviteObject)
    return result !== undefined
  }

  return {
    getAllHeirInvites,
    respondInvite,
    inviteHeir,
    updateInviteCode,
    checkInviteByCode,
    getInviteById,
  }
}

export { useInvite }
