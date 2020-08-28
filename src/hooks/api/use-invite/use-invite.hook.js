import { useRequest } from '../use-request/use-request.hook'

const useInvite = () => {
  const { get, put } = useRequest('/invite-service')

  const getAllHeirInvites = async userId => {
    return await get(`user/${userId}/heir-invites`)
  }

  const respondInvite = async ({ inviteId, isAccepting }) => {
    return await put(`invites/${inviteId}/respond/${isAccepting}`)
  }

  return {
    getAllHeirInvites,
    respondInvite,
  }
}

export { useInvite }
