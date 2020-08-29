import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'app-components'
import { DateHelper } from 'app-helpers'
import { DATE_FORMAT } from 'app-constants'
import { UserIcon } from 'app-icons'
import { CPFFormatter } from 'app-formatters'
import { useModal } from 'app-hooks'
import { ProfileRemoveModal } from '../profile-remove-modal/profile-remove-modal.component'

import './user-card.style.scss'

const UserCard = ({ email, cpf, name, accountsTotal, birthday }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { showModal } = useModal()

  const renderUserInfo = () => (
    <div className="profile-user-card-info-container">
      <Text className="profile-user-card-text--light" variant="sans-serif">
        Dados de usuário
      </Text>

      <div className="profile-user-card-middle-content">
        <div>
          <Text variant="sans-serif">{name}</Text>
          <Text variant="sans-serif">{email}</Text>
          <Text variant="sans-serif">{CPFFormatter(cpf)}</Text>
        </div>

        <Text className="profile-user-card-account" variant="sans-serif">
          <Text className="profile-user-card-text--highlight" variant="sans-serif">
            {accountsTotal}
          </Text>{' '}
          contas criadas
        </Text>
      </div>

      <Text className="profile-user-card-text--light" variant="sans-serif">
        Nascimento: <Text>{DateHelper.fromUTC(birthday).format(DATE_FORMAT)}</Text>
      </Text>
    </div>
  )

  const showRemoveUserModal = () => {
    showModal({
      content: <ProfileRemoveModal isRemovingUser />,
    })
  }

  const renderRightContent = () => (
    <div className="profile-user-card-right-content">
      <UserIcon className="profile-user-card-icon" />

      <div className="profile-user-card-buttons-container">
        <Button onClick={showRemoveUserModal} variant="alert">
          Deletar usuário
        </Button>

        <Button onClick={() => setIsEditing(true)} variant="primary">
          Editar
        </Button>
      </div>
    </div>
  )

  return (
    <div className="profile-user-card-container">
      {renderUserInfo()}
      {renderRightContent()}
    </div>
  )
}

UserCard.defaultProps = {
  accountsTotal: 0,
}

UserCard.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  cpf: PropTypes.string,
  accountsTotal: PropTypes.number,
  heirsTotal: PropTypes.number,
  birthday: PropTypes.object,
}

export { UserCard }
