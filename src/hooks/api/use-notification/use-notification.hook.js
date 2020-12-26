import { useState, useEffect, useMemo } from 'react'
import { useLoggedUser, useTimeout, useRequest } from 'app-hooks'

const useNotification = () => {
  const [notifications, setNotifications] = useState([])

  const { loggedUser } = useLoggedUser()
  const { getDebounce } = useTimeout()
  const { get, put } = useRequest('/notification-service')

  const debounce = useMemo(getDebounce, [])

  const getAccountNotifications = async () => {
    const accountId = loggedUser.currentAccount.id
    const result = await get(`account-notifications?account_id=${accountId}`, {
      useLoader: false,
      useToast: false,
    })

    if (result) {
      setNotifications(result)

      debounce(() => {
        getAccountNotifications()
      }, 20000)
    }
  }

  useEffect(() => {
    getAccountNotifications()
  }, [])

  const markNotificationAsRead = async notificationId => {
    const result = await put(
      `notification-read?notification_id=${notificationId}`,
      {},
      {
        useLoader: false,
        useToast: false,
      }
    )

    return result !== undefined
  }

  return {
    notifications,
    markNotificationAsRead,
  }
}

export { useNotification }
