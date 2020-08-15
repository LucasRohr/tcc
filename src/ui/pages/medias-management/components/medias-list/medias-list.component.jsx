import React from 'react'
import PropTypes from 'prop-types'
import { MediaRow } from '../media-row/media-row.component'

const MediasList = ({ medias, changeGroupContent }) => {
  const renderMediasList = () => medias.map(media => <MediaRow media={media} changeGroupContent={changeGroupContent} />)

  return medias && medias.length ? renderMediasList() : <div className="">VAZIO JFSDNFDJFDSFKJDKFJDS</div>
}

MediasList.propTypes = {
  medias: PropTypes.arrayOf(PropTypes.object),
  changeGroupContent: PropTypes.func,
}

export { MediasList }
