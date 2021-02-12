import React, { useEffect, useState } from 'react'
import { ROLES } from 'app-constants'
import { PageTitle } from 'app-components'
import { useLoggedUser, useOwner } from 'app-hooks'
import { UserCard, AccountCard } from './components'

import './profile.style.scss'

const Profile = () => {
  const [totalHeirs, setTotalHeirs] = useState(0)

  const { loggedUser } = useLoggedUser()
  const { getOwnerHeitsTotalNumber } = useOwner()

  const account = loggedUser.currentAccount
  const isOwner = account.type === ROLES.OWNER

  const getHeirsTotal = async () => {
    const result = await getOwnerHeitsTotalNumber(loggedUser.currentAccount.id)

    if (result) {
      setTotalHeirs(result)
    }
  }

  useEffect(() => {
    if (isOwner) {
      getHeirsTotal()
    }
  }, [])

  return (
    <div className="profile-container">
      <PageTitle title="Seu perfil" />

      <UserCard
        email={loggedUser.email}
        name={loggedUser.name}
        cpf={loggedUser.cpf}
        accountsTotal={loggedUser.accounts.length}
        birthday={loggedUser.birthday}
      />

      <AccountCard name={account.name} accountType={account.type} totalHeirs={totalHeirs} heirStatus={account.status} />
    </div>
  )
}

export { Profile }
