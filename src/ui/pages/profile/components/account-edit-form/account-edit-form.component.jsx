import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Title, Button, CryptoPasswordModalContent } from 'app-components'
import { useLoggedUser, useModal } from 'app-hooks'
import { useAccountEditForm } from './account-edit-form.hook'
import { HelpIcon } from 'app-icons'

import './account-edit-form.style.scss'

const DEFAULT_CONTENT = 'DEFAULT'

const AccountEditForm = ({ initialData, setCurrentCardContent }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const { renderEditForm, isValid, buildApiObject, sendToApi } = useAccountEditForm({ initialData })
  const { fetchUserInfo } = useLoggedUser()
  const { showModal, hideModal } = useModal()

  const showDefaultContent = () => {
    setCurrentCardContent(DEFAULT_CONTENT)
  }

  const updateAccountInfo = async () => {
    const isFormValid = await isValid()
    if (isFormValid) {
      const updateObject = buildApiObject()
      const result = await sendToApi(updateObject)

      if (result) {
        if (updateObject.cryptoPassword.length) {
          localStorage.setItem('cryptoPassword', updateObject.cryptoPassword)
        }
        showDefaultContent()
        await fetchUserInfo()
      }
    }

    if (isFormValid === 0) {
      setErrorMessage('As senhas não conferem')
    }
  }

  const renderButtons = () => (
    <div className="account-edit-form-buttons-container">
      <Button variant="light" onClick={showDefaultContent}>
        Cancelar
      </Button>

      <Button variant="primary" onClick={updateAccountInfo}>
        Atualizar
      </Button>
    </div>
  )

  const renderHelpModal = () => {
    const renderContent = () => (
      <CryptoPasswordModalContent onClick={hideModal} />
    )

    showModal({
      content: renderContent(),
    })
  }

  return (
    <div className="account-edit-form-container">
      <Title variant="sans-serif">Edição de conta</Title>

      <div className="account-edit-form-content">
        <div>
          <div className="account-edit-form-wrapper">
            <div>
              {renderEditForm()}
            </div>
            <Button onClick={renderHelpModal}>
              <HelpIcon />
            </Button>
          </div>
          {errorMessage && <span className="account-edit-error-message">{errorMessage}</span>}
        </div>
        {renderButtons()}
      </div>
    </div>
  )
}

AccountEditForm.propTypes = {
  setCurrentCardContent: PropTypes.func.isRequired,
}

export { AccountEditForm }
