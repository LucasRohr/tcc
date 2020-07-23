import { useEffect } from 'react'
import createGlobalState from 'react-create-global-state'
import { useRequest, tokenHelper } from '../api'
import { User } from 'app-models'

const [useGlobalLoggedUser, LoggedUserProvider] = createGlobalState()
let isFirstLoad = true

const saveToken = token => {
  tokenHelper.save(token)
}

const removeToken = () => {
  tokenHelper.delete()
}

const useLoggedUser = () => {
  const { get, put } = useRequest('/user')
  const [globalLoggedUser, setGlobalLoggedUser] = useGlobalLoggedUser()

  const removeLoggedUser = () => {
    removeToken()
    setGlobalLoggedUser(null)
  }

  const fetchUserInfo = async () => {
    isFirstLoad = false

    try {
      const { user, accounts } = await get('me', { useToast: false, useStateErrors: false })

      const userType = user.scope[0]

      const userModel = new User({
        ...user,
        accounts,
        userType,
      })

      //  TO DO: set user type permissions
      //   if (userType === roles.ADOPS) {
      //     userModel.adopsPermissions = await getPermissions()
      //   }

      setGlobalLoggedUser(userModel)

      const currentAccountId = accounts[0] && accounts[0].account.id
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
  })

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
  }
}

export { removeToken, useLoggedUser, LoggedUserProvider, useGlobalLoggedUser }
