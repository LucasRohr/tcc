import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { convertBlobToDataUrl, noopFunction } from 'app-helpers'
import { HERITAGE_TYPES } from 'app-constants'
import { Content } from './components'

import './input-file.style.scss'

const CLASS_TYPE = {
  SUCCESS: 'input-file-success',
  ERROR: 'input-file-error',
}

const InputFile = ({
  getRef,
  id,
  name,
  onChange,
  accept,
  mediaType,
  label,
  defaultValue,
  inputStates,
  inputSets,
  validateFile,
  icon,
}) => {
  const [overDrag, setOverDrag] = useState(false)
  const [classType, setClassType] = useState('')

  const dropzoneClass = ['file-dropzone', classType].join(' ')

  const { file, blobUrl, error, firstRender, withDefaultValue } = inputStates
  const { setFile, setBlobUrl, setError, setWithDefaultValue, setFirstRender } = inputSets

  const addFile = async (event, file) => {
    if (!file) return

    const check = await validateFile(file)

    if (check) {
      setFile(null)
      setClassType(CLASS_TYPE.ERROR)
      setError(check)
      return
    }

    startUpload(file)
  }

  const onChangeLocal = event => {
    event.persist()
    setFile(null)
    setBlobUrl(null)

    const currentFile = event.target.files[0]
    setWithDefaultValue(false)
    addFile(event, currentFile)
    setFirstRender(false)
  }

  const onDragLeaveAction = event => {
    event.preventDefault()
    event.stopPropagation()

    overDrag && setOverDrag(false)
  }

  const onDragOverAction = event => {
    event.preventDefault()
    event.stopPropagation()

    !overDrag && setOverDrag(true)
  }

  const onDropAction = event => {
    event.stopPropagation()
    event.persist()

    const currentFile = event.dataTransfer.files[0]
    addFile(event, currentFile)
  }

  const onClickClearFile = event => {
    event.target.value = ''
  }

  const removeFile = () => {
    const value = { [name]: null }

    if (getRef && getRef.current) {
      getRef.current.value = null
      setFile(null)
      setBlobUrl(null)
      setClassType('')
      setWithDefaultValue(false)
      onChange(value)
    }
  }

  const cancelRequest = () => {
    removeFile()
  }

  const startUpload = async file => {
    setFile(file)
    setClassType(CLASS_TYPE.SUCCESS)
    onChange(file)
  }

  const createBlobURL = async file => {
    const url = await convertBlobToDataUrl(file)

    setBlobUrl(url)
  }

  const renderMiniature = (url = null) => {
    if (icon) {
      return !error ? (
        <div className="media-miniature-preview">
          <div className="media-icon">{icon}</div>
        </div>
      ) : null
    }

    if (!file && !url) return

    if (file) {
      createBlobURL(file)
    }

    if (url && !blobUrl) {
      setBlobUrl(url)
    }

    if (blobUrl) {
      if (mediaType === HERITAGE_TYPES.VIDEO.key) {
        return (
          <div className="media-miniature-preview">
            <video className="media-icon">
              <source src={blobUrl} />
            </video>
          </div>
        )
      }

      return (
        <div className="media-miniature-preview">
          <img className="media-icon" src={blobUrl} alt="Miniatura da mídia de upload" />
        </div>
      )
    }

    return null
  }

  return (
    <div className="input-media">
      {label && <label className="input-file-label">{label}</label>}
      <div
        className={dropzoneClass}
        onDragOver={onDragOverAction}
        onDragLeave={onDragLeaveAction}
        onDrop={onDropAction}
      >
        <Content
          getRef={getRef}
          id={id}
          name={name}
          accept={accept}
          file={file}
          error={error}
          firstRender={firstRender}
          defaultValue={defaultValue}
          withDefaultValue={withDefaultValue}
          classType={classType}
          setClassType={setClassType}
          renderMiniature={renderMiniature}
          removeFile={removeFile}
          onChangeLocal={onChangeLocal}
          cancelRequest={cancelRequest}
          onClickClearFile={onClickClearFile}
        />
      </div>
    </div>
  )
}

InputFile.defaultProps = {
  defaultValue: null,
  onChange: noopFunction,
}

InputFile.propTypes = {
  getRef: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.object,
  inputStates: PropTypes.object.isRequired,
  inputSets: PropTypes.object.isRequired,
  validateFile: PropTypes.func.isRequired,
  icon: PropTypes.element,
}

export { InputFile }
