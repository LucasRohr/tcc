import React, { useState } from 'react';

import { useModal } from 'app-hooks'
import { useCryptoPasswordValidation } from './crypto-password-validation-modal.hook';

import './crypto-password-validation-modal.style.scss'
import { Button, Form, Text, Title } from 'app-components';

const CryptoPasswordValidationModalContent = () => {
  const [errorMessage, setErrorMessage] = useState('')
  
  const { hideModal } = useModal()
  const { renderFields, buildApiObject, isValid, sendToApi } = useCryptoPasswordValidation()

  const validateCryptoPassword = async () => {
    setErrorMessage('')

    const validationObject = buildApiObject()
    const result = await sendToApi(validationObject)

    if (!result || result?.error) {
      setErrorMessage(result?.error?.message)
    } else {
      if (result.valid) {
        localStorage.setItem('cryptoPassword', validationObject.cryptoPassword)
        hideModal()
      } else {
        setErrorMessage('Senha de segurança inválida. Tente novamente')
      }
    }
  }

  const renderErrorMessage = () => (
    errorMessage ? <Text className="crypto-password-validation-error-message">{errorMessage}</Text> : null
  )

  const renderButtons = () => (
    <div className="crypto-password-validation-modal-content-buttons-container">
      <Button onClick={validateCryptoPassword}>
        Validar
      </Button>
    </div>
  )

  return (
    <div className="crypto-password-validation-modal-content">
      <Title variant="sans-serif">Informe sua senha de segurança</Title>
      <Text variant="serif">
        Insira sua senha de segurança para garantir a integridade de seus dados
      </Text>

      <Form
        className="crypto-password-validation-modal-form"
        onSubmit={validateCryptoPassword}
        buttons={renderButtons}
        content={renderFields}
        isValid={isValid} 
        errorMessage={renderErrorMessage}
      />
    </div>
  )
}

export { CryptoPasswordValidationModalContent }