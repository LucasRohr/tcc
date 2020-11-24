import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Text, HeirsModal } from 'app-components'
import { HeirsManagementIcon } from 'app-icons'
import { useModal, useCredential, useLoggedUser, useToastAlert, useTimeout } from 'app-hooks'
import { noopFunction } from 'app-helpers'
import { useCredentialCard } from './credential-card.hook'
import { CredentialInfo } from '../credential-info/credential-info.component'
import { RemoveCredentialModal } from '../remove-credential-modal/remove-credential-modal.component'

import './credential-card.style.scss'

const CredentialCard = ({ credential, loadCredentials, isHeirAccount }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isFirstInteraction, setIsFirstInteraction] = useState(true)
  const [credentialPassword, setCredentialPassword] = useState('')

  const { getOwnerHeritageCredentialPassword, getAllHeirsForCredential, updateCredentialHeirs } = useCredential()
  const { showModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { showSuccessToastAlert } = useToastAlert()

  const { getMainFormFields, getExtraFormFields, isValid, buildApiObject, sendToApi } = useCredentialCard({
    initialData: isEditing ? { ...credential, password: credentialPassword } : null,
  })

  const { getDebounce } = useTimeout()
  const debounce = useMemo(getDebounce, [])

  useEffect(() => {
    if (isEditing) {
      getCredentialPassword()
    }
  }, [isEditing])

  const loadCredentialsWithDebounce = () => {
    debounce(() => {
      loadCredentials()
    }, 3000)
  }

  const getCredentialPassword = async () => {
    if (isFirstInteraction) {
      const result = await getOwnerHeritageCredentialPassword(loggedUser.currentAccount.id, credential.credentialId)

      if (result) {
        setIsFirstInteraction(false)
        setCredentialPassword(result)
      }

      return true
    }

    return true
  }

  const saveCredentialEdit = async () => {
    if (await isValid()) {
      const credentialObject = buildApiObject()
      credentialObject.heirsIds = credential.heirsIds

      const result = await sendToApi(credentialObject)

      if (result) {
        loadCredentialsWithDebounce()
        setViewMode()
      }
    }
  }

  const setEditMode = () => {
    setIsEditing(true)
  }

  const setViewMode = () => {
    setIsEditing(false)
  }

  const getAvailableHeirs = async () => {
    const result = await getAllHeirsForCredential(loggedUser.currentAccount.id, credential.credentialId)

    if (result && result.length) {
      return result
    }
  }

  const mapHeirs = heirsList => heirsList.map(heirItem => ({ item: heirItem, itemCheck: heirItem.hasItem }))

  const getSelectedHeirsId = selectedHeirs => {
    const selectedHeirsFiltered = selectedHeirs.filter(heirItem => heirItem.itemCheck)
    const heirsIds = selectedHeirsFiltered.map(heirItem => heirItem.item.id)

    return heirsIds
  }

  const saveCredentialHeirs = async selectedHeirs => {
    const heirsIds = getSelectedHeirsId(selectedHeirs)
    const { credentialId, credentialOwnerId } = credential

    const credentialObject = {
      credentialId,
      heirsIds,
      ownerId: credentialOwnerId,
    }

    const result = await updateCredentialHeirs(credentialObject)

    if (result) {
      loadCredentialsWithDebounce()
      showSuccessToastAlert('Herdeiros atualizados com sucesso.')
    }
  }

  const showCredentialsHeirsModal = () => {
    showModal({
      content: <HeirsModal onConfirm={saveCredentialHeirs} mapHeirs={mapHeirs} getHeirs={getAvailableHeirs} />,
    })
  }

  const showRemoveCredentialModal = () => {
    showModal({
      content: <RemoveCredentialModal credential={credential} loadCredentials={loadCredentialsWithDebounce} />,
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
        text: credentialPassword,
        variant: 'PASSWORD',
        getCredentialPassword,
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
    [credential, credentialPassword, getCredentialPassword]
  )

  const renderCredentialInfo = () => {
    const fields = infoOptions.map(({ text, variant, getCredentialPassword }) => (
      <CredentialInfo text={text} variant={variant} getCredentialPassword={getCredentialPassword} />
    ))

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

        {!isHeirAccount ? <div className="credential-card-content">{renderRightContent()}</div> : null}
      </div>
    </div>
  )
}

CredentialCard.defaultProps = {
  loadCredentials: noopFunction,
  isHeirAccount: false,
}

CredentialCard.propTypes = {
  credential: PropTypes.object.isRequired,
  loadCredentials: PropTypes.func,
  isHeirAccount: PropTypes.bool,
}

export { CredentialCard }
