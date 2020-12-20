import React, { useMemo } from 'react'
import { UserIcon } from 'app-icons'
import { useLoggedUser, useRoute } from 'app-hooks'
import { Text } from '../../../text/text.component'
import { Dropbox } from '../../../dropbox/dropbox.component'
import { noopFunction } from 'app-helpers'

import './profile-tab.style.scss'

const ProfileTab = ({ clicked, selected, onClick }) => {
  const { loggedUser, removeLoggedUser, updateAccountChange } = useLoggedUser()
  const { goToProfile } = useRoute()

  const renderButtonBody = () => (
    <div className="header-profile-tab-container">
      <div>
        <Text variant="sans-serif">{loggedUser.name}</Text>
        <Text variant="sans-serif">{loggedUser.email}</Text>
      </div>
      <UserIcon className="header-user-icon" />
    </div>
  )

  const logoutUser = () => {
    updateAccountChange(loggedUser.currentAccount.id)
    removeLoggedUser()
  }

  const profileOptions = useMemo(
    () => [
      {
        label: 'Perfil',
        onClick: goToProfile,
      },

      {
        label: 'Termos de uso',
        onClick: noopFunction,
      },

      {
        label: 'Sair',
        onClick: logoutUser,
      },
    ],
    []
  )

  const renderContent = () => (
    <div className="header-profile-tab-content">
      {profileOptions.map(option => (
        <div onClick={option.onClick}>
          <Text> {option.label} </Text>
        </div>
      ))}
    </div>
  )

  return (
    <Dropbox clicked={clicked} toggleOpen={onClick} isOpen={selected}>
      <Dropbox.Button>{renderButtonBody()}</Dropbox.Button>
      <Dropbox.Content children={renderContent()} />
    </Dropbox>
  )
}

export { ProfileTab }
