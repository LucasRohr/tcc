import React from 'react'
import PropTypes from 'prop-types'
import { usePasswordStep } from './password-step.hook'
import { Button, Title, Text, Form, PasswordRules } from 'app-components'

import './password-step.style.scss'

const PasswordStep = ({ passwordFormObject, setRegisterObject, increaseStep, decreaseStep }) => {
  const { isValid, renderPasswordFormFields, buildApiObject, password } = usePasswordStep({
    currentFieldsData: passwordFormObject,
  })

  const renderFormContent = () => (
    <>
      {renderPasswordFormFields()}
      <PasswordRules value={password} />
    </>
  )

  const updateFormAndContinue = async () => {
    const passwordForm = buildApiObject()
    setRegisterObject(prevRegisterObject => ({ ...prevRegisterObject, passwordForm }))
    increaseStep()
  }

  const renderFormButtons = () => (
    <div className="register-password-form-buttons-container">
      <Button onClick={decreaseStep} variant="light">
        Voltar
      </Button>
      <Button type="submit" variant="primary">
        Continuar
      </Button>
    </div>
  )

  return (
    <div className="register-password-form-container">
      <div className="register-password-form-title-container">
        <Title variant="sans-serif">Registro</Title>
        <Text>Informe os dados abaixo para seu perfil de usuário</Text>
      </div>

      <Form
        className="register-password-form-body-container"
        isValid={isValid}
        onSubmit={updateFormAndContinue}
        content={renderFormContent}
        buttons={renderFormButtons}
      />
    </div>
  )
}

PasswordStep.propTypes = {
  mainFormObject: PropTypes.object,
  setRegisterObject: PropTypes.func,
  increaseStep: PropTypes.func,
  decreaseStep: PropTypes.func,
}

export { PasswordStep }
