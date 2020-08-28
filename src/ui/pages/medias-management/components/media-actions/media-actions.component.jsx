import React from 'react'
import PropTypes from 'prop-types'
import download from 'downloadjs'
import { CircleButton } from 'app-components'
import { DeleteIcon, DownloadIcon, EditIcon } from 'app-icons'
import { noopFunction } from 'app-helpers'
import { useModal, useLoggedUser } from 'app-hooks'
import { ROLES } from 'app-constants'
import { RemoveMediaModal } from '../remove-media-modal/remove-media-modal.component'

import './media-actions.style.scss'

const MediaActions = ({ media, selectMedia }) => {
  const { showModal } = useModal()
  const { loggedUser } = useLoggedUser()

  const showRemoveMediaModal = () => {
    showModal({
      content: <RemoveMediaModal mediaId={media.id} mediaType={selectMedia.type} />,
    })
  }

  const downloadFile = () => {
    download(media.file, media.name, media.mimeType)
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
}

export { MediaActions }
