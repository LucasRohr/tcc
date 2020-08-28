import React from 'react'
import PropTypes from 'prop-types'
import { Title, Text, Button } from 'app-components'
import { useModal, useCredential, useLoggedUser } from 'app-hooks'

import './remove-credential-modal.style.scss'

const RemoveCredentialModal = ({ credentialId }) => {
  const { hideModal } = useModal()
  const { removeCredential } = useCredential()
  const { loggedUser } = useLoggedUser()

  const removeOwnerCredential = async () => {
    const result = await removeCredential(loggedUser.currentAccount.id, credentialId)
    hideModal()

    if (result) {
      return
    }
  }

  const renderButtons = () => (
    <div className="remove-credential-modal-buttons-container">
      <Button onClick={hideModal} variant="light">
        Cancelar
      </Button>
      <Button onClick={removeOwnerCredential} variant="alert">
        Remover
      </Button>
    </div>
  )

  return (
    <div className="remove-credential-modal">
      <Title variant="sans-serif">Remover credencial</Title>
      <Text variant="serif">
        Tem certeza que deseja remover esta credencial? Seus dados permenecerão em segurança conosco, mas este item será
        inativado em sua herança. Você deve adicioná-lo novamente caso preciso.
      </Text>

      {renderButtons()}
    </div>
  )
}

RemoveCredentialModal.propTypes = {
  credentialId: PropTypes.number,
}

export { RemoveCredentialModal }
