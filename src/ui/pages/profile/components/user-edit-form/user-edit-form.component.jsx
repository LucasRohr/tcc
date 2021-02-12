import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useUserEditForm } from './user-edit-form.hook'
import { Title, Button } from 'app-components'
import { useLoggedUser, useTimeout, useWindowSize } from 'app-hooks'

import './user-edit-form.style.scss'

const CARD_CONTENTS = {
  PASSWORD_FORM: 'PASSWORD_FORM',
  DEFAULT: 'DEFAULT',
}

const MOBILE_SIZE_MIN_WIDTH = 750

const UserEditForm = ({ initialData, setCurrentCardContent }) => {
  const { renderEditForm, isValid, buildApiObject, sendToApi } = useUserEditForm({ initialData })
  const { fetchUserInfo } = useLoggedUser()

  const { getDebounce } = useTimeout()
  const { windowSize } = useWindowSize()

  const debounce = useMemo(getDebounce, [])
  const isMobileSize = windowSize.width <= MOBILE_SIZE_MIN_WIDTH

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

        debounce(() => {
          fetchUserInfo()
        }, 3000)
      }
    }
  }

  const renderPasswordEditButton = () => (
    <Button className="user-edit-form-password-button" variant="light" onClick={showPasswordForm}>
      Editar senha
    </Button>
  )

  const renderButtons = () => (
    <div className="user-edit-form-buttons-container">
      {!isMobileSize ? renderPasswordEditButton() : null}

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

  const renderTopContent = () => {
    if (isMobileSize) {
      return renderPasswordEditButton()
    }

    return <Title variant="sans-serif">Edição de usuário</Title>
  }

  return (
    <div className="user-edit-form-container">
      {renderTopContent()}

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
