import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { noopFunction } from 'app-helpers'
import { CalendarIcon } from 'app-icons'
import { Counter, PasswordVisibleToggler } from './components'
import { Error } from '../error/error.component'

import './input.style.scss'

const VARIANTS_CLASSES = {
  medium: 'input-container-medium',
  larger: 'input-container-larger',
  withoutMargins: 'input-container-without-margins',
  full: 'input-container-full',
}

const Input = ({
  variant,
  disabled,
  name,
  type,
  value,
  placeholder,
  getRef,
  onChange,
  onBlur,
  onFocus,
  label,
  error,
  showCounter,
  maxLength,
  usePassword,
  canShowDatepickerIcon,
  changeInputValue,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [currentType, setCurrentType] = useState(type)

  const mountInputGroupClass = () => {
    if (disabled) {
      return 'input-and-label-disabled'
    }

    if (error) {
      return 'input-and-label-with-error'
    }

    return 'input-and-label'
  }

  const renderDatepickerIcon = () => (canShowDatepickerIcon ? <CalendarIcon className="input-calendar-icon" /> : null)

  const renderPasswordIcon = () => {
    return usePassword ? <PasswordVisibleToggler isVisible={isPasswordVisible} onClick={setIsPasswordVisible} /> : null
  }

  const renderError = () => {
    return error ? <Error error={error} padLeft={true} /> : null
  }

  const renderCounter = () => {
    return showCounter ? <Counter valueLength={value.length} maxLength={maxLength} /> : null
  }

  useEffect(() => {
    if (usePassword) {
      if (isPasswordVisible) {
        setCurrentType('text')
      } else {
        setCurrentType('password')
      }
    }
  }, [isPasswordVisible])

  return (
    <div className={VARIANTS_CLASSES[variant]}>
      <div className={mountInputGroupClass()}>
        <input
          {...props}
          className="input"
          disabled={disabled}
          id={name}
          name={name}
          type={currentType}
          value={value || ''}
          placeholder={placeholder}
          ref={getRef}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          maxLength={maxLength}
        />
        <label className="input-label" htmlFor={name}>
          {label}
        </label>
        {renderDatepickerIcon()}
        {renderPasswordIcon()}
      </div>
      {renderError()}
      {renderCounter()}
    </div>
  )
}

Input.propTypes = {
  variant: PropTypes.oneOf(['medium', 'larger', 'withoutMargins', 'full']),
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  getRef: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  label: PropTypes.string,
  showCounter: PropTypes.bool,
  usePassword: PropTypes.bool,
}

Input.defaultProps = {
  variant: 'medium',
  disabled: false,
  type: 'text',
  placeholder: ' ',
  onBlur: noopFunction,
  onFocus: noopFunction,
  showCounter: false,
  usePassword: false,
}

export { Input }
