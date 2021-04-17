import React from 'react'
import { Title, Text, Button, Form } from 'app-components'
import { useModal, useRoute, useLoggedUser } from 'app-hooks'
import { useOwnerModalContentForm } from './create-owner-modal-content.hook'

import './create-owner-modal-content.style.scss'

const CreateOwnerModalContent = () => {
  const { renderCreateOwnerInput, isValid, buildApiObject, sendToApi } = useOwnerModalContentForm()
  const { hideModal } = useModal()
  const { goToHome } = useRoute()
  const { setCurrentAccount } = useLoggedUser()

  const createOwnerAccount = async () => {
    const accountObject = buildApiObject()
    const result = await sendToApi(accountObject)
    hideModal()

    if (result) {
      setCurrentAccount(result.account)
      localStorage.removeItem('cryptoPassword')
      goToHome()
    }
  }

  const renderFormButtons = () => (
    <div className="create-owner-modal-buttons-container">
      <Button onClick={hideModal} variant="light">
        Cancelar
      </Button>
      <Button type="submit" variant="primary">
        Criar conta
      </Button>
    </div>
  )

  return (
    <div className="create-owner-modal-container">
      <Title>Criar Conta Proprietária</Title>

      <Text variant="serif">
        Para criar uma conta de Proprietário Digital, basta informar um nome para a mesma abaixo. Ao confirmar, você
        sairá da sua conta atual e irá para a tela de início de sua Conta Proprietária
      </Text>

      <Form
        className="create-owner-modal-form"
        onSubmit={createOwnerAccount}
        content={renderCreateOwnerInput}
        buttons={renderFormButtons}
        isValid={isValid}
      />
    </div>
  )
}

export { CreateOwnerModalContent }
