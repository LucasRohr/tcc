import React from 'react'
import PropTypes from 'prop-types'
import { Title, Text, Button } from 'app-components'
import { useModal, useCredential, useToastAlert, useLoading } from 'app-hooks'

import './remove-credential-modal.style.scss'

const RemoveCredentialModal = ({ credential, loadCredentials }) => {
  const { hideModal } = useModal()
  const { removeCredential } = useCredential()
  const { showSuccessToastAlert } = useToastAlert()
  const { showLoading } = useLoading()

  const removeOwnerCredential = async () => {
    const removeObject = {
      ownerId: credential.credentialOwnerId,
      credentialId: credential.credentialId,
      cryptoPassword: localStorage.getItem('cryptoPassword')
    }

    const result = await removeCredential(removeObject)
    hideModal()

    if (result) {
      showLoading()

      loadCredentials({
        additionalTime: 6000,
        onLoad: () => {
          showSuccessToastAlert('Credencial removida com sucesso.')
        }
      })
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
        Tem certeza que deseja remover esta credencial? Este item será
        apagado em seu legado. Você pode adicioná-lo novamente caso desejar,
        basta criar a credencial novamente.
      </Text>

      {renderButtons()}
    </div>
  )
}

RemoveCredentialModal.propTypes = {
  credentialId: PropTypes.number,
}

export { RemoveCredentialModal }
