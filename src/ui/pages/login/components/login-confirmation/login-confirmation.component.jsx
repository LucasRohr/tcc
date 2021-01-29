import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Text, Form, Button } from 'app-components'
import { useLoggedUser, useRoute } from 'app-hooks'

import { useLoginConfirmation } from './login-confirmation.hook'

import './login-confirmation.style.scss'

const LoginConfirmation = ({ goBack }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const { renderFields, buildApiObject, sendToApi, isValid } = useLoginConfirmation()
  const { fetchUserInfo } = useLoggedUser()
  const { goToHome } = useRoute()

  const sendLogin = async () => {
    setErrorMessage('')

    const confirmationObject = buildApiObject()
    const result = await sendToApi(confirmationObject)

    if (!result || result?.error) {
      setErrorMessage(result?.error?.message)
    } else {
      const userId = result.id
      await fetchUserInfo(userId)
      goToHome()
    }
  }

  const renderFormButton = () => (
    <div className="login-confirmation-buttons-container">
      <Button onClick={goBack} variant="light">
        Voltar
      </Button>

      <Button type="submit" variant="primary">
        Validar
      </Button>
    </div>
  )

  return (
    <div className="login-confirmation-form-container">
      <Text variant="sans-serif">Digite o código de login recebido</Text>
      <Form onSubmit={sendLogin} buttons={renderFormButton} content={renderFields} isValid={isValid} />
      {errorMessage ? <Text className="login-confirmation-error-message">{errorMessage}</Text> : null}
    </div>
  )
}

LoginConfirmation.propTypes = {
  goBack: PropTypes.func,
}

export { LoginConfirmation }
