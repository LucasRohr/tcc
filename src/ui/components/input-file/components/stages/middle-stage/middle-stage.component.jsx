import React from 'react'
import PropTypes from 'prop-types'
import SITUATION_OPTIONS from './components'

import './middle-stage.style.scss'

const MiddleStage = ({ situation, removeFile, multiple, hasFiles, name }) => {
  const renderMiddle = () => {
    if (Object.keys(SITUATION_OPTIONS).includes(situation)) {
      const Component = SITUATION_OPTIONS[situation]
      return <Component removeFile={removeFile} multiple={multiple} name={name} hasFiles={hasFiles} />
    }

    return (
      <div className="file-initial-description">
        Arrastar ou <label className="file-highlight">procurar arquivo</label>
      </div>
    )
  }

  return renderMiddle()
}

MiddleStage.propTypes = {
  removeFile: PropTypes.func,
  name: PropTypes.string,
  hasFiles: PropTypes.bool,
  multiple: PropTypes.bool,
}

export { MiddleStage }
