import React from 'react'
import PropTypes from 'prop-types'
import { Title, Text, Button } from 'app-components'
import { useModal, useLoggedUser, useOwner } from 'app-hooks'

import './remove-heir-modal-content.style.scss'
import { noopFunction } from 'app-helpers'

const RemoveHeirModalContent = ({ heirId, onRemove }) => {
  const { hideModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { removeHeir } = useOwner()

  const removeHeirAccount = async () => {
    const removeObject = {
      heirId,
      ownerId: loggedUser.currentAccount.id,
    }

    const result = await removeHeir(removeObject)

    if (result) {
      onRemove(heirId)
      hideModal()
    }
  }

  const renderButtons = () => (
    <div className="remove-heir-modal-content-buttons-container">
      <Button onClick={hideModal} variant="light">
        Cancelar
      </Button>
      <Button onClick={removeHeirAccount} variant="alert">
        Remover
      </Button>
    </div>
  )

  return (
    <div className="remove-heir-modal-content">
      <Title variant="sans-serif">Remover herdeiro</Title>
      <Text variant="serif">
        Tem certeza que deseja remover este herdeiro? Todos os vínculos de legado digital com ele serão inativados. Você pode
        adicionar esse herdeiro novamente depois.
      </Text>

      {renderButtons()}
    </div>
  )
}

RemoveHeirModalContent.defaultProps = {
  onConfirm: noopFunction,
}

RemoveHeirModalContent.propTypes = {
  heirId: PropTypes.number,
  onConfirm: PropTypes.func,
}

export { RemoveHeirModalContent }
