import React, { useState } from 'react'
import { LogoIcon, AccountsIcon } from 'app-icons'
import { Text } from '../text/text.component'
import { useRoute } from 'app-hooks'
import { NotificationsTab, ProfileTab } from './components'
import { CircleButton } from '../circle-button/circle-button.component'

import './header.style.scss'

const Header = () => {
  const [isNotificationsTabOpened, setIsNotificationsTabOpened] = useState(false)
  const [isProfileTabOpened, setIsProfileTabOpened] = useState(false)

  const { goToHome, goToAccountsManagement } = useRoute()

  const onNotificationsClick = () => {
    setIsNotificationsTabOpened(!isNotificationsTabOpened)
    setIsProfileTabOpened(false)
  }

  const onProfileClick = () => {
    setIsProfileTabOpened(!isProfileTabOpened)
    setIsNotificationsTabOpened(false)
  }

  const renderHeaderActions = () => (
    <div className="header-actions-container">
      <NotificationsTab
        clicked={isNotificationsTabOpened}
        selected={isNotificationsTabOpened}
        onClick={onNotificationsClick}
      />

      <CircleButton onClick={goToAccountsManagement} variant="secondary" icon={<AccountsIcon />} />

      <ProfileTab onClick={onProfileClick} clicked={isProfileTabOpened} selected={isProfileTabOpened} />
    </div>
  )

  return (
    <div className="header-container">
      <div className="header-app-name-container" onClick={goToHome}>
        <LogoIcon className="header-logo-icon" />
        <Text variant="serif">Herança Digital Segura</Text>
      </div>

      {renderHeaderActions()}
    </div>
  )
}

export { Header }
