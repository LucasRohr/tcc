import React, { useState, useEffect } from 'react'
import { PageTitle, Button, Text, Pagination } from 'app-components'
import { PlusIcon } from 'app-icons'
import { HeirsList, AddHeirModalContent } from './components'
import { useModal, useOwner, useLoggedUser } from 'app-hooks'

import './heirs-management.style.scss'

const HeirsManagement = () => {
  const [heirs, setHeirs] = useState([])
  const [paginationConfig, setPaginationConfig] = useState({
    total: null,
    currentPage: 1,
    isFirstPage: false,
    isLastPage: false,
  })

  const { showModal } = useModal()
  const { getOwnerHeirs } = useOwner()
  const { loggedUser } = useLoggedUser()

  const setResultAndHandlePagination = result => {
    const resultPaginationConfig = {
      total: result.totalPages,
      currentPage: result.currentPage,
      isFirstPage: result.isFirstPage,
      isLastPage: result.isLastPage,
    }

    setPaginationConfig(resultPaginationConfig)
    setHeirs(result.data.heirs)
  }

  const getHeirs = () => {
    const result = getOwnerHeirs(loggedUser.currentAccount.id)

    if (result) {
      setResultAndHandlePagination(result)
    }
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
      return <HeirsList heirs={heirs} />
    }

    return <HeirsList heirs={heirs} />
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

      <Pagination
        onChange={getHeirs}
        paginationConfig={paginationConfig}
        additionalClass="heirs-management-pagination-container"
        showPagination={heirs && heirs.length}
      />
    </div>
  )
}

export { HeirsManagement }