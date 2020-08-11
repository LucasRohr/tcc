import React from 'react'
import { NotificationsIcon, ReadNotificationIcon, UnreadNotificationIcon } from 'app-icons'
import { useNotification } from 'app-hooks'
import { NOTIFICATION_STATUS } from 'app-constants'
import { Dropbox } from '../../../dropbox/dropbox.component'
import { Text } from '../../../text/text.component'
import { CircleButton } from '../../../circle-button/circle-button.component'

import './notifications-tab.style.scss'

const NotificationsTab = ({ clicked, selected, onClick }) => {
  const { notifications } = useNotification()

  const handleNotificationClick = id => {}

  const renderContent = () => {
    const mappedNotifications = () =>
      notifications.map(({ status, message, id }, key) => {
        const read = status === NOTIFICATION_STATUS.READ

        return (
          <div className="notification-option" onClick={() => handleNotificationClick(id)} key={key}>
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
        )
      })

    if (notifications.length) {
      return <div className="notifications-scroll-area">{mappedNotifications()}</div>
    }

    return (
      <div className="notifications-empty-container">
        <NotificationsIcon className="notifications-empty-icon" />
        <Text>Você ainda não possui notificações.</Text>
      </div>
    )
  }

  const renderNotificationsCounter = () => {
    const counter = notifications.filter(notification => notification.status === NOTIFICATION_STATUS.NEW).length

    return counter ? <div className="notifications-counter">{counter}</div> : null
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
