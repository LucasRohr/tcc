import React from 'react'
import PropTypes from 'prop-types'
import { EmptyIcon } from 'app-icons'
import { Text } from '../text/text.component'

import './empty-content.style.scss'

const EmptyContent = ({ className, mainMessage, additionalMessage }) => {
  return (
    <div className={`empty-content-container ${className}`}>
      <div className="empty-content-icons-container">
        <EmptyIcon className="empty-content-first-icon" />
        <EmptyIcon className="empty-content-middle-icon" />
        <EmptyIcon className="empty-content-last-icon" />
      </div>

      <div className="empty-content-messages-container">
        <Text variant="sans-serif">{mainMessage}</Text>
        <Text variant="sans-serif">{additionalMessage}</Text>
      </div>
    </div>
  )
}

EmptyContent.propTypes = {
  mainMessage: PropTypes.string.isRequired,
  additionalMessage: PropTypes.string,
  className: PropTypes.string,
}

export { EmptyContent }
