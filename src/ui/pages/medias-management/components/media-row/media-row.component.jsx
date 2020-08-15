import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const MediaRow = ({ media, changeGroupContent }) => {
  const MEDIA_ASSETS = useMemo(() => {}, [])

  const renderMediaAsset = () => {}

  return <div className="media-row-container"></div>
}

MediaRow.propTypes = {
  media: PropTypes.object,
  changeGroupContent: PropTypes.func,
}

export { MediaRow }
