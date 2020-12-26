import React, { useState, useEffect } from 'react'
import { PageTitle, Button, Text, EmptyContent } from 'app-components'
import { PlusIcon } from 'app-icons'
import { HeirsList, AddHeirModalContent } from './components'
import { useModal, useOwner, useLoggedUser } from 'app-hooks'

import './heirs-management.style.scss'

const HeirsManagement = () => {
  const [heirs, setHeirs] = useState([])

  const { showModal } = useModal()
  const { getManagementOwnerHeirs } = useOwner()
  const { loggedUser } = useLoggedUser()

  const getHeirs = async () => {
    const result = await getManagementOwnerHeirs(loggedUser.currentAccount.id)

    if (result) {
      setHeirs(result)
    }
  }

  const filterHeirs = async id => {
    setHeirs(heirs.filter(heir => heir.id !== id))
    await getHeirs()
  }

  useEffect(() => {
    getHeirs()
  }, [])

  const showAddHeirModal = () => {
    showModal({
      content: <AddHeirModalContent />,
    })
  }

  const renderContent = () => {
    if (heirs && heirs.length) {
      return <HeirsList heirs={heirs} filterHeirs={filterHeirs} />
    }

    return (
      <EmptyContent
        className="heirs-list-empty"
        mainMessage="Você ainda não possui herdeiros para gerenciar."
        additionalMessage="Comece a adicioná-los quando quiser por esta página."
      />
    )
  }

  return (
    <div className="heirs-management-container">
      <div className="heirs-management-header">
        <PageTitle title="Gerenciamento de Herdeiros" />

        <Button onClick={showAddHeirModal} className="heirs-management-add-heir-button">
          <Text>Adicionar</Text>
          <PlusIcon className="heirs-management-add-heir-icon" />
        </Button>
      </div>

      {renderContent()}
    </div>
  )
}

export { HeirsManagement }
