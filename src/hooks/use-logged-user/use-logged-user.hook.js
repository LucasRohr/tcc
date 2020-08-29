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
  const { get, put } = useRequest('/user')
  const [globalLoggedUser, setGlobalLoggedUser] = useGlobalLoggedUser()
  const { getPermissions } = useUser()

  const removeLoggedUser = () => {
    removeToken()
    setGlobalLoggedUser(null)
  }

  const fetchUserInfo = async () => {
    isFirstLoad = false

    try {
      // const { user = {}, accounts } = await get('me', { useToast: false, useStateErrors: false })

      const user = {}
      const accounts = [
        { id: 1, type: 'HEIR', name: 'minha conta muito massa' },
        { id: 1, type: 'OWNER', name: 'minha conta muito massa' },
      ]
      user.id = 1
      user.name = 'Lucas Rohr Carreño'
      user.cpf = '00609555525'
      user.email = 'lucasrc17@live.com'
      user.birthday = '2001-08-13T03:00:00'
      user.accounts = [{ id: 1, type: 'OWNER', name: 'minha conta muito massa' }]

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
  }
}

export { removeToken, useLoggedUser, LoggedUserProvider, useGlobalLoggedUser }
