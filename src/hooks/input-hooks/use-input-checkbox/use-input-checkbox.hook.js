import React, { useState, useEffect, createRef } from 'react'
import { Checkbox } from 'app-components'
import { requiredCheckboxValidator } from 'app-validators'

const useInputCheckbox = ({
  id,
  name,
  validators = [],
  onChange = () => {},
  defaultValue,
  label,
  required = true,
  useDefaultCheck = false,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState('')
  const ref = createRef()

  useEffect(() => {
    if (defaultValue && defaultValue !== isChecked) {
      setIsChecked(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    if (error) {
      isValid()
    }
  }, [isChecked])

  const scrollTo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCheck = event => {
    setIsChecked(!isChecked)
    onChange(event)
  }

  const isValid = () => {
    setError('')

    if (required) {
      const message = requiredCheckboxValidator({ isChecked })

      if (message) {
        setError(message)
      }

      return !message
    }

    return true
  }

  const getInputCheckboxComponent = key => (
    <Checkbox
      key={key}
      id={id}
      name={name}
      isChecked={useDefaultCheck ? defaultValue : isChecked}
      onChange={handleCheck}
      error={error}
      label={label}
      getRef={ref}
      {...props}
    />
  )

  return {
    scrollTo,
    inputRef: ref,
    isChecked,
    setIsChecked,
    isValid,
    error,
    getInputCheckboxComponent,
    getInputComponent: key => getInputCheckboxComponent(key),
    name,
    label,
  }
}

export { useInputCheckbox }
