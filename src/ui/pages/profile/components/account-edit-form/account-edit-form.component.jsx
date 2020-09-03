import React from 'react'
import PropTypes from 'prop-types'
import { Title, Button } from 'app-components'
import { useLoggedUser } from 'app-hooks'
import { useAccountEditForm } from './account-edit-form.hook'

import './account-edit-form.style.scss'

const DEFAULT_CONTENT = 'DEFAULT'

const AccountEditForm = ({ initialData, setCurrentCardContent }) => {
  const { renderEditForm, isValid, buildApiObject, sendToApi } = useAccountEditForm({ initialData })
  const { fetchUserInfo } = useLoggedUser()

  const showDefaultContent = () => {
    setCurrentCardContent(DEFAULT_CONTENT)
  }

  const updateAccountInfo = async () => {
    if (await isValid()) {
      const updateObject = buildApiObject()
      const result = await sendToApi(updateObject)

      if (result) {
        showDefaultContent()
        fetchUserInfo()
      }
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

  return (
    <div className="account-edit-form-container">
      <Title variant="sans-serif">Edição de conta</Title>

      <div className="account-edit-form-content">
        <div className="account-edit-form-wrapper">{renderEditForm()}</div>
        {renderButtons()}
      </div>
    </div>
  )
}

AccountEditForm.propTypes = {
  setCurrentCardContent: PropTypes.func.isRequired,
}

export { AccountEditForm }
