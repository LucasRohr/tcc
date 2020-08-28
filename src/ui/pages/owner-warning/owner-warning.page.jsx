import React from 'react'
import { useOwnerWarningForm } from './owner-warning.hook'
import { useToastAlert, useRoute } from 'app-hooks'
import { PageTitle, Text, Title, Form, Button } from 'app-components'
import { WarningIcon, ArrowBackIcon } from 'app-icons'
import cerificateCodeImage from 'app-images/certificate-code.png'

import './owner-warning.style.scss'

const OwnerWarning = () => {
  const { renderField, isValid, buildApiObject, sendToApi } = useOwnerWarningForm()

  const { showSuccessToastAlert } = useToastAlert()
  const { goToHome } = useRoute()

  const sendCertificateCode = async () => {
    const validationObject = buildApiObject()
    const result = await sendToApi(validationObject)

    if (result) {
      goToHome()
      showSuccessToastAlert(
        'Certidão validada com sucesso! A Herança Digital agora está disponível para você e demais herdeiros.'
      )
    }
  }

  const renderFormButton = () => (
    <Button className="owner-warning-form-button" type="submit" variant="primary">
      Enviar
    </Button>
  )

  const renderExplanationSection = () => (
    <div className="owner-warning-explanation-container">
      <div className="owner-warning-explanation-text-container">
        <Text variant="serif">
          Olá, este serviço é destinado à realização do processo de transferência da herança digital que o proprietário
          ligado à esta conta passou para você e demais herdeiros.
        </Text>
        <br />
        <Text variant="serif">
          Em caso de falecimento do mesmo proprietário, você deve enviar para nós o código da{' '}
          <Text variant="serif">Certidão de Óbito Digital</Text> desta pessoa. Realizaremos a totalmente segura
          validação deste código para a autorização da passagem de bens digitais.
        </Text>
      </div>

      <WarningIcon className="owner-warning-explanation-icon" />
    </div>
  )

  const renderCodeSection = () => (
    <div className="owner-warning-code-container">
      <Text variant="sans-serif">
        Você pode localizar o código da Certidão no local do documento digital mostrado ao lado
      </Text>

      <ArrowBackIcon className="owner-warning-code-arrow-icon" />

      <div className="owner-warning-code-image-container">
        <img src={cerificateCodeImage} alt="Localização do código de certificado digital" />
      </div>
    </div>
  )

  const renderCodeSendSection = () => (
    <div className="owner-warning-code-send-container">
      <div className="owner-warning-code-send-advice">
        <Title variant="sans-serif">Envio do código</Title>
        <Text>Tendo certeza de sua ação, utilize o campo ao lado para realizar o envio do código para validação.</Text>
      </div>

      <Form
        className="owner-warning-form"
        content={renderField}
        buttons={renderFormButton}
        isValid={isValid}
        onSubmit={sendCertificateCode}
      />
    </div>
  )

  return (
    <div className="owner-warning-container">
      <PageTitle title="Aviso de Falecimento do Proprietário" />

      {renderExplanationSection()}
      {renderCodeSection()}
      {renderCodeSendSection()}
    </div>
  )
}

export { OwnerWarning }
