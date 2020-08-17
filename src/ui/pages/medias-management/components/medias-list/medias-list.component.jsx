import React from 'react'
import PropTypes from 'prop-types'
import { MediaRow } from '../media-row/media-row.component'
import { EmptyContent } from 'app-components'
import { HERITAGE_TYPES } from 'app-constants'

import './medias-list.style.scss'

const MediasList = ({ medias, mediaType, selectMedia }) => {
  const renderMediasList = () =>
    medias.map(media => <MediaRow media={media} mediaType={mediaType} selectMedia={selectMedia} />)
  const emptyListMainMessage = `Você ainda não possui cadastros de ${HERITAGE_TYPES[mediaType].label.toLowerCase()}.`

  const renderContent = () => {
    if (medias && medias.length) {
      return <div className="medias-list-container">{renderMediasList()}</div>
    }

    return (
      <div className="empty-medias-list-container">
        <EmptyContent mainMessage={emptyListMainMessage} />
      </div>
    )
  }

  return renderContent()
}

MediasList.propTypes = {
  medias: PropTypes.arrayOf(PropTypes.object),
  selectMedia: PropTypes.func,
  mediaType: PropTypes.string.isRequired,
}

export { MediasList }
