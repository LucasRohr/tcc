import React, { useState, useEffect, useRef, useMemo } from 'react'
import { inputFileValidations } from './input-file-validations'
import { InputFile } from 'app-components'
import { MEDIA_CONFIG } from 'app-constants'
import { useTimeout } from 'app-hooks'
import { convertBase64toBlob } from 'app-helpers'

const useInputFile = ({ name, label, onChange = () => {}, accept, mediaType, defaultValue, icon, multiple }) => {
  const [file, setFile] = useState(null)
  const [filesList, setFilesList] = useState([])

  const [invalidFiles, setInvalidFiles] = useState([])

  const [error, setError] = useState('')
  const [isInputInvalid, setIsInputInvalid] = useState(true)
  const [firstRender, setFirstRender] = useState(true)
  const [withDefaultValue, setWithDefaultValue] = useState(false)

  const [classType, setClassType] = useState('')

  const [blobUrl, setBlobUrl] = useState(null)
  const [blobUrlList, setBlobUrlList] = useState(null)

  const [wasUpdated, setWasUpdated] = useState(false)

  const ref = useRef()
  const { getDebounce } = useTimeout()

  const debounce = useMemo(getDebounce, [])

  const scrollTo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const setDefaultValueStates = () => {
    const fileBlob = convertBase64toBlob(defaultValue)

    debounce(() => {
      setWithDefaultValue(true)
      setWasUpdated(false)
      setFile(fileBlob)
      setBlobUrl(fileBlob)
    }, 500)
  }

  useEffect(() => {
    if (!withDefaultValue && defaultValue) {
      setDefaultValueStates()
    }
  }, [defaultValue])

  const setInitialValue = value => {
    setFile(value)
  }

  const isFileValid = async fileParam => {
    const validationFile = fileParam || file
    const inputValidation = await inputFileValidations(validationFile, accept, mediaType, MEDIA_CONFIG)

    setError(inputValidation)

    if (inputValidation) {
      setIsInputInvalid(true)
    } else {
      setIsInputInvalid(false)
    }
    return inputValidation
  }

  const isValid = ({ ignoreInputErrors = false } = {}) => {
    if (withDefaultValue) {
      return true
    }

    const hasInvalidField = (isInputInvalid && !error) || !file

    if (hasInvalidField && !ignoreInputErrors) {
      setError('Upload obrigatório.')
    } else {
      setError('')
    }

    return !isInputInvalid
  }

  const handleChange = (event, requestResult) => {
    setWasUpdated(true)
    onChange(event, requestResult)
  }

  const getInputComponent = key => (
    <InputFile
      key={key}
      getRef={ref}
      name={name}
      label={label}
      onChange={handleChange}
      accept={accept}
      mediaType={mediaType}
      defaultValue={defaultValue}
      inputStates={{
        file,
        filesList,
        invalidFiles,
        blobUrl,
        blobUrlList,
        error,
        firstRender,
        withDefaultValue,
        classType,
      }}
      inputSets={{
        setFile,
        setFilesList,
        setInvalidFiles,
        setBlobUrl,
        setBlobUrlList,
        setError,
        setWithDefaultValue,
        setFirstRender,
        setClassType,
      }}
      validateFile={isFileValid}
      icon={icon}
      multiple={multiple}
    />
  )

  const resetInput = () => {
    setFile(null)
    setFilesList([])
    setInvalidFiles([])
    setBlobUrl(null)
    setBlobUrlList([])
    setWithDefaultValue(false)
    setFirstRender(true)
    setIsInputInvalid(false)
    setWasUpdated(false)
    setClassType('')
    setError('')
  }

  return {
    name,
    wasUpdated,
    getInputComponent,
    scrollTo,
    file,
    setInitialValue,
    filesList,
    error,
    blobUrl,
    blobUrlList,
    isValid,
    inputRef: ref,
    resetInput,
  }
}

export { useInputFile }
