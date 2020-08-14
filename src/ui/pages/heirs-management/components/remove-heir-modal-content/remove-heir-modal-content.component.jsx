import React from 'react'
import PropTypes from 'prop-types'
import { Title, Text, Button } from 'app-components'
import { useModal, useLoggedUser, useOwner } from 'app-hooks'

import './remove-heir-modal-content.style.scss'

const RemoveHeirModalContent = ({ heirId }) => {
  const { hideModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { removeHeir } = useOwner()

  const removeHeirAccount = async () => {
    const removeObject = {
      heirId,
      ownerId: loggedUser.currentAccount.id,
    }

    const result = await removeHeir(removeObject)
    hideModal()

    if (result) {
      return
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
        Tem certeza que deseja remover este herdeiro? Os vínculos de herança com essa pessoa serão inativados. Contando
        com a volta deste herdeiro, as heranças já estabelecidas voltarão para ele.
      </Text>

      {renderButtons()}
    </div>
  )
}

RemoveHeirModalContent.propTypes = {
  heirId: PropTypes.number,
}

export { RemoveHeirModalContent }
