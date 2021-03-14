import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import download from 'downloadjs'
import { CircleButton } from 'app-components'
import { DeleteIcon, DownloadIcon, EditIcon, SeeMoreIcon } from 'app-icons'
import { useModal, useLoggedUser, useMedia, useWindowSize } from 'app-hooks'
import { HERITAGE_TYPES, ROLES } from 'app-constants'
import { RemoveMediaModal } from '../remove-media-modal/remove-media-modal.component'

import './media-actions.style.scss'

const MediaActions = ({ media, selectMedia, loadMedias }) => {
  const { showModal } = useModal()
  const { loggedUser } = useLoggedUser()
  const { getMediaForDownload } = useMedia()
  const { isMobileResolution } = useWindowSize()

  const [isDropdownShown, setIsDropdownShown] = useState(false)

  const showRemoveMediaModal = () => {
    showModal({
      content: <RemoveMediaModal mediaId={media.id} mediaType={selectMedia.type} loadMedias={loadMedias} />,
    })
  }

  const renderMobileDropdown = useCallback(() => {
    return (
      <div className="media-actions-mobile-dropdown">
        <ul>
          <li><DownloadIcon />Download</li>
          <li><DeleteIcon />Excluir</li>
        </ul>
      </div>
    )
  }, [])

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
          {isMobileResolution ? (
            <>
              <SeeMoreIcon onClick={() => setIsDropdownShown(!isDropdownShown)} className="media-actions-see-more-icon" />
              {isDropdownShown && renderMobileDropdown()}
            </>
          ) : (
            <>
              <CircleButton variant="secondary" onClick={downloadFile} icon={<DownloadIcon />} />
              <DeleteIcon onClick={showRemoveMediaModal} className="media-actions-remove-icon" />
            </>
          )}
        </>
      )
    }

    return <CircleButton variant="secondary" onClick={downloadFile} icon={<DownloadIcon />} />
  }

  return <div className="media-actions-container">{renderActions()}</div>
}

MediaActions.propTypes = {
  media: PropTypes.object,
  selectMedia: PropTypes.func,
  loadMedias: PropTypes.func,
}

export { MediaActions }
