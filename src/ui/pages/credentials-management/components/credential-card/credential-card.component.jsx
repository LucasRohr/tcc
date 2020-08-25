import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button, Text, HeirsModal } from 'app-components'
import { noopFunction } from 'app-helpers'
import { HeirsManagementIcon } from 'app-icons'
import { useModal } from 'app-hooks'
import { useCredentialCard } from './credential-card.hook'
import { CredentialInfo } from '../credential-info/credential-info.component'

import './credential-card.style.scss'
import { RemoveCredentialModal } from '../remove-credential-modal/remove-credential-modal.component'

const CredentialCard = ({ credential, loadCredentials }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [heirs, setHeirs] = useState([])

  const { getMainFormFields, getExtraFormFields, isValid, buildApiObject, sendToApi } = useCredentialCard({
    initialData: isEditing ? credential : null,
  })

  const { showModal } = useModal()

  const getCredentialHeirsIds = async () => {
    const selectedHeirs = heirs.filter(heirItem => heirItem.isChecked)
    const heirsIds = selectedHeirs.maṕ(heirItem => heirItem.item.id)

    return heirsIds
  }

  const saveCredentialEdit = async () => {
    if (await isValid()) {
      const credentialObject = buildApiObject()
      credentialObject.heirs = getCredentialHeirsIds()
      const result = await sendToApi(credentialObject)

      if (result) {
        setViewMode()
        loadCredentials()
      }
    }
  }

  const setEditMode = () => {
    setIsEditing(true)
  }

  const setViewMode = () => {
    setIsEditing(false)
  }

  const showCredentialsHeirsModal = () => {
    showModal({
      content: <HeirsModal onConfirm={setHeirs} />,
    })
  }

  const showRemoveCredentialModal = () => {
    showModal({
      content: <RemoveCredentialModal credentialId={credential.id} />,
    })
  }

  const renderEditButtons = () => (
    <div className="credential-card-edit-buttons-container">
      <Button onClick={setViewMode} variant="light">
        Cancelar
      </Button>
      <Button onClick={saveCredentialEdit} variant="primary">
        Confirmar
      </Button>
    </div>
  )

  const renderViewButtons = () => (
    <div className="credential-card-view-buttons-container">
      <Button onClick={setEditMode} variant="primary">
        Editar
      </Button>

      <Button onClick={showRemoveCredentialModal} variant="alert">
        Remover
      </Button>

      <Button className="credential-card-heirs-button" onClick={showCredentialsHeirsModal} variant="light">
        <Text>Selecionar herdeiros</Text>
        <HeirsManagementIcon className="credential-card-heirs-icon" />
      </Button>
    </div>
  )

  const infoOptions = useMemo(
    () => [
      {
        text: credential.login,
        variant: 'DEFAULT',
      },

      {
        text: '',
        variant: 'PASSWORD',
      },

      {
        text: credential.link,
        variant: 'DEFAULT',
      },

      {
        text: credential.description,
        variant: 'AREA',
      },
    ],
    [credential]
  )

  const renderCredentialInfo = () => {
    const fields = infoOptions.map(({ text, variant }) => <CredentialInfo text={text} variant={variant} />)

    return <div className="credential-card-left-content-view">{fields}</div>
  }

  const renderLeftContent = () => {
    if (isEditing) {
      return getMainFormFields()
    }

    return renderCredentialInfo()
  }

  const renderRightContent = () => {
    if (isEditing) {
      return (
        <div>
          {getExtraFormFields()}
          {renderEditButtons()}
        </div>
      )
    }

    return <div className="credential-card-right-content-view">{renderViewButtons()}</div>
  }

  return (
    <div className="credential-card-container">
      <div className="credential-card-header">
        <Text variant="sans-serif">{credential.name}</Text>
      </div>

      <div className="credential-card-content-wrapper">
        <div className="credential-card-content">{renderLeftContent()}</div>

        <div className="credential-card-content">{renderRightContent()}</div>
      </div>
    </div>
  )
}

CredentialCard.propTypes = {
  credential: PropTypes.object.isRequired,
  loadCredentials: PropTypes.func,
}

export { CredentialCard }
