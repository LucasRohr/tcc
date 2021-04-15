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
      localStorage.setItem('cryptoPassword', validationObject.cryptoPassword)
      hideModal()
    }
  }

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

      <Form onSubmit={validateCryptoPassword} buttons={renderButtons} content={renderFields} isValid={isValid} />
      {errorMessage ? <Text className="crypto-password-validation-error-message">{errorMessage}</Text> : null}

    </div>
  )
}

export { CryptoPasswordValidationModalContent }