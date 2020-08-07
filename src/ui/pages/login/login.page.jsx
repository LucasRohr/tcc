import React from 'react'
import './login.style.scss'
import { LogoIcon } from 'app-icons'
import { Button, Title, Text, Form } from 'app-components'
import { useLogin } from './login.hook'

const Login = () => {
  const { renderFields, buildApiObject, sendToApi, isValid } = useLogin()

  const sendLogin = async () => {
    const loginObject = buildApiObject()
    const result = await sendToApi(loginObject)

    if (result) {
      return null
    }
  }

  const renderLeftContent = () => (
    <div className="login-left-content-wrapper">
      <div className="login-register-container">
        <div>
          <LogoIcon className="login-logo-icon" />
          <Title variant="serif">Herança Digital Segura</Title>
        </div>

        <Text variant="serif">
          Ainda não utiliza nosso serviço?
          <br />
          Cadastra-se agora!
        </Text>

        <Button onClick={sendLogin} variant="light">
          Cadastrar
        </Button>
      </div>
    </div>
  )

  const renderFormButton = () => (
    <Button type="submit" variant="primary">
      Login
    </Button>
  )

  return (
    <div className="login-container">
      {renderLeftContent()}

      <div className="login-right-content-wrapper">
        <div className="login-form-container">
          <Text variant="san-serif">Login</Text>
          <Form onSubmit={sendLogin} buttons={renderFormButton} content={renderFields} isValid={isValid} />
        </div>
      </div>
    </div>
  )
}

export { Login }
