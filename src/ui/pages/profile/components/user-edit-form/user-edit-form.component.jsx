import React from 'react'
import PropTypes from 'prop-types'
import { useUserEditForm } from './user-edit-form.hook'
import { Title, Button } from 'app-components'
import { useLoggedUser } from 'app-hooks'

import './user-edit-form.style.scss'

const CARD_CONTENTS = {
  PASSWORD_FORM: 'PASSWORD_FORM',
  DEFAULT: 'DEFAULT',
}

const UserEditForm = ({ initialData, setCurrentCardContent }) => {
  const { renderEditForm, isValid, buildApiObject, sendToApi } = useUserEditForm({ initialData })
  const { fetchUserInfo } = useLoggedUser()

  const showPasswordForm = () => {
    setCurrentCardContent(CARD_CONTENTS.PASSWORD_FORM)
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
    <div className="user-edit-form-buttons-container">
      <Button variant="light" onClick={showPasswordForm}>
        Editar senha
      </Button>

      <div className="user-edit-form-update-buttons">
        <Button variant="light" onClick={showDefaultContent}>
          Cancelar
        </Button>

        <Button variant="primary" onClick={updateUserInfo}>
          Atualizar
        </Button>
      </div>
    </div>
  )

  return (
    <div className="user-edit-form-container">
      <Title variant="sans-serif">Edição de usuário</Title>

      <div className="user-edit-form-content">
        <div className="user-edit-form-wrapper">{renderEditForm()}</div>
        {renderButtons()}
      </div>
    </div>
  )
}

UserEditForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  setCurrentCardContent: PropTypes.func.isRequired,
}

export { UserEditForm }
