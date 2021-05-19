import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'app-components'
import { useModal } from 'app-hooks'
import { ROLES } from 'app-constants'
import { ProfileRemoveModal } from '../profile-remove-modal/profile-remove-modal.component'
import { AccountEditForm } from '../account-edit-form/account-edit-form.component'

import './account-card.style.scss'

const ACCOUNT_TYPE_LABELS = {
  OWNER: 'Proprietária Digital',
  HEIR: 'Herdeira',
}

const HEIR_ACCOUNT_STATUS = {
  ACCEPTED: 'Selecionada para legado',
  ACTIVE: 'Legado recebido',
}

const CARD_CONTENTS = {
  DEFAULT: 'DEFAULT',
  EDIT_FORM: 'EDIT_FORM',
}

const ONE_HEIR = 1

const AccountCard = ({ name, accountType, heirStatus, totalHeirs }) => {
  const [currentCardContent, setCurrentCardContent] = useState(CARD_CONTENTS.DEFAULT)

  const { showModal } = useModal()

  const renderAccountInfo = () => {
    const renderAdditionalIndo = () => {
      if (accountType === ROLES.OWNER) {
        return (
          <Text className="profile-account-card-account" variant="sans-serif">
            <Text className="profile-account-card-text--highlight" variant="sans-serif">
              {totalHeirs}
            </Text>{' '}
            {totalHeirs === ONE_HEIR ? 'herdeiro' : 'herdeiros'}
          </Text>
        )
      }

      return (
        <Text className="profile-account-card-account" variant="sans-serif">
          Status da conta herdeira:{' '}
          <Text className="profile-account-card-text--highlight" variant="sans-serif">
            {HEIR_ACCOUNT_STATUS[heirStatus]}
          </Text>
        </Text>
      )
    }

    return (
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

          {renderAdditionalIndo()}
        </div>
      </div>
    )
  }

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

      <Button onClick={() => setCurrentCardContent(CARD_CONTENTS.EDIT_FORM)} variant="primary">
        Editar
      </Button>
    </div>
  )

  const renderDefaultContent = () => (
    <>
      {renderAccountInfo()}
      {renderRightContent()}
    </>
  )

  const cardContentOptions = useMemo(
    () => ({
      DEFAULT: {
        component: renderDefaultContent,
        props: {},
      },

      EDIT_FORM: {
        component: AccountEditForm,
        props: {
          initialData: { name },
          setCurrentCardContent,
        },
      },
    }),
    [name, accountType, heirStatus, totalHeirs]
  )

  const renderContent = () => {
    const CardComponent = cardContentOptions[currentCardContent].component
    const props = cardContentOptions[currentCardContent].props

    return <CardComponent {...props} />
  }

  return <div className="profile-account-card-container">{renderContent()}</div>
}

AccountCard.propTypes = {
  email: PropTypes.string,
  accountType: PropTypes.string,
  totalHeirs: PropTypes.number,
  heirStatus: PropTypes.string,
}

export { AccountCard }
