import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAccount, useLoggedUser } from 'app-hooks'
import { AccountsList } from '../accounts-list/accounts-list.component'

const AccountsTab = ({ isUserTab }) => {
  const [accounts, setAccounts] = useState([])

  const { getAllUserAccounts, getAllOwnerHeirsAccounts } = useAccount()
  const { loggedUser } = useLoggedUser()

  const getUserAccounts = async () => {
    const result = isUserTab
      ? await getAllUserAccounts(loggedUser.id)
      : getAllOwnerHeirsAccounts(loggedUser.currentAccount.id)

    if (result) {
      setAccounts(result.accounts)
    }
  }

  useEffect(() => {
    getUserAccounts()
  }, [isUserTab])

  return <AccountsList accounts={accounts} isUserAccountsList={isUserTab} loadAccounts={getUserAccounts} />
}

AccountsTab.propTypes = {
  isUserTab: PropTypes.bool,
}

export { AccountsTab }
