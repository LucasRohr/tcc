import React from 'react'
import PropTypes from 'prop-types'

import './progress-bar.style.scss'

const ProgressBar = ({ label }) => {
  return (
    <div className="file-progress-bar">
      <div className="file-progress-bar-header">
        <div className="file-progress-bar-media-title">{label}</div>
      </div>
      <div className="file-progress-bar-trail">
        <div className="file-progress-bar-progress" />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  label: PropTypes.string,
}

export { ProgressBar }
