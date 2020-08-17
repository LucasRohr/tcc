import React from 'react'
import PropTypes from 'prop-types'
import { CircleButton } from 'app-components'
import { DeleteIcon } from 'app-icons'
import { HeirsManagementIcon, DownloadIcon } from 'ui/icons/shapes/index'
import { noopFunction } from 'app-helpers'

import './media-actions.style.scss'

const MediaActions = ({ media }) => {
  return (
    <div className="media-actions-container">
      <CircleButton variant="secondary" onClick={noopFunction} icon={<HeirsManagementIcon />} />
      <CircleButton variant="secondary" onClick={noopFunction} icon={<DownloadIcon />} />
      <DeleteIcon className="media-actions-remove-icon" />
    </div>
  )
}

MediaActions.propTypes = {
  media: PropTypes.object,
}

export { MediaActions }
