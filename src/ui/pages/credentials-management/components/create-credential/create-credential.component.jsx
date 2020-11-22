import React, { useState } from 'react'
import { Form, Button, Text, Title } from 'app-components'
import { HelpIcon } from 'app-icons'
import { useLoggedUser, useModal } from 'app-hooks'
import { useCreateCredential } from './create-credential.hook'
import { CreateCredentialHeirsList } from '../create-credential-heirs-list/create-credential-heirs-list.component'

import './create-credential.style.scss'

const CreateCredential = () => {
  const [selectedHeirs, setSelectedHeirs] = useState([])

  const { getCreateCredentialFields, isValid, buildApiObject, sendToApi } = useCreateCredential()
  const { showModal, hideModal } = useModal()
  const { loggedUser } = useLoggedUser()

  const getSelectedHeirsId = () => {
    const selectedHeirsFiltered = selectedHeirs.filter(heirItem => heirItem.itemCheck)
    const heirsIds = selectedHeirsFiltered.map(heirItem => heirItem.item.id)

    return heirsIds
  }

  const createCredential = async () => {
    const credentialObject = buildApiObject()
    credentialObject.heirsIds = getSelectedHeirsId()
    credentialObject.ownerId = loggedUser.currentAccount.id

    const result = await sendToApi(credentialObject)

    if (result) {
      return
    }
  }

  const renderHeirsList = () => <CreateCredentialHeirsList onChange={setSelectedHeirs} />

  const renderHelpModal = () => {
    const renderContent = () => (
      <div className="create-credential-help-container">
        <Title variant="sans-serif">O que é a criação de credencias?</Title>
        <Text variant="serif">
          Aqui você pode adicionar logins e senhas de contas de redes sociais e serviços que você utiliza. Você também
          pode adicionar senhas de dispositivos, como celulares.
          <br />
          <br /> Os campos de "Nome da credencial" e "Senha", são obrigatórios, os restantes, opcionais.
        </Text>
        <Button onClick={hideModal} className="create-credential-help-button" variant="primary">
          Entendi
        </Button>
      </div>
    )

    showModal({
      content: renderContent(),
    })
  }

  const renderFormButtons = () => (
    <div className="create-credential-form-buttons-container">
      <Button onClick={renderHelpModal} variant="primary">
        <HelpIcon className="create-credential-form-help-icon" />
      </Button>
      <Button className="create-credential-form-button" type="submit" variant="primary">
        Criar credencial
      </Button>
    </div>
  )

  const renderFormContent = () => getCreateCredentialFields()

  return (
    <div className="create-credential-container">
      <div className="create-credential-heirs-content">{renderHeirsList()}</div>

      <Form
        className="create-credential-form"
        onSubmit={createCredential}
        isValid={isValid}
        content={renderFormContent}
        buttons={renderFormButtons}
      />
    </div>
  )
}

export { CreateCredential }
