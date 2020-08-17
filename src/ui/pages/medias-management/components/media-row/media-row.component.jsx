import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { DocumentIcon, PlayIcon } from 'app-icons'
import { Text } from 'app-components'
import { MediaActions } from '../media-actions/media-actions.component'

import './media-row.style.scss'

const MEDIA_FORM_CONTENT = 'MEDIA_FORM'

const MediaRow = ({ media, mediaType, selectMedia }) => {
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

  return (
    <div className="media-row-container" onClick={() => selectMedia(media)}>
      <div>
        {renderMediaAsset()}
        <Text variant="sans-serif">{media.name}</Text>
      </div>

      <MediaActions media={media} />
    </div>
  )
}

MediaRow.propTypes = {
  media: PropTypes.object,
  mediaType: PropTypes.string.isRequired,
  selectMedia: PropTypes.func,
}

export { MediaRow }
