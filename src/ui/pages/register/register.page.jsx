import React, { useState, useMemo } from 'react'
import { Text, Button, Title } from 'app-components'
import { LogoIcon } from 'app-icons'
import { useRoute } from 'app-hooks'
import { ROLES } from 'app-constants'
import { UserTypeStep, MainFormStep, PasswordStep, AccountStep, FinalStep } from './components'

import './register.style.scss'
import { ProgressBar } from 'ui/components/progress-bar/progress-bar.component'

const FIRST_STEP = 0

const Register = () => {
  const [completedRegister, setCompletedRegister] = useState(false)
  const [currentStep, setCurrentStep] = useState(FIRST_STEP)
  const [registerObject, setRegisterObject] = useState({ mainForm: {}, passwordForm: {}, account: '' })

  const isCreatingHeirAccount = window.location.pathname.includes('herdeiro')
  const firstAccountType = isCreatingHeirAccount ? ROLES.HEIR : ROLES.OWNER

  const { goToLogin } = useRoute()

  const registerUserWithAccount = () => {
    const apiObject = {
      ...registerObject.mainForm,
      password: registerObject.passwordForm.password,
      account: registerObject.account,
      firstAccountType,
    }

    setCompletedRegister(true)
    return apiObject
  }

  const increaseStep = () => {
    setCurrentStep(prevCurrentStep => prevCurrentStep + 1)
  }

  const decreaseStep = () => {
    setCurrentStep(prevCurrentStep => prevCurrentStep - 1)
  }

  const registerSteps = useMemo(
    () => [
      {
        component: UserTypeStep,
        props: { firstAccountType, increaseStep },
      },

      {
        component: MainFormStep,
        props: { mainFormObject: registerObject.mainForm, setRegisterObject, increaseStep, decreaseStep },
      },

      {
        component: PasswordStep,
        props: { passwordFormObject: registerObject.passwordForm, setRegisterObject, increaseStep, decreaseStep },
      },

      {
        component: AccountStep,
        props: {
          firstAccountType,
          setRegisterObject,
          onConfirm: registerUserWithAccount,
          increaseStep,
          decreaseStep,
        },
      },

      {
        component: FinalStep,
        props: {},
      },
    ],
    [registerObject]
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
      <div className="register-right-content-wrapper">
        {checkStepRender()}
        <div className="register-right-content-bar-wraper">
          <ProgressBar currentStep={currentStep} totalSteps={registerSteps.length - 1} />
        </div>
      </div>
    </div>
  )
}

export { Register }
