import React from 'react'
import PropTypes from 'prop-types'
import './login-confirmation.style.scss'
import { useLoginConfirmation } from './login-confirmation.hook'
import { Text, Form, Button } from 'app-components'
import { useLoggedUser } from 'app-hooks'

const LoginConfirmation = ({ goBack }) => {
  const { renderFields, buildApiObject, sendToApi, isValid } = useLoginConfirmation()
  const { fetchUserInfo } = useLoggedUser()

  const sendLogin = async () => {
    const confirmationObject = buildApiObject()
    const result = await sendToApi(confirmationObject)

    if (result) {
      const userId = result.id
      fetchUserInfo(userId)
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
    </div>
  )
}

LoginConfirmation.propTypes = {
  goBack: PropTypes.func,
}

export { LoginConfirmation }
