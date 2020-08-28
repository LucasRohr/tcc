import React, { useState } from 'react'
import { PageTitle, Button, Text, Tabs } from 'app-components'
import { useLoggedUser, useModal, useRoute } from 'app-hooks'
import { ROLES } from 'app-constants'
import { PlusIcon, HeirsManagementIcon } from 'app-icons'
import { AccountsTab, CreateOwnerModalContent } from './components'

import './accounts-management.style.scss'

const TAB_OPTIONS = [
  {
    id: 'userAccounts',
    name: 'userAccounts',
    value: 'USER_ACCOUNTS',
    label: 'Suas contas',
  },

  {
    id: 'ownerHeirsAccounts',
    name: 'ownerHeirsAccounts',
    value: 'OWNER_HEIRS_ACCOUNTS',
    label: 'Contas de herdeiros',
  },
]

const AccountsManagement = () => {
  const [currentTab, setCurrentTab] = useState(TAB_OPTIONS[0].value)

  const { loggedUser } = useLoggedUser()
  const { showModal } = useModal()
  const { goToHeirInvites } = useRoute()

  const isOwner = loggedUser.currentAccount.type === ROLES.OWNER

  const renderCreateOwnerModal = () => {
    showModal({
      content: <CreateOwnerModalContent />,
    })
  }

  const renderAccountsManagementActions = () => {
    const hasOwnerAccount = loggedUser.accounts.find(account => account.type === ROLES.OWNER)
    const isHeirWithoutOwnerAccount = !isOwner && !hasOwnerAccount

    const renderAddOwnerButton = () =>
      isHeirWithoutOwnerAccount ? (
        <Button className="accounts-management-action-button" variant="primary" onClick={renderCreateOwnerModal}>
          <Text>Adicionar Conta Proprietária</Text>
          <PlusIcon className="accounts-management-action-plus-icon" />
        </Button>
      ) : null

    return (
      <div className="accounts-management-actions-container">
        {renderAddOwnerButton()}

        <Button className="accounts-management-action-button" variant="primary" onClick={goToHeirInvites}>
          <Text>Convites de Herdeiro</Text>
          <HeirsManagementIcon className="accounts-management-action-plus-icon" />
        </Button>
      </div>
    )
  }

  const renderAccountsTab = () => {
    if (isOwner) {
      const isUserTab = currentTab === TAB_OPTIONS[0].value

      return <AccountsTab isUserTab={isUserTab} />
    }

    return <AccountsTab isUserTab />
  }

  return (
    <div className="accounts-management-container">
      <div className="accounts-management-header-container">
        <PageTitle title="Gerenciamento de Contas" />
        {renderAccountsManagementActions()}
      </div>

      {isOwner ? <Tabs options={TAB_OPTIONS} currentTab={currentTab} setCurrentTab={setCurrentTab} /> : null}

      {renderAccountsTab()}
    </div>
  )
}

export { AccountsManagement }
