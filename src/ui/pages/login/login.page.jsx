import React, { useState } from 'react'
import './login.style.scss'
import { LogoIcon } from 'app-icons'
import { Button, Title, Text, Form } from 'app-components'
import { useLogin } from './login.hook'
import { LoginConfirmation } from './components/index'

const Login = () => {
  const [hasToConfirmCode, setHasToConfirmCode] = useState('')

  const { renderFields, buildApiObject, sendToApi, isValid } = useLogin()

  const sendLogin = async () => {
    const loginObject = buildApiObject()
    const result = await sendToApi(loginObject)

    if (result) {
      setHasToConfirmCode(true)
    }
  }

  const renderLeftContent = () => {
    const renderContentBody = () => {
      if (hasToConfirmCode) {
        return (
          <div className="login-confirmation-left-content-body-container">
            <Text variant="serif">
              <span>
                Um e-mail de confirmação com um código para login foi enviado para você.
                <br />
                Acesse-o e insira no campo ao lado.
              </span>
            </Text>
          </div>
        )
      }

      return (
        <>
          <Text variant="serif">
            <span>
              Ainda não utiliza nosso serviço?
              <br />
              Cadastra-se agora!
            </span>
          </Text>

          <Button onClick={sendLogin} variant="light">
            Cadastrar
          </Button>
        </>
      )
    }

    return (
      <div className="login-left-content-wrapper">
        <div className="login-register-container">
          <div>
            <LogoIcon className="login-logo-icon" />
            <Title variant="serif">Herança Digital Segura</Title>
          </div>

          {renderContentBody()}
        </div>
      </div>
    )
  }

  const renderFormButton = () => (
    <Button type="submit" variant="primary">
      Login
    </Button>
  )

  const checkFormRender = () => {
    if (hasToConfirmCode) {
      return <LoginConfirmation goBack={() => setHasToConfirmCode(false)} />
    }

    return (
      <div className="login-form-container">
        <Text variant="sans-serif">Login</Text>
        <Form onSubmit={sendLogin} buttons={renderFormButton} content={renderFields} isValid={isValid} />
      </div>
    )
  }

  return (
    <div className="login-container">
      {renderLeftContent()}
      <div className="login-right-content-wrapper">{checkFormRender()}</div>
    </div>
  )
}

export { Login }
