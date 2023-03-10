import React, { useMemo, useState } from 'react'
import { HelpIcon } from 'app-icons'
import { Form, Button, Text, Title } from 'app-components'
import { useLoading, useLoggedUser, useModal, useTimeout, useToastAlert, useWindowSize } from 'app-hooks'
import { useCreateCredential } from './create-credential.hook'
import { CreateCredentialHeirsList } from '../create-credential-heirs-list/create-credential-heirs-list.component'

import './create-credential.style.scss'

const CreateCredential = () => {
  const [selectedHeirs, setSelectedHeirs] = useState([])
  const [hasCreatedCredential, setHasCreatedCredential] = useState(false)

  const { getCreateCredentialFields, isValid, cleanFields, buildApiObject, sendToApi } = useCreateCredential()
  const { showModal, hideModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { showSuccessToastAlert } = useToastAlert()
  const { isMobileResolution } = useWindowSize()
  const { showLoading, hideLoading } = useLoading()

  const { getDebounce } = useTimeout()
  const onCreateCredentialDebounce = useMemo(getDebounce, [])

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
      showLoading()

      onCreateCredentialDebounce(() => {
        hideLoading()

        setHasCreatedCredential(true)
        setSelectedHeirs([])
        cleanFields()
  
        showSuccessToastAlert('Credencial criada com sucesso.')
  
        setHasCreatedCredential(false)
      }, 4000)
    }
  }

  const renderHeirsList = () => (
    <CreateCredentialHeirsList onChange={setSelectedHeirs} hasCreatedCredential={hasCreatedCredential} />
  )

  const renderHelpModal = () => {
    const renderContent = () => (
      <div className="create-credential-help-container">
        <Title variant="sans-serif">O que ?? a cria????o de credencias?</Title>
        <Text variant="serif">
          Aqui voc?? pode adicionar logins e senhas de contas de redes sociais e servi??os que voc?? utiliza. Voc?? tamb??m
          pode adicionar senhas de dispositivos, como celulares.
          <br />
          <br /> Os campos de "Nome da credencial" e "Senha", s??o obrigat??rios, os restantes, opcionais.
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

  const renderHelpButton = () => {
    return (
      <Button onClick={renderHelpModal} variant="primary">
        <HelpIcon className="create-credential-form-help-icon" />
      </Button>
    )
  }

  const renderFormButtons = () => (
    <div className="create-credential-form-buttons-container">
      {!isMobileResolution && renderHelpButton()}
      <Button className="create-credential-form-button" type="submit" variant="primary">
        Criar credencial
      </Button>
    </div>
  )

  const renderFormContent = () => getCreateCredentialFields()

  return (
    <div className="create-credential-container">
      <div className="create-credential-heirs-content">{renderHeirsList()}</div>
      <div className="create-credential-form-wrapper">
        {isMobileResolution && (
          <div className="create-credential-form-title-container">
            <Title className="create-credentials-form-title" variant="sans-serif">Dados da credencial</Title>
            {renderHelpButton()}
          </div>
        )}
        <Form
          className="create-credential-form"
          onSubmit={createCredential}
          isValid={isValid}
          content={renderFormContent}
          buttons={renderFormButtons}
        />
      </div>
    </div>
  )
}

export { CreateCredential }
