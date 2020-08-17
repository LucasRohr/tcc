import React, { useState, useEffect } from 'react'
import { useLoggedUser, useOwner, useHeir, useRoute, useToastAlert } from 'app-hooks'
import { ROLES, HEIR_STATUS, HERITAGE_TYPES } from 'app-constants'
import { PageTitle } from 'app-components'
import { MediaGroup } from './components'

import './medias-management.style.scss'

const MediasManagement = () => {
  const [medias, setMedias] = useState([])

  const { loggedUser } = useLoggedUser()
  const { getHeritageMedias } = useOwner()
  const { getReceivedMedias } = useHeir()
  const { goToHome } = useRoute()
  const { showErrorToastAlert } = useToastAlert()

  const currentAccountType = loggedUser.currentAccount.type

  const getMedias = async () => {
    const isOwner = currentAccountType === ROLES.OWNER
    const accountId = loggedUser.currentAccount.id

    // const result = isOwner ? await getHeritageMedias(accountId) : await getReceivedMedias(accountId)

    const result = [
      {
        id: 1,
        type: 'IMAGE',
        file:
          'https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/04/30/faustao_reproducao_tv_globo_348281_36.jpg',
        name: 'big fausto orozco bixo muito importante',
      },

      {
        id: 2,
        type: 'IMAGE',
        file:
          'https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/04/30/faustao_reproducao_tv_globo_348281_36.jpg',
        name: 'big fausto DE NOVVO OVBDBBGFGDFGDGFDG',
      },

      {
        id: 3,
        type: 'VIDEO',
        file:
          'https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/04/30/faustao_reproducao_tv_globo_348281_36.jpg',
        name: 'video importante de eu tomando a ruim',
      },

      {
        id: 4,
        type: 'DOCUMENT',
        file:
          'https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/04/30/faustao_reproducao_tv_globo_348281_36.jpg',
        name: 'documento muito secreto ainda bem que o sistema é seguro 🤠',
      },
    ]

    if (result && result.length) {
      setMedias(result)
    }
  }

  const checkHeirStatus = () => {
    const isInvalidHeirAccount =
      currentAccountType === ROLES.HEIR && currentAccountType.status !== HEIR_STATUS.ACTIVE.key

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

    return <MediaGroup mediaType={mediaType} mediasList={filteredMedias} />
  }

  return (
    <div className="medias-management-container">
      <PageTitle title="Gerenciamento de Mídias" />
      <div className="medias-management-groups-container">
        {renderMediaGroup(HERITAGE_TYPES.IMAGE.key)}
        {renderMediaGroup(HERITAGE_TYPES.VIDEO.key)}
        {renderMediaGroup(HERITAGE_TYPES.DOCUMENT.key)}
      </div>
    </div>
  )
}

export { MediasManagement }
