import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './error.style.scss'

const Error = ({ error, renderMiniature }) => (
  <Fragment>
    {renderMiniature()}
    <div className="file-error-message">{error}</div>
  </Fragment>
)

Error.defaultProps = {
  error: '',
}

Error.propTypes = {
  error: PropTypes.string,
  renderMiniature: PropTypes.func,
}

export { Error }
