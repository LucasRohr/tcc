import React from 'react'
import PropTypes from 'prop-types'
import { CheckIcon } from 'app-icons'
import { noopFunction } from 'app-helpers'
import { Error } from '../error/error.component'

import './checkbox.style.scss'

const SPACEBAR_KEY_CODE = 32

const Checkbox = ({ additionalClass, id, getRef, name, isChecked, onChange, error, label, ...props }) => {
  const handleKeyDown = event => {
    if (event.keyCode === SPACEBAR_KEY_CODE) {
      event.preventDefault()
      onChange(event)
    }
  }

  const renderText = () => {
    return label && <div variant="sans-serif">{label}</div>
  }

  const renderError = () => {
    return error ? <Error error={error} /> : null
  }

  return (
    <div className={`checkbox-wrapper ${additionalClass}`}>
      <input
        id={id}
        ref={getRef}
        className="checkbox-input"
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        {...props}
      />
      <label className="checkbox-label" htmlFor={id}>
        <CheckIcon className="checkbox-icon" onKeyDown={handleKeyDown} />
        {renderText()}
      </label>

      {renderError()}
    </div>
  )
}

Checkbox.defaultProps = {
  getRef: null,
  name: 'checkbox',
  onChange: noopFunction,
  label: null,
  error: null,
}

Checkbox.propTypes = {
  id: PropTypes.string,
  getRef: PropTypes.object,
  isChecked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.string,
}

export { Checkbox }
