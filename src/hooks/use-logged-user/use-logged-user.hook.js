import { useEffect } from 'react'
import createGlobalState from 'react-create-global-state'
import { useRequest, tokenHelper } from '../api'
import { User } from 'app-models'
import { useUser } from '../api'

const [useGlobalLoggedUser, LoggedUserProvider] = createGlobalState()
let isFirstLoad = true

const saveToken = token => {
  tokenHelper.save(token)
}

const removeToken = () => {
  tokenHelper.delete()
}

const useLoggedUser = () => {
  const { get, post, put } = useRequest('/user-service/users')
  const [globalLoggedUser, setGlobalLoggedUser] = useGlobalLoggedUser()
  const { getPermissions } = useUser()

  const removeLoggedUser = () => {
    removeToken()
    setGlobalLoggedUser(null)
  }

  const requestLoginToken = async (email, token) => {
    const result = await post('login-token-send', { email, token })
    return result !== undefined
  }

  const sendLoginToken = async loginToken => {
    return await post('login-token-validation', { loginToken })
  }

  const fetchUserInfo = async userId => {
    isFirstLoad = false

    const id = (globalLoggedUser && globalLoggedUser.id) || userId

    try {
      const { user = {}, accounts } = await get(`user-info?user_id=${id}`, { useToast: false, useStateErrors: false })

      const currentAccount = user.accounts[0]

      const userModel = new User({
        ...user,
        accounts,
        currentAccount,
      })

      userModel.currentAccount.permissions = await getPermissions(currentAccount.id)

      setGlobalLoggedUser(userModel)

      const currentAccountId = accounts[0] && accounts[0].id
      updateLastAccess(currentAccountId)
    } catch (error) {
      removeLoggedUser()
    }
  }

  const setLoggedUser = user => {
    saveToken(user.accessToken)
    fetchUserInfo()
  }

  useEffect(() => {
    if (!globalLoggedUser && isFirstLoad) {
      fetchUserInfo()
    }
  }, [])

  const setCurrentAccount = account => {
    const loggedUser = { ...globalLoggedUser }

    loggedUser.currentAccount = account
    setGlobalLoggedUser(loggedUser)
  }

  const updateLastAccess = async accountId => {
    if (accountId) {
      await put(`account/${accountId}/last-access`)
    }
  }

  return {
    loggedUser: globalLoggedUser,
    removeLoggedUser,
    setCurrentAccount,
    setLoggedUser,
    fetchUserInfo,
    removeToken,
    saveToken,
    updateLastAccess,
    requestLoginToken,
    sendLoginToken,
  }
}

export { removeToken, useLoggedUser, LoggedUserProvider, useGlobalLoggedUser }
