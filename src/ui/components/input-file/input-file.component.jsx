import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { convertBlobToDataUrl, noopFunction } from 'app-helpers'
import { HERITAGE_TYPES } from 'app-constants'
import { Content } from './components'

import './input-file.style.scss'
import { Text } from '../text/text.component'

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
  multiple,
}) => {
  const [overDrag, setOverDrag] = useState(false)

  const { file, filesList, invalidFiles, blobUrl, error, firstRender, withDefaultValue, classType } = inputStates

  const {
    setFile,
    setFilesList,
    setInvalidFiles,
    setBlobUrl,
    setBlobUrlList,
    setError,
    setWithDefaultValue,
    setFirstRender,
    setClassType,
  } = inputSets

  const dropzoneClass = ['file-dropzone', classType].join(' ')

  const addFile = async (event, file) => {
    if (!file) return

    const check = await validateFile(file)

    if (check) {
      setFile(null)
      setClassType(CLASS_TYPE.ERROR)
      setError(check)
      return
    }

    setFile(file)
    setClassType(CLASS_TYPE.SUCCESS)
    onChange(file)
  }

  const addMultipleFiles = async (event, files) => {
    if (!files && !files.length) return

    let validFiles = []
    let invalidFiles = []

    /* eslint-disable no-unused-vars */
    for (const file of files) {
      const check = await validateFile(file)

      if (check) {
        invalidFiles.push(file)
      } else {
        validFiles.push(file)
      }
    }
    /* eslint-enable no-unused-vars */

    setFilesList(validFiles)
    setInvalidFiles(invalidFiles)
    setClassType(invalidFiles.length ? CLASS_TYPE.ERROR : CLASS_TYPE.SUCCESS)
    onChange(files, invalidFiles)
  }

  const onChangeLocal = event => {
    event.persist()
    setFile(null)
    setBlobUrl(null)
    setFilesList([])
    setBlobUrlList([])

    if (multiple) {
      const files = event.target.files
      setWithDefaultValue(false)
      addMultipleFiles(event, files)
      setFirstRender(false)
    } else {
      const currentFile = event.target.files[0]
      setWithDefaultValue(false)
      addFile(event, currentFile)
      setFirstRender(false)
    }
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

    if (multiple) {
      const files = event.dataTransfer.files
      addMultipleFiles(event, files)
    } else {
      const currentFile = event.dataTransfer.files[0]
      addFile(event, currentFile)
    }
  }

  const onClickClearFile = event => {
    event.target.value = ''
  }

  const removeFile = () => {
    if (getRef && getRef.current) {
      if (multiple) {
        getRef.current.value = null
        setFilesList([])
        setInvalidFiles([])
        setBlobUrlList(null)
        setClassType('')
        setWithDefaultValue(false)
      } else {
        const value = { [name]: null }

        getRef.current.value = null
        setFile(null)
        setBlobUrl(null)
        setClassType('')
        setWithDefaultValue(false)
        onChange(value)
      }
    }
  }

  const cancelRequest = () => {
    removeFile()
  }

  const createBlobURL = async file => {
    const url = await convertBlobToDataUrl(file)
    setBlobUrl(url)
  }

  const renderMiniature = (url = null) => {
    if (multiple) {
      const filesListSize = filesList && filesList.length
      const invalidFilesSize = invalidFiles && invalidFiles.length

      const validMediasLabel = filesListSize > 1 ? 'mídias adicionadas' : 'mídia adicionada'
      const invalidMediasLabel = invalidFilesSize > 1 ? 'mídias inválidas' : 'mídia inválida'

      return (
        <div className="input-file-multiple-label-container">
          {filesListSize ? (
            <Text variant="sans-serif" className="input-file-multiple-valid-label">
              {filesListSize} {validMediasLabel}
            </Text>
          ) : null}

          {invalidFilesSize ? (
            <Text variant="sans-serif" className="input-file-multiple-invalid-label">
              {invalidFilesSize} {invalidMediasLabel}
            </Text>
          ) : null}
        </div>
      )
    }

    if (mediaType === HERITAGE_TYPES.DOCUMENT.key) {
      const DocumentIcon = HERITAGE_TYPES.DOCUMENT.icon

      return (
        <div className="media-miniature-preview">
          <DocumentIcon className="media-document-icon" />
        </div>
      )
    }

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
          filesList={filesList}
          invalidFiles={invalidFiles}
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
          multiple={multiple}
        />
      </div>
    </div>
  )
}

InputFile.defaultProps = {
  defaultValue: null,
  onChange: noopFunction,
  multiple: false,
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
  multiple: PropTypes.bool,
}

export { InputFile }
