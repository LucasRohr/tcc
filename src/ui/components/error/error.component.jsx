import React from 'react'
import PropTypes from 'prop-types'

import './error.style.scss'

const Error = ({ error }) => {
  return <div className="error">{error}</div>
}

Error.defaultProps = {
  padLeft: false,
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
  padLeft: PropTypes.bool,
}

export { Error }
