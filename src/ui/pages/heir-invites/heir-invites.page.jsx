import React, { useState, useEffect } from 'react'
import { PageTitle, Text } from 'app-components'
import { useInvite, useLoggedUser } from 'app-hooks'
import { InvitesList } from './components'

import './heir-invites.style.scss'

const HeirInvites = () => {
  const [invites, setInvites] = useState([])

  const { getAllHeirInvites } = useInvite()
  const { loggedUser } = useLoggedUser()

  const getInvites = async () => {
    const result = await getAllHeirInvites(loggedUser.id)

    if (result) {
      setInvites(result)
    }
  }

  useEffect(() => {
    getInvites()
  }, [])

  return (
    <div className="heir-invites-container">
      <PageTitle title="Convites de Herdeiro" />

      <Text className="heir-invites-text" variant="sans-serif">
        Aqui você pode ver seus convites de herdeiro, insira o nome da conta herdeira a ser criada ou rejeite um convite
      </Text>

      <Text className="heir-invites-text-highlight" variant="sans-serif">
        Ao criar uma conta, você irá para a tela de início dela
      </Text>

      <InvitesList invites={invites} loadInvites={getInvites} />
    </div>
  )
}

export { HeirInvites }
