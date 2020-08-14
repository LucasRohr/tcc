import React, { useState, useEffect } from 'react'
import { PageTitle, Button, Text, Pagination } from 'app-components'
import { PlusIcon } from 'app-icons'
import { HeirsList, AddHeirModalContent } from './components'
import { useModal } from 'app-hooks'

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

  const getHeirs = () => {
    setHeirs([
      {
        id: 1,
        name: 'Fulaninho de Tal',
        account: 'conta herdeira 1',
        email: 'cleitinho@gmail.com',
        heritageItems: [
          {
            id: 1,
            name: 'imagem massa',
            type: 'IMAGE',
          },

          {
            id: 2,
            name: 'video massa',
            type: 'VIDEO',
          },

          {
            id: 3,
            name: 'documento massa',
            type: 'DOCUMENT',
          },
        ],
      },

      {
        id: 1,
        name: 'Cirilo brabo',
        email: 'cirila1@gmail.com',
        account: 'conta herdeira 2',
        heritageItems: [
          {
            id: 1,
            name: 'imagem massa',
            type: 'IMAGE',
          },

          {
            id: 2,
            name: 'video massa',
            type: 'VIDEO',
          },

          {
            id: 3,
            name: 'documento massa',
            type: 'DOCUMENT',
          },
        ],
      },
    ])

    const resultPaginationConfig = {
      total: 10,
      currentPage: 1,
      isFirstPage: true,
      isLastPage: false,
    }
    setPaginationConfig(resultPaginationConfig)
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
