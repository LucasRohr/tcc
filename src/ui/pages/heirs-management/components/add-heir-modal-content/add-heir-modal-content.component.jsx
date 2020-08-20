import React from 'react'
import { Title, Text, Form, Button } from 'app-components'
import { useModal } from 'app-hooks'
import { useAddHeirModalContent } from './add-heir-modal-content.hook'

import './add-heir-modal-content.style.scss'

const AddHeirModalContent = () => {
  const { renderFields, buildApiObject, sendToApi, isValid } = useAddHeirModalContent()
  const { hideModal } = useModal()

  const sendInvite = async () => {
    const inviteObject = buildApiObject()
    const result = await sendToApi(inviteObject)
    hideModal()

    if (result) {
      return
    }
  }

  const renderFormContent = () => renderFields()

  const renderFormButtons = () => (
    <div className="add-heir-modal-content-buttons-container">
      <Button onClick={hideModal} variant="light">
        Cancelar
      </Button>
      <Button type="submit" variant="primary">
        Enviar convite
      </Button>
    </div>
  )

  return (
    <div className="add-heir-modal-content">
      <Title variant="sans-serif">Adicionar herdeiro</Title>
      <Text variant="serif">
        Informe abaixo o contato de e-mail e/ou telefone do herdeiro que queira adicionar. Este contato será usado para
        convidar esta pessoa.
      </Text>

      <Form onSubmit={sendInvite} isValid={isValid} content={renderFormContent} buttons={renderFormButtons} />
    </div>
  )
}

export { AddHeirModalContent }
