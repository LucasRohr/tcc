import React from 'react'
import PropTypes from 'prop-types'
import { ROLES } from 'app-constants'
import { useLoggedUser } from 'app-hooks'
import { EmptyContent } from 'app-components'
import { AccountRow } from '../account-row/account-row.component'

import './accounts-list.style.scss'

const AccountsList = ({ accounts, isUserAccountsList, loadAccounts }) => {
  const { loggedUser } = useLoggedUser()
  const isOwner = loggedUser.currentAccount.type === ROLES.OWNER

  const listContainerClass = isOwner ? 'accounts-list-container' : 'accounts-list-container--heir'

  const renderList = () => {
    const hasAccounts = accounts && accounts.length

    if (hasAccounts) {
      return accounts.map(account => (
        <AccountRow account={account} isUserAccountsList={isUserAccountsList} loadAccounts={loadAccounts} />
      ))
    }

    return (
      <EmptyContent
        className="accounts-list-empty-content"
        mainMessage="Não existem contas para serem exibidas no momento."
        additionalMessage="Volte novamente mais tarde"
      />
    )
  }

  return <div className={listContainerClass}>{renderList()}</div>
}

AccountsList.defaultProps = {
  isUserAccountsList: false,
  accounts: [],
}

AccountsList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  isUserAccountsList: PropTypes.bool,
  loadAccounts: PropTypes.func,
}

export { AccountsList }
