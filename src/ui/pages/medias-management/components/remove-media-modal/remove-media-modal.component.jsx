import React from 'react'
import PropTypes from 'prop-types'
import { Title, Text, Button } from 'app-components'
import { useModal, useOwner, useLoggedUser } from 'app-hooks'

import './remove-media-modal.style.scss'

const RemoveMediaModal = ({ mediaId }) => {
  const { hideModal } = useModal()
  const { removeMedia } = useOwner()
  const { loggedUser } = useLoggedUser()

  const removeOwnerMedia = async () => {
    const result = await removeMedia(loggedUser.currentAccount.id, mediaId)
    hideModal()

    if (result) {
      return
    }
  }

  const renderButtons = () => (
    <div className="remove-media-modal-buttons-container">
      <Button onClick={hideModal} variant="light">
        Cancelar
      </Button>
      <Button onClick={removeOwnerMedia} variant="alert">
        Remover
      </Button>
    </div>
  )

  return (
    <div className="remove-media-modal">
      <Title variant="sans-serif">Remover mídia</Title>
      <Text variant="serif">
        Tem certeza que deseja remover esta mídia? Ela será deletada de sua herança, devendo ser adicionada novamente,
        caso necessário.
      </Text>

      {renderButtons()}
    </div>
  )
}

RemoveMediaModal.propTypes = {
  mediaId: PropTypes.number,
}

export { RemoveMediaModal }
