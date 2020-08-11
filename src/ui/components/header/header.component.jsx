import React, { useState } from 'react'
import './header.style.scss'
import { LogoIcon, AccountsIcon, UserIcon } from 'app-icons'
import { Text } from '../text/text.component'
import { NotificationsTab } from './components'
import { CircleButton } from '../circle-button/circle-button.component'
import { noopFunction } from 'app-helpers'
import { useLoggedUser } from 'app-hooks'

const Header = () => {
  const [isNotificationsTabOpened, setIsNotificationsTabOpened] = useState(false)
  const [isProfileTabOpened, setIsProfileTabOpened] = useState(false)

  const { loggedUser } = useLoggedUser()

  const onNotificationsClick = () => {
    setIsNotificationsTabOpened(!isNotificationsTabOpened)
    setIsProfileTabOpened(false)
  }

  const renderHeaderActions = () => (
    <div className="header-actions-container">
      <NotificationsTab
        clicked={isNotificationsTabOpened}
        selected={isNotificationsTabOpened}
        onClick={onNotificationsClick}
      />

      <CircleButton onClick={noopFunction} variant="secondary" icon={<AccountsIcon />} />

      <div className="header-user-menu-container">
        <div>
          <Text variant="sans-serif">{loggedUser.name}</Text>
          <Text variant="sans-serif">{loggedUser.email}</Text>
        </div>
        <UserIcon className="header-user-icon" />
      </div>
    </div>
  )

  return (
    <div className="header-container">
      <div className="header-app-name-container">
        <LogoIcon className="header-logo-icon" />
        <Text variant="serif">Herança Digital Segura</Text>
      </div>

      {renderHeaderActions()}
    </div>
  )
}

export { Header }
