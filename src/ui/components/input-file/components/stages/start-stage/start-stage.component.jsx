import React from 'react'
import PropTypes from 'prop-types'
import { EmptyIcon } from 'app-icons'
import SITUATION_OPTIONS from './components'

const StartStage = ({ situation, file, error, defaultValue, renderMiniature }) => {
  const renderStart = () => {
    if (Object.keys(SITUATION_OPTIONS).includes(situation)) {
      const Component = SITUATION_OPTIONS[situation]
      return <Component renderMiniature={renderMiniature} file={file} error={error} defaultValue={defaultValue} />
    }

    return <EmptyIcon width="45" />
  }

  return renderStart()
}

StartStage.defaultProps = {
  file: null,
  error: '',
}

StartStage.propTypes = {
  situation: PropTypes.string,
  file: PropTypes.object,
  error: PropTypes.string,
  defaultValue: PropTypes.object,
  renderMiniature: PropTypes.func,
}

export { StartStage }
