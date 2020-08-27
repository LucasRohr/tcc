import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './default-value.style.scss'

const DefaultValue = ({ defaultValue, file, multiple, renderMiniature }) => {
  const renderContent = () => {
    const defaultValueUrl = defaultValue && defaultValue.url

    if (multiple) {
      return renderMiniature()
    }

    return (
      <Fragment>
        {renderMiniature(!file ? defaultValueUrl : null)}
        <span className="input-file-name">{!file ? 'Mídia carregada' : file.name}</span>
      </Fragment>
    )
  }

  return renderContent()
}

DefaultValue.propTypes = {
  defaultValue: PropTypes.object,
  renderMiniature: PropTypes.func,
  file: PropTypes.object,
  multiple: PropTypes.bool,
}

export { DefaultValue }
