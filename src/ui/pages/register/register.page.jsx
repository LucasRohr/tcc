import React, { useState, useMemo } from 'react'
import { Text, Button, Title } from 'app-components'
import { LogoIcon } from 'app-icons'
import { useRoute } from 'app-hooks'
import { ROLES } from 'app-constants'
import { UserTypeStep, MainFormStep, PasswordStep, AccountStep, FinalStep } from './components'

import './register.style.scss'

const FIRST_STEP = 0

const Register = () => {
  const [completedRegister, setCompletedRegister] = useState(false)
  const [currentStep, setCurrentStep] = useState(FIRST_STEP)
  const [registerObject, setRegisterObject] = useState({ mainForm: {}, passwordForm: {}, accountForm: {} })

  const isCreatingHeirAccount = window.location.pathname.includes('herdeiro')

  const { goToLogin } = useRoute()

  const registerUserWithAccount = () => {
    setCompletedRegister(true)
    return registerObject
  }

  const registerSteps = useMemo(
    () => [
      {
        component: UserTypeStep,
        props: { firstAccountType: isCreatingHeirAccount ? ROLES.HEIR : ROLES.OWNER, setCurrentStep },
      },

      {
        component: MainFormStep,
        props: { mainFormObject: registerObject.mainForm, setRegisterObject, setCurrentStep },
      },

      {
        component: PasswordStep,
        props: { passwordFormObject: registerObject.passwordForm, setRegisterObject, setCurrentStep },
      },

      {
        component: AccountStep,
        props: {
          accountFormObject: registerObject.accountForm,
          setRegisterObject,
          onConfirm: registerUserWithAccount,
          setCurrentStep,
        },
      },

      {
        component: FinalStep,
        props: {},
      },
    ],
    []
  )

  const renderLeftContent = () => {
    const renderContentBody = () => {
      if (completedRegister) {
        return (
          <div className="register-completed-left-content-body-container">
            <Text variant="serif">
              <span>
                Cadastro finalizado!
                <br />
                Agora você já pode começar a utilizar o sistema!
              </span>
            </Text>
          </div>
        )
      }

      return (
        <>
          <Text variant="serif">
            <span>
              Já possui uma conta?
              <br />
              Faça seu login!
            </span>
          </Text>

          <Button onClick={goToLogin} variant="light">
            Acessar
          </Button>
        </>
      )
    }

    return (
      <div className="register-left-content-wrapper">
        <div className="register-app-container">
          <div>
            <LogoIcon className="login-logo-icon" />
            <Title variant="serif">Herança Digital Segura</Title>
          </div>

          {renderContentBody()}
        </div>
      </div>
    )
  }

  const checkStepRender = () => {
    const StepComponent = registerSteps[currentStep].component
    const props = registerSteps[currentStep].props

    return <StepComponent {...props} />
  }

  return (
    <div className="register-container">
      {renderLeftContent()}
      <div className="register-right-content-wrapper">{checkStepRender()}</div>
    </div>
  )
}

export { Register }
