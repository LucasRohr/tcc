import React from 'react'
import PropTypes from 'prop-types'
import { useModal } from 'app-hooks'
import { HelpIcon } from 'app-icons'
import { Button, Title, Text, Form } from 'app-components'
import { useAccountStep } from './account-step.hook'

import './account-step.style.scss'

const ACCOUNT_LABELS = {
  OWNER: 'Proprietário',
  HEIR: 'Herdeiro',
}

const AccountStep = ({ firstAccountType, setRegisterObject, onConfirm, decreaseStep }) => {
  const { isValid, renderAccountFormFields, buildApiObject } = useAccountStep()

  const { showModal, hideModal } = useModal()

  const renderFormContent = () => renderAccountFormFields()

  const updateFormAndContinue = async () => {
    const account = buildApiObject()
    setRegisterObject(prevRegisterObject => ({ ...prevRegisterObject, account }))

    onConfirm(account)
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

  const renderHelpModal = () => {
    const renderContent = () => (
      <div className="register-account-help-container">
        <Title variant="sans-serif">O que é a senha de segurança?</Title>
        <Text variant="serif">
          Esta senha tem a funcionalidade de aprimorar a criptografia de seus dados que é realizada por toda a plataforma.
          <br />
          <br />Ao inserir este dado, você está garantindo uma proteção ainda mais completa de seus bens digitais.
          <br />
          <br />Recomendamos que ela seja diferente de usa senha de usuário.
        </Text>

        <Button onClick={hideModal} className="home-help-button" variant="primary">
          Entendi
        </Button>
      </div>
    )

    showModal({
      content: renderContent(),
    })
  }

  return (
    <div className="register-account-form-container">
      <div className="register-account-form-title-container">
        <Title variant="sans-serif">Conta de {ACCOUNT_LABELS[firstAccountType]}</Title>
        <Text>Defina um nome para a primeira conta do seu usuário</Text>
      </div>

      <div className="register-account-form-body-wrapper">
        <Button onClick={renderHelpModal}>
          <HelpIcon className="register-account-help-icon"/>
        </Button>
        <Form
          className="register-account-form-body-container"
          isValid={isValid}
          onSubmit={updateFormAndContinue}
          content={renderFormContent}
          buttons={renderFormButtons}
        />
      </div>
    </div>
  )
}

AccountStep.propTypes = {
  firstAccountType: PropTypes.string,
  setRegisterObject: PropTypes.func,
  onConfirm: PropTypes.func,
  decreaseStep: PropTypes.func,
}

export { AccountStep }
