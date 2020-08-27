import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DocumentIcon, PlayIcon, DropdownIcon } from 'app-icons'
import { Text } from 'app-components'
import { useLoggedUser } from 'app-hooks'
import { MediaActions } from '../media-actions/media-actions.component'
import { ROLES } from 'app-constants'

import './media-row.style.scss'

const MediaRow = ({ media, mediaType, selectMedia }) => {
  const [isClosed, setIsClosed] = useState(false)

  const { loggedUser } = useLoggedUser()

  const isHeirAccount = loggedUser.currentAccount.type === ROLES.HEIR

  const applyConditionalClass = (positive, negative) => (isClosed ? negative : positive)

  const conditionalArrowClass = useMemo(() => applyConditionalClass('media-row-arrow-down', 'media-row-arrow-up'), [
    isClosed,
  ])

  const conditionalContentClass = useMemo(
    () => applyConditionalClass('media-row-content-collapsed', 'media-row-content-expanded'),
    [isClosed]
  )

  const renderImageAsset = () => (
    <div className="media-row-image-asset-container">
      <img src={media.file} alt={media.name} />
    </div>
  )

  const renderVideoAsset = () => (
    <div className="media-row-video-asset-container">
      <PlayIcon className="media-row-video-icon" />
    </div>
  )

  const renderDocumentAsset = () => <DocumentIcon className="media-row-document-icon" />

  const MEDIA_ASSETS = useMemo(
    () => ({
      IMAGE: renderImageAsset(),

      VIDEO: renderVideoAsset(),

      DOCUMENT: renderDocumentAsset(),
    }),
    []
  )

  const renderMediaAsset = () => MEDIA_ASSETS[mediaType]

  const renderMediaDescription = () => (
    <div className={conditionalContentClass}>
      <Text>Descrição: {media.description || 'Nenhuma descrição adicionada.'}</Text>
    </div>
  )

  const renderRowDropdown = () =>
    isHeirAccount ? <DropdownIcon onClick={() => setIsClosed(!isClosed)} className={conditionalArrowClass} /> : null

  return (
    <div className="media-row-wrapper">
      <div className="media-row-container">
        <div>
          {renderMediaAsset()}
          <Text variant="sans-serif">{media.name}</Text>
        </div>

        <div>
          <MediaActions media={media} selectMedia={selectMedia} />
          {renderRowDropdown()}
        </div>
      </div>

      {renderMediaDescription()}
    </div>
  )
}

MediaRow.propTypes = {
  media: PropTypes.object,
  mediaType: PropTypes.string.isRequired,
  selectMedia: PropTypes.func,
}

export { MediaRow }
