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
  const { get, post, put } = useRequest('/user-service')
  const [globalLoggedUser, setGlobalLoggedUser] = useGlobalLoggedUser()

  const removeLoggedUser = () => {
    removeToken()
    localStorage.removeItem('user_id')
    setGlobalLoggedUser(null)
  }

  const requestLoginToken = async (email, token) => {
    const result = await post('users/login-token-send', { email, token })
    return result !== undefined
  }

  const sendLoginToken = async loginToken => {
    return await post('users/login-token-validation', { loginToken })
  }

  const fetchUserInfo = async userId => {
    isFirstLoad = false

    const id = globalLoggedUser?.id || userId || localStorage.getItem('user_id')

    try {
      const response = await get(`users/user-info?user_id=${id}`, { useToast: false, useStateErrors: false })

      if (response) {
        localStorage.setItem('user_id', id)

        const { name, email, birthday, cpf, accounts } = response

        const currentAccount = accounts[0]

        const userModel = new User({
          id,
          name,
          email,
          birthday,
          cpf,
          accounts,
          currentAccount,
        })

        setGlobalLoggedUser(userModel)

        const currentAccountId = accounts[0] && accounts[0].id
        updateAccountChange(currentAccountId)
      }
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

  const setCurrentAccount = async account => {
    const loggedUser = { ...globalLoggedUser }

    loggedUser.currentAccount = account
    setGlobalLoggedUser(loggedUser)
    await updateAccountChange(account.id)
  }

  const updateAccountChange = async accountId => {
    if (accountId) {
      await put(`accounts/last-update?account_id=${accountId}`, {}, { useToast: false, useLoader: false })
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
    updateAccountChange,
    requestLoginToken,
    sendLoginToken,
  }
}

export { removeToken, useLoggedUser, LoggedUserProvider, useGlobalLoggedUser }
