import React from 'react'
import PropTypes from 'prop-types'
import { Title, Button } from 'app-components'
import { useLoggedUser } from 'app-hooks'
import { usePasswordEditForm } from './password-edit-form.hook'

import './password-edit-form.style.scss'

const CARD_CONTENTS = {
  EDIT_FORM: 'EDIT_FORM',
  DEFAULT: 'DEFAULT',
}

const PasswordEditForm = ({ setCurrentCardContent }) => {
  const { renderPasswordForm, isValid, buildApiObject, sendToApi } = usePasswordEditForm()
  const { fetchUserInfo } = useLoggedUser()

  const showEditForm = () => {
    setCurrentCardContent(CARD_CONTENTS.EDIT_FORM)
  }

  const showDefaultContent = () => {
    setCurrentCardContent(CARD_CONTENTS.DEFAULT)
  }

  const updateUserInfo = async () => {
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
    <div className="password-edit-form-buttons-container">
      <Button variant="light" onClick={showEditForm}>
        Cancelar
      </Button>

      <Button variant="primary" onClick={updateUserInfo}>
        Atualizar
      </Button>
    </div>
  )

  return (
    <div className="password-edit-form-container">
      <Title variant="sans-serif">Edição de senha</Title>

      <div className="password-edit-form-content">
        <div className="password-edit-form-wrapper">{renderPasswordForm()}</div>
        {renderButtons()}
      </div>
    </div>
  )
}

PasswordEditForm.propTypes = {
  setCurrentCardContent: PropTypes.func.isRequired,
}

export { PasswordEditForm }
