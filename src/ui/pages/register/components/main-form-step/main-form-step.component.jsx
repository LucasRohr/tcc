import React from 'react'
import PropTypes from 'prop-types'
import { Title, Text, Button, Form } from 'app-components'
import { useMainFormStep } from './main-form-step.hook'

import './main-form-step.style.scss'

const MainFormStep = ({ mainFormObject, setRegisterObject, increaseStep, decreaseStep }) => {
  const { isValid, renderMainFormFields, buildApiObject } = useMainFormStep({ currentFieldsData: mainFormObject })

  const renderFormContent = () => renderMainFormFields()

  const updateFormAndContinue = async () => {
    const mainForm = buildApiObject()
    setRegisterObject(prevRegisterObject => ({ ...prevRegisterObject, mainForm }))
    increaseStep()
  }

  const renderFormButtons = () => (
    <div className="register-main-form-buttons-container">
      <Button onClick={decreaseStep} variant="light">
        Voltar
      </Button>
      <Button type="submit" variant="primary">
        Continuar
      </Button>
    </div>
  )

  return (
    <div className="register-main-form-container">
      <div className="register-main-form-title-container">
        <Title variant="sans-serif">Registro</Title>
        <Text>Informe os dados abaixo para seu perfil de usuário</Text>
      </div>

      <Form
        className="register-main-form-body-container"
        isValid={isValid}
        onSubmit={updateFormAndContinue}
        content={renderFormContent}
        buttons={renderFormButtons}
      />
    </div>
  )
}

MainFormStep.propTypes = {
  mainFormObject: PropTypes.object,
  setRegisterObject: PropTypes.func,
  increaseStep: PropTypes.func,
  decreaseStep: PropTypes.func,
}

export { MainFormStep }
