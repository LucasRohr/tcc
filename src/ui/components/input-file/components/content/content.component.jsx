import React from 'react'
import PropTypes from 'prop-types'
import { SITUATION_FILE } from '../situation-file'
import { StartStage, MiddleStage } from '../../components'
import { noopFunction } from 'app-helpers'

import './content.style.scss'

const CLASS_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
}

const NO_FILE_TEXT = 'Nenhum arquivo selecionado'
const DEFAULT_VALUE_TEXT = 'Mídia carregada'

const Content = ({
  getRef,
  id,
  name,
  accept,
  file,
  error,
  firstRender,
  defaultValue,
  withDefaultValue,
  classType,
  setClassType,
  renderMiniature,
  removeFile,
  onChangeLocal,
  renderInfoButton,
  cancelRequest,
}) => {
  const renderContent = () => {
    let contentClassAdditional = ''
    let situation = null

    if (file) {
      contentClassAdditional = 'show-file'
      situation = SITUATION_FILE.SHOWING_OFF
    }

    if (error) {
      contentClassAdditional = 'error-file'
      situation = SITUATION_FILE.ERROR
    }

    if (defaultValue && firstRender && withDefaultValue) {
      contentClassAdditional = 'show-file'
      if (classType !== CLASS_TYPE.SUCCESS) setClassType(CLASS_TYPE.SUCCESS)
      situation = SITUATION_FILE.DEFAULT_VALUE
    }

    const checkInputFieldTooltipText = () => {
      if (file) return file.name

      if (defaultValue) return DEFAULT_VALUE_TEXT

      return NO_FILE_TEXT
    }

    const onClickClearFile = event => {
      event.target.value = ''
    }

    return (
      <div className={`input-file-content ${contentClassAdditional}`}>
        <div className="file-start-content">
          <StartStage
            situation={situation}
            file={file}
            error={error}
            defaultValue={defaultValue}
            renderMiniature={renderMiniature}
          />
        </div>
        <div className="file-middle-content">
          <MiddleStage situation={situation} removeFile={removeFile} name={name} />
          <input
            ref={getRef}
            id={id}
            name={name}
            type="file"
            className="input-file"
            onChange={event => onChangeLocal(event)}
            accept={accept}
            onClick={event => onClickClearFile(event)}
            title={checkInputFieldTooltipText()}
          />
        </div>
        <div className="file-end-content">{renderInfoButton()}</div>
      </div>
    )
  }

  return renderContent()
}

Content.defaultProps = {
  defaultValue: null,
  file: null,
  error: '',
  renderMiniature: noopFunction,
  removeFile: noopFunction,
  onChangeLocal: noopFunction,
  renderInfoButton: noopFunction,
  cancelRequest: noopFunction,
}

Content.propTypes = {
  getRef: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  file: PropTypes.object,
  error: PropTypes.string,
  firstRender: PropTypes.bool.isRequired,
  defaultValue: PropTypes.object,
  withDefaultValue: PropTypes.bool,
  classType: PropTypes.string,
  setClassType: PropTypes.func,
  renderMiniature: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  onChangeLocal: PropTypes.func.isRequired,
  renderInfoButton: PropTypes.func.isRequired,
  cancelRequest: PropTypes.func.isRequired,
}

export { Content }
