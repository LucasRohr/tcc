import React from 'react'
import PropTypes from 'prop-types'
import { UserIcon, ExitIcon, DeleteIcon } from 'app-icons'
import { Text, Button, RemoveHeirModalContent } from 'app-components'
import { useLoggedUser, useRoute, useModal } from 'app-hooks'
import { HEIR_STATUS } from 'app-constants'

import './account-row.style.scss'

const ROLE_LABELS = {
  OWNER: 'Conta proprietária',
  HEIR: 'Conta herdeira',
}

const AccountRow = ({ account, isUserAccountsList, loadAccounts }) => {
  const { loggedUser, setCurrentAccount } = useLoggedUser()
  const { goToHome, goToProfile } = useRoute()
  const { showModal } = useModal()

  const switchUserAccount = () => {
    setCurrentAccount(account)
    localStorage.removeItem('cryptoPassword')
    goToHome()
  }

  const renderUserAccountRow = () => {
    const renderRowAction = () => {
      if (account.id === loggedUser.currentAccount.id) {
        return (
          <Button className="account-row-action-profile-button" variant="primary" onClick={goToProfile}>
            Perfil
          </Button>
        )
      }

      return (
        <Button className="account-row-action-access-account-button" variant="light" onClick={switchUserAccount}>
          <Text variant="sans-serif">Acessar</Text>
          <ExitIcon className="account-row-action-button-icon" />
        </Button>
      )
    }

    return (
      <div className="account-row-container">
        <div className="account-row-info-container">
          <UserIcon className="account-row-user-icon" />
          <Text variant="sans-serif">
            {account.name} -{' '}
            <Text variant="sans-serif" className="account-row-heir-highlighted-text">
              {ROLE_LABELS[account.type]}
            </Text>
          </Text>
        </div>

        {renderRowAction()}
      </div>
    )
  }

  const renderRemoveHeirModal = () => {
    showModal({
      content: <RemoveHeirModalContent heirId={account.id} onRemove={loadAccounts} />,
    })
  }

  const renderOwnerHeirAccountRow = () => {
    const isPendingHeir = account.status === HEIR_STATUS.PENDING.key

    const renderHeirInfo = () =>
      isPendingHeir ? (
        <Text variant="sans-serif">{account.userEmail}</Text>
      ) : (
        <Text variant="sans-serif">
          {account.name} -{' '}
          <Text variant="sans-serif" className="account-row-heir-highlighted-text">
            {account.userName}
          </Text>
        </Text>
      )

    const renderRowAction = () => {
      if (isPendingHeir) {
        return (
          <Text variant="sans-serif" className="account-row-heir-pendent-message">
            Convite pendente
          </Text>
        )
      }

      return <DeleteIcon className="account-row-remove-heir-icon" onClick={renderRemoveHeirModal} />
    }

    return (
      <div className="account-row-container">
        <div className="account-row-info-container">
          <UserIcon className="account-row-user-icon" />
          {renderHeirInfo()}
        </div>

        {renderRowAction()}
      </div>
    )
  }

  return isUserAccountsList ? renderUserAccountRow() : renderOwnerHeirAccountRow()
}

AccountRow.propTypes = {
  account: PropTypes.object,
  isUserAccountsList: PropTypes.bool,
  loadAccounts: PropTypes.func,
}

export { AccountRow }
