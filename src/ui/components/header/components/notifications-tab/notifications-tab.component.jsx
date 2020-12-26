import React, { useMemo } from 'react'
import { NotificationsIcon, ReadNotificationIcon, UnreadNotificationIcon } from 'app-icons'
import { useNotification, useRoute } from 'app-hooks'
import { Dropbox } from '../../../dropbox/dropbox.component'
import { Text } from '../../../text/text.component'
import { CircleButton } from '../../../circle-button/circle-button.component'

import './notifications-tab.style.scss'

const NotificationsTab = ({ clicked, selected, onClick }) => {
  const { notifications, markNotificationAsRead } = useNotification()

  const { goToHeirInvites, goToHeirsManagement, goToHome } = useRoute()

  const notificationClickOptions = useMemo(
    () => ({
      HEIR_INVITE: goToHeirInvites,

      ACCEPTED_HEIR_INVITE: goToHeirsManagement,

      ACTIVATED_HERITAGE: goToHome,

      HEIR_DISINHERITANCE: goToHome,
    }),
    []
  )

  const handleNotificationClick = async ({ id, type, read }) => {
    if (!read) {
      await markNotificationAsRead(id)

      const clickAction = notificationClickOptions[type]
      clickAction()
    }
  }

  const renderContent = () => {
    const renderNotifications = () =>
      notifications.map(({ read, message, id, type }, key) => (
        <div className="notification-option" onClick={() => handleNotificationClick({ id, type, read })} key={key}>
          <div className={read ? 'notification-read' : 'notification-unread'}>
            <div className="notification-option-icon-container">
              {read ? (
                <ReadNotificationIcon className="notification-option-icon" />
              ) : (
                <UnreadNotificationIcon className="notification-option-icon" />
              )}
            </div>

            <Text>{message}</Text>
          </div>
        </div>
      ))

    if (notifications.length) {
      return <div className="notifications-scroll-area">{renderNotifications()}</div>
    }

    return (
      <div className="notifications-empty-container">
        <NotificationsIcon className="notifications-empty-icon" />
        <Text>Você ainda não possui notificações.</Text>
      </div>
    )
  }

  const renderNotificationsCounter = () => {
    const counter = notifications.filter(notification => !notification.read).length

    return counter ? <div className="notifications-counter"> {counter} </div> : null
  }

  return (
    <Dropbox
      additionalClass="notifications-dropbox-wrapper"
      isCircleButton
      clicked={clicked}
      toggleOpen={onClick}
      isOpen={selected}
    >
      <Dropbox.Button>
        <CircleButton
          className="notification-circle-button-wrapper"
          variant="secondary"
          onClick={onClick}
          icon={<NotificationsIcon />}
        >
          {renderNotificationsCounter()}
        </CircleButton>
      </Dropbox.Button>

      <Dropbox.Content children={renderContent()} />
    </Dropbox>
  )
}

export { NotificationsTab }
