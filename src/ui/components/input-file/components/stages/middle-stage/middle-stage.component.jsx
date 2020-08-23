import React from 'react'
import PropTypes from 'prop-types'
import SITUATION_OPTIONS from './components'

import './middle-stage.style.scss'

const MiddleStage = ({ situation, removeFile, multiple, name }) => {
  const renderMiddle = () => {
    if (Object.keys(SITUATION_OPTIONS).includes(situation)) {
      const Component = SITUATION_OPTIONS[situation]
      return <Component removeFile={removeFile} multiple={multiple} name={name} />
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
}

export { MiddleStage }
