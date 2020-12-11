import React from 'react'
import PropTypes from 'prop-types'
import download from 'downloadjs'
import { CircleButton } from 'app-components'
import { DeleteIcon, DownloadIcon, EditIcon } from 'app-icons'
import { noopFunction } from 'app-helpers'
import { useModal, useLoggedUser, useMedia } from 'app-hooks'
import { HERITAGE_TYPES, ROLES } from 'app-constants'
import { RemoveMediaModal } from '../remove-media-modal/remove-media-modal.component'

import './media-actions.style.scss'

const MediaActions = ({ media, selectMedia, loadMedias }) => {
  const { showModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { getMediaForDownload } = useMedia()

  const showRemoveMediaModal = () => {
    showModal({
      content: <RemoveMediaModal mediaId={media.id} mediaType={selectMedia.type} loadMedias={loadMedias} />,
    })
  }

  const getMediaContentForDownload = async () => {
    const result = await getMediaForDownload(media.id)

    if (result) {
      return result
    }
  }

  const downloadFile = async () => {
    const mediaContent = media.type === HERITAGE_TYPES.VIDEO.key ? await getMediaContentForDownload() : media.file
    const mediaName = `${media.name}.${media.mimeType}`

    download(mediaContent, mediaName, media.mimeType)
  }

  const renderActions = () => {
    const isOwner = loggedUser.currentAccount.type === ROLES.OWNER

    if (isOwner) {
      return (
        <>
          <CircleButton variant="secondary" onClick={() => selectMedia(media)} icon={<EditIcon />} />
          <CircleButton variant="secondary" onClick={downloadFile} icon={<DownloadIcon />} />
          <DeleteIcon onClick={showRemoveMediaModal} className="media-actions-remove-icon" />
        </>
      )
    }

    return <CircleButton variant="secondary" onClick={noopFunction} icon={<DownloadIcon />} />
  }

  return <div className="media-actions-container">{renderActions()}</div>
}

MediaActions.propTypes = {
  media: PropTypes.object,
  selectMedia: PropTypes.func,
  loadMedias: PropTypes.func,
}

export { MediaActions }
