import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'app-components'
import { useModal } from 'app-hooks'
import { ProfileRemoveModal } from '../profile-remove-modal/profile-remove-modal.component'

import './account-card.style.scss'

const ACCOUNT_TYPE_LABELS = {
  OWNER: 'Proprietária Digital',
  HEIR: 'Herdeira',
}

const AccountCard = ({ name, accountType, heirsTotal }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { showModal } = useModal()

  const renderAccountInfo = () => (
    <div className="profile-account-card-info-container">
      <Text className="profile-account-card-text--light" variant="sans-serif">
        Dados de conta
      </Text>

      <div className="profile-account-card-content">
        <Text variant="sans-serif">{name}</Text>

        <Text variant="sans-serif">
          Tipo de conta:{' '}
          <Text className="profile-account-card-text--highlight" variant="sans-serif">
            {ACCOUNT_TYPE_LABELS[accountType]}
          </Text>
        </Text>

        <Text className="profile-account-card-account" variant="sans-serif">
          <Text className="profile-account-card-text--highlight" variant="sans-serif">
            {heirsTotal}
          </Text>{' '}
          herdeiros
        </Text>
      </div>
    </div>
  )

  const showRemoveAccountModal = () => {
    showModal({
      content: <ProfileRemoveModal />,
    })
  }

  const renderRightContent = () => (
    <div className="profile-account-card-right-content">
      <Button onClick={showRemoveAccountModal} variant="alert">
        Deletar conta
      </Button>

      <Button onClick={() => setIsEditing(true)} variant="primary">
        Editar
      </Button>
    </div>
  )

  return (
    <div className="profile-account-card-container">
      {renderAccountInfo()}
      {renderRightContent()}
    </div>
  )
}

AccountCard.propTypes = {
  email: PropTypes.string,
  accountType: PropTypes.string,
  heirsTotal: PropTypes.number,
}

export { AccountCard }
