import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'app-components'
import { useRoute, useLoggedUser, useInvite, useToastAlert } from 'app-hooks'
import { useInviteRowForm } from './invite-row.hook'

import './invite-row.style.scss'

const InviteRow = ({ invite, loadInvites }) => {
  const { renderCreateHeirInput, isValid, buildApiObject, sendToApi } = useInviteRowForm()
  const { goToHome } = useRoute()
  const { setCurrentAccount } = useLoggedUser()
  const { respondInvite } = useInvite()
  const { showSuccessToastAlert } = useToastAlert()

  const acceptInviteAndCreatHeirAccount = async () => {
    const inviteObject = buildApiObject()
    const result = await sendToApi(inviteObject)
    await respondInvite({ inviteId: invite.id, isAccepting: true })

    if (result) {
      const heirAccount = result.heirAccount
      setCurrentAccount(heirAccount)
      goToHome()
      showSuccessToastAlert('Convite de herdeiro aceito com sucesso.')
    }
  }

  const rejectInvite = async () => {
    const result = await respondInvite({ inviteId: invite.id, isAccepting: false })

    if (result) {
      await loadInvites()
      showSuccessToastAlert('Convite de herdeiro rejeitado com sucesso.')
    }
  }

  const renderFormButtons = () => (
    <div className="heir-invite-row-buttons-container">
      <Button onClick={rejectInvite} variant="alert">
        Rejeitar convite
      </Button>
      <Button type="submit" variant="primary">
        Aceitar e criar conta
      </Button>
    </div>
  )

  return (
    <div className="invite-row-container">
      <div className="invite-row-header-container">Convite para a herança de {invite.senderName}</div>

      <Form
        className="invite-row-form"
        onSubmit={acceptInviteAndCreatHeirAccount}
        isValid={isValid}
        content={renderCreateHeirInput}
        buttons={renderFormButtons}
      />
    </div>
  )
}

InviteRow.propTypes = {
  invite: PropTypes.object,
  loadInvites: PropTypes.func,
}

export { InviteRow }
