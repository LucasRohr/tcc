import React, { useState, useEffect, useRef } from 'react'
import { inputFileValidations } from './input-file-validations'
import { InputFile } from 'app-components'
import { MEDIA_CONFIG } from 'app-constants'

const useInputFile = ({ name, label, onChange = () => {}, accept, mediaType, defaultValue, icon }) => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [isInputInvalid, setIsInputInvalid] = useState(true)
  const [firstRender, setFirstRender] = useState(true)
  const [withDefaultValue, setWithDefaultValue] = useState(false)
  const [blobUrl, setBlobUrl] = useState(null)
  const [wasUpdated, setWasUpdated] = useState(false)
  const ref = useRef()

  const scrollTo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (!withDefaultValue && defaultValue) {
      setWithDefaultValue(true)
      setWasUpdated(false)
    }
  }, [defaultValue])

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
      inputStates={{ file, blobUrl, error, firstRender, withDefaultValue }}
      inputSets={{ setFile, setBlobUrl, setError, setWithDefaultValue, setFirstRender }}
      validateFile={isFileValid}
      icon={icon}
    />
  )

  return {
    name,
    wasUpdated,
    getInputComponent,
    scrollTo,
    file,
    error,
    blobUrl,
    isValid,
    inputRef: ref,
  }
}

export { useInputFile }
