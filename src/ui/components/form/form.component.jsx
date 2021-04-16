import React from 'react'
import PropTypes from 'prop-types'

import { noopFunction } from 'app-helpers'

import './form.style.scss'

const Form = ({ className, content, buttons, onSubmit, isValid, errorMessage }) => {
  const handleSubmit = async event => {
    event.preventDefault()

    if (await isValid()) {
      onSubmit()
    }
  }

  const formContent = () => {
    return <div className="form-body">{content()}</div>
  }

  const formButtons = () => {
    return <div className="form-buttons">{buttons()}</div>
  }

  return (
    <form className={`form-common ${className}`} onSubmit={handleSubmit} noValidate>
      {formContent()}
      {errorMessage()}
      {formButtons()}
    </form>
  )
}

Form.defaultProps = {
  className: '',
}

Form.propTypes = {
  content: PropTypes.func.isRequired,
  buttons: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
  errorMessage: PropTypes.func
}

Form.defaultProps = {
  errorMessage: noopFunction
}

export { Form }
