import React from 'react'
import PropTypes from 'prop-types'
import { MediaRow } from '../media-row/media-row.component'
import { EmptyContent, Pagination } from 'app-components'
import { HERITAGE_TYPES } from 'app-constants'

import './medias-list.style.scss'

const MediasList = ({ paginationConfig, getMedias, medias, mediaType, selectMedia }) => {
  const emptyListMainMessage = `Não existem ${HERITAGE_TYPES[mediaType].label.toLowerCase()} para visualização`

  const renderMediasList = () =>
    medias.map(media => (
      <MediaRow media={media} mediaType={mediaType} selectMedia={selectMedia} loadMedias={getMedias} />
    ))

  const renderContent = () => {
    if (medias && medias.length) {
      return (
        <div className="medias-list-container">
          {renderMediasList()}

          <Pagination
            onChange={getMedias}
            paginationConfig={paginationConfig}
            additionalClass="medias-pagination-container"
          />
        </div>
      )
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
  paginationConfig: PropTypes.object,
  getMedias: PropTypes.func,
  medias: PropTypes.arrayOf(PropTypes.object),
  selectMedia: PropTypes.func,
  mediaType: PropTypes.string.isRequired,
}

export { MediasList }
