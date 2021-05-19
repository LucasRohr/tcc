import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Text, CreateOwnerModalContent, Button } from 'app-components'
import { useModal, useRoute } from 'app-hooks'
import { PlusIcon, AccountsIcon } from 'app-icons'

import './disinherited-card.style.scss'

const DisinheritedCard = ({ ownerName, hasOwnerAccount, hasOtherAccounts }) => {
  const { goToAccountsManagement } = useRoute()
  const { showModal } = useModal()

  const title = useMemo(() => `Esta conta foi retirada do legado de ${ownerName}`, [ownerName])

  const description = useMemo(
    () => `Esta conta herdeira foi removida do legado do proprietário digital dela: ${ownerName}`,
    [ownerName]
  )

  const renderCreateOwnerModal = () => {
    showModal({
      content: <CreateOwnerModalContent />,
    })
  }

  const renderOwnerButton = () => (
    <Button onClick={renderCreateOwnerModal} variant="primary">
      <Text>Criar conta proprietária</Text>
      <PlusIcon className="disinherited-card-owner-button-icon" />
    </Button>
  )

  const renderAccountsButton = () => (
    <Button onClick={goToAccountsManagement} variant="primary">
      <Text>Ver minhas contas</Text>
      <AccountsIcon className="disinherited-card-owner-button-icon" />
    </Button>
  )

  const renderButtons = () => {
    const hasAccountsWithoutOwner = hasOtherAccounts && !hasOwnerAccount

    if (hasOwnerAccount) {
      return renderAccountsButton()
    }

    if (hasAccountsWithoutOwner) {
      return (
        <>
          {renderAccountsButton()}
          {renderOwnerButton()}
        </>
      )
    }

    return renderOwnerButton()
  }

  const getAvailableActionsMessage = () => {
    const hasAccountsWithoutOwner = hasOtherAccounts && !hasOwnerAccount

    if (hasOwnerAccount) {
      return 'Você ainda pode utilizar de nossos serviços sem problema! Podendo gerenciar sua conta proprietária, navegar entre suas contas existentes e aceitar novos convites de herdeiro.'
    }

    if (hasAccountsWithoutOwner) {
      return 'Você ainda pode utilizar de nossos serviços sem problema! Podendo criar sua própria conta proprietária, navegar entre suas contas existentes e aceitar novos convites de herdeiro.'
    }

    return 'Você ainda pode utilizar de nossos serviços sem problema! Podendo criar sua própria conta proprietária e aceitar novos convites de herdeiro.'
  }

  return (
    <div className="disinherited-card-container">
      <Text className="disinherited-card-title" variant="sans-serif">
        {title}
      </Text>
      <Text className="disinherited-card-description" variant="serif">
        {description}
      </Text>
      <Text className="disinherited-card-description" variant="serif">
        {getAvailableActionsMessage()}
      </Text>

      <div className="disinherited-card-buttons">{renderButtons()}</div>
    </div>
  )
}

DisinheritedCard.propTypes = {
  ownerName: PropTypes.string,
  hasOwnerAccount: PropTypes.bool,
  hasOtherAccounts: PropTypes.bool,
}

export { DisinheritedCard }
