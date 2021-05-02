import React, { useState } from 'react'
import './login.style.scss'
import { LogoIcon } from 'app-icons'
import { Button, Title, Text, Form } from 'app-components'
import { useLoginForm } from './login.hook'
import { LoginConfirmation } from './components/index'
import { tokenHelper, useLoggedUser, useRoute, useWindowSize } from 'app-hooks'

const Login = () => {
  const [postCredentialsScreen, setPostCredentialsScreen] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const { renderFields, buildApiObject, sendToApi, isValid } = useLoginForm()
  const { requestLoginToken } = useLoggedUser()
  const { goToRegister } = useRoute()

  const { isMobileResolution } = useWindowSize()

  const sendLogin = async () => {
    setErrorMessage('')

    const loginObject = buildApiObject()
    const result = await sendToApi(loginObject)

    if (!result) {
      setErrorMessage('Dados de login inválidos, tente novamente')
    } else {
      const [userAuthToken, userEmail] = result?.header?.authorization?.split(', ')

      tokenHelper.save(userAuthToken)
      setPostCredentialsScreen(1)

      await requestLoginToken(userEmail, userAuthToken)
    }
  }

  const renderLeftContent = () => {
    const renderContentBody = () => {
      if (postCredentialsScreen === 1) {
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
              Cadastre-se agora!
            </span>
          </Text>

          <Button onClick={goToRegister} variant="light">
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
            <Title variant="serif">Memora</Title>
          </div>

          {renderContentBody()}
        </div>
      </div>
    )
  }

  const renderFormButton = () => (
    <Button className="login-form-button" type="submit" variant="primary">
      Login
    </Button>
  )

  const checkFormRender = () => {
    if (postCredentialsScreen) {
      return <LoginConfirmation goBack={() => setPostCredentialsScreen(null)} />
    }

    return (
      <div className="login-form-container">
        <Text variant="sans-serif">Login</Text>
        <Form onSubmit={sendLogin} buttons={renderFormButton} content={renderFields} isValid={isValid} />
        {errorMessage ? <Text className="login-error-message">{errorMessage}</Text> : null}
      </div>
    )
  }

  const renderMobileHeader = () => {
    if (isMobileResolution) {
      return (
        <div className="login-modile-header">
          <LogoIcon className="login-logo-icon" />
          <Title variant="serif">Memora</Title>
        </div>
      )
    }

    return null
  }

  const renderMobileRegisterMessage = () => {
    if (isMobileResolution && !postCredentialsScreen) {
      return (
        <div className="login-modile-register">
          <Text variant="sans-serif">Ainda não utiliza nosso serviço?</Text>

          <div onClick={goToRegister}>
            <Text variant="sans-serif">Cadastre-se agora!</Text>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="login-container">
      {renderLeftContent()}

      <div className="login-right-content-wrapper">
        {renderMobileHeader()}

        <div className="login-right-content">{checkFormRender()}</div>

        {renderMobileRegisterMessage()}
      </div>
    </div>
  )
}

export { Login }
