import React from 'react'
import PropTypes from 'prop-types'
import { Title, Text, Button } from 'app-components'
import { useModal, useMedia, useToastAlert } from 'app-hooks'

import './remove-media-modal.style.scss'

const RemoveMediaModal = ({ mediaId, mediaType, loadMedias }) => {
  const { hideModal } = useModal()
  const { removeMedia } = useMedia({ mediaType })
  const { showSuccessToastAlert } = useToastAlert()

  const removeOwnerMedia = async () => {
    const result = await removeMedia(mediaId)
    hideModal()

    if (result) {
      await loadMedias()
      showSuccessToastAlert('Mídia removida com sucesso.')
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
  mediaType: PropTypes.string,
  loadMedias: PropTypes.func,
}

export { RemoveMediaModal }
