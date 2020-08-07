import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Input } from 'app-components'
import { requiredValidator } from 'app-validators'
import { useTimeout } from '../use-timeout/use-timeout.hook'

const useInput = ({
  name,
  label: initialLabel,
  onChange = () => {},
  onBlur = () => {},
  type,
  validators = [],
  formatters = [],
  usePassword = false,
  disabled = false,
  required = true,
  defaultValue,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('')
  const [initialValue, setInitialValue] = useState('')
  const [error, setError] = useState('')
  const [label, setLabel] = useState(initialLabel)
  const [hasFocus, setHasFocus] = useState(false)
  const [wasUpdated, setWasUpdated] = useState(false)
  const [isReadyToValidate, setIsReadyToValidate] = useState(false)
  const [isInputDisabled, setIsInputDisabled] = useState(disabled)
  const [isInputRequired, setIsInputRequired] = useState(required)

  const { getDebounce } = useTimeout()
  const onChangeValidatorDebounce = useMemo(getDebounce, [])

  const ref = useRef()

  useEffect(() => {
    if (isReadyToValidate) {
      onChangeValidatorDebounce(isValid, 150)
    }
  }, [inputValue, isReadyToValidate])

  useEffect(() => {
    if (!initialValue && defaultValue) {
      setInputValue(defaultValue)
    }

    if (initialValue !== inputValue) {
      setInputValue(initialValue)
      setWasUpdated(false)
      setIsReadyToValidate(true)
    }
  }, [initialValue, defaultValue])

  useEffect(() => {
    if (isInputDisabled) {
      setError('')
    }
  }, [isInputDisabled])

  useEffect(() => {
    if (!isInputRequired) {
      setError('')
    }
  }, [isInputRequired])

  const scrollTo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getFormattedValue = value => {
    return formatters.reduce((acc, formatter) => formatter(acc), value)
  }

  const handleChange = useCallback((event, incomingValue) => {
    if (event.preventDefault) {
      event.preventDefault()
    }

    const value = incomingValue !== undefined ? incomingValue : event.currentTarget.value || ''
    const formattedValue = getFormattedValue(value)

    setInputValue(formattedValue)
    setWasUpdated(true)
    onChange(formattedValue)
  }, [])

  const setOnBlur = fn => {
    onBlur = fn
  }

  const handleBlur = () => {
    setIsReadyToValidate(true)
    setHasFocus(false)
    onBlur()
  }

  const handleFocus = () => {
    setHasFocus(true)
  }

  const isValid = async ({ ignoreInputErrors = false } = {}) => {
    if (!ignoreInputErrors) {
      setError('')
    }

    if (!isInputRequired && !inputValue) {
      return true
    }

    const validations = isInputRequired ? [value => requiredValidator({ value }), ...validators] : validators

    /* eslint-disable no-unused-vars */
    for (const validation of validations) {
      const message = await validation(inputValue)

      if (message) {
        if (!ignoreInputErrors) {
          setError(message)
        }

        return false
      }
    }
    /* eslint-enable no-unused-vars */

    return true
  }

  const changeInputValue = value => {
    if (value !== inputValue) {
      handleChange({}, value)
    }
  }

  const resetInput = () => {
    setIsReadyToValidate(false)
    setWasUpdated(false)
    setError('')
    setInputValue('')
  }

  const getInputComponent = key => (
    <Input
      {...props}
      key={key}
      getRef={ref}
      name={name}
      onChange={handleChange}
      type={type}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={inputValue}
      label={label}
      error={error}
      usePassword={usePassword}
      disabled={isInputDisabled}
      changeInputValue={changeInputValue}
    />
  )

  return {
    getInputComponent,
    setInitialValue,
    wasUpdated,
    scrollTo,
    hasFocus,
    isValid,
    error,
    setError,
    name,
    inputRef: ref,
    value: inputValue,
    changeInputValue,
    setOnBlur,
    disabled: isInputDisabled,
    setDisabled: setIsInputDisabled,
    required: isInputRequired,
    setRequired: setIsInputRequired,
    label,
    setLabel,
    resetInput,
  }
}

export { useInput }
