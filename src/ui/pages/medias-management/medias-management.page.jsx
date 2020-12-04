import React, { useState, useEffect, useMemo } from 'react'
import { useLoggedUser, useOwner, useHeir, useRoute, useToastAlert } from 'app-hooks'
import { ROLES, HEIR_STATUS, HERITAGE_TYPES } from 'app-constants'
import { PageTitle, Tabs } from 'app-components'
import { MediaGroup } from './components'

import './medias-management.style.scss'

const TAB_OPTIONS = [
  {
    id: 'imagesList',
    name: 'imagesList',
    value: 'IMAGES_LIST',
    label: 'Imagens',
  },

  {
    id: 'videosList',
    name: 'videosList',
    value: 'VIDEOS_LIST',
    label: 'Vídeos',
  },

  {
    id: 'documentsList',
    name: 'documentsList',
    value: 'DOCUMENTS_LIST',
    label: 'Documentos',
  },
]

const FIRST_PAGE = 1

const MediasManagement = () => {
  const [currentTab, setCurrentTab] = useState(TAB_OPTIONS[0].value)
  const [medias, setMedias] = useState([])
  const [paginationConfig, setPaginationConfig] = useState({
    total: null,
    currentPage: FIRST_PAGE - 1,
    isFirstPage: false,
    isLastPage: false,
  })

  const { loggedUser } = useLoggedUser()
  const { getHeritageMedias } = useOwner()
  const { getReceivedMedias } = useHeir()
  const { goToHome } = useRoute()
  const { showErrorToastAlert } = useToastAlert()

  const currentAccountType = loggedUser.currentAccount.type

  const setResultAndHandlePagination = result => {
    const resultPaginationConfig = {
      total: result.totalPages,
      currentPage: result.number + 1,
      isFirstPage: result.first,
      isLastPage: result.last,
    }

    setPaginationConfig(resultPaginationConfig)
    setMedias(result.content)
  }

  const getMedias = async (page = FIRST_PAGE) => {
    const isOwner = currentAccountType === ROLES.OWNER
    const accountId = loggedUser.currentAccount.id

    const result = isOwner ? await getHeritageMedias(page, accountId) : await getReceivedMedias(page, accountId)

    if (result) {
      setResultAndHandlePagination(result)
    }
  }

  const checkHeirStatus = () => {
    const isInvalidHeirAccount =
      currentAccountType === ROLES.HEIR && loggedUser.currentAccount.status !== HEIR_STATUS.ACTIVE.key

    if (isInvalidHeirAccount) {
      showErrorToastAlert('Você não possui permissão para acessar esse recurso.')
      goToHome()
    }
  }

  useEffect(() => {
    checkHeirStatus()
    getMedias()
  }, [])

  const renderMediaGroup = mediaType => {
    const filteredMedias = medias.filter(media => media.type === mediaType)

    return (
      <MediaGroup
        paginationConfig={paginationConfig}
        getMedias={getMedias}
        mediaType={mediaType}
        mediasList={filteredMedias}
      />
    )
  }

  const CONTENT_OPTIONS = useMemo(
    () => ({
      IMAGES_LIST: renderMediaGroup(HERITAGE_TYPES.IMAGE.key),

      VIDEOS_LIST: renderMediaGroup(HERITAGE_TYPES.VIDEO.key),

      DOCUMENTS_LIST: renderMediaGroup(HERITAGE_TYPES.DOCUMENT.key),
    }),
    []
  )

  return (
    <div className="medias-management-container">
      <PageTitle title="Gerenciamento de Mídias" />

      <Tabs
        className="medias-management-tabs"
        options={TAB_OPTIONS}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <div className="medias-management-groups-container">{CONTENT_OPTIONS[currentTab]}</div>
    </div>
  )
}

export { MediasManagement }
