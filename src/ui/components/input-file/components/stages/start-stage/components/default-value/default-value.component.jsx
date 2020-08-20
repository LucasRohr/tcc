import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './default-value.style.scss'

const DefaultValue = ({ defaultValue, file, renderMiniature }) => (
  <Fragment>
    {renderMiniature(!file ? defaultValue.url : null)}
    <span className="input-file-name">{!file ? 'Mídia carregada' : file.name}</span>
  </Fragment>
)

DefaultValue.propTypes = {
  defaultValue: PropTypes.object,
  renderMiniature: PropTypes.func,
  file: PropTypes.object,
}

export { DefaultValue }
