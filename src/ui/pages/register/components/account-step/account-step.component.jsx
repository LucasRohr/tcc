import React from 'react'
import PropTypes from 'prop-types'
import { useAccountStep } from './account-step.hook'
import { Button, Title, Text, Form } from 'app-components'

import './account-step.style.scss'

const ACCOUNT_LABELS = {
  OWNER: 'Proprietário',
  HEIR: 'Herdeiro',
}

const AccountStep = ({ firstAccountType, setRegisterObject, onConfirm, increaseStep, decreaseStep }) => {
  const { isValid, renderAccountFormFields, buildApiObject } = useAccountStep()

  const renderFormContent = () => renderAccountFormFields()

  const updateFormAndContinue = async () => {
    const account = buildApiObject()
    setRegisterObject(prevRegisterObject => ({ ...prevRegisterObject, account }))
    increaseStep()
    onConfirm()
  }

  const renderFormButtons = () => (
    <div className="register-account-form-buttons-container">
      <Button onClick={decreaseStep} variant="light">
        Voltar
      </Button>
      <Button type="submit" variant="primary">
        Finalizar
      </Button>
    </div>
  )

  return (
    <div className="register-account-form-container">
      <div className="register-account-form-title-container">
        <Title variant="sans-serif">Conta de {ACCOUNT_LABELS[firstAccountType]}</Title>
        <Text>Defina um nome para a primeira conta do seu usuário</Text>
      </div>

      <Form
        className="register-account-form-body-container"
        isValid={isValid}
        onSubmit={updateFormAndContinue}
        content={renderFormContent}
        buttons={renderFormButtons}
      />
    </div>
  )
}

AccountStep.propTypes = {
  firstAccountType: PropTypes.string,
  setRegisterObject: PropTypes.func,
  onConfirm: PropTypes.func,
  increaseStep: PropTypes.func,
  decreaseStep: PropTypes.func,
}

export { AccountStep }
