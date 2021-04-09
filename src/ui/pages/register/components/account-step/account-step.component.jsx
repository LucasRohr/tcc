import React from 'react'
import PropTypes from 'prop-types'
import { useModal } from 'app-hooks'
import { HelpIcon } from 'app-icons'
import { Button, Title, Text, Form, CryptoPasswordModalContent } from 'app-components'
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
      <CryptoPasswordModalContent onClick={hideModal} />
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
          <HelpIcon />
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
