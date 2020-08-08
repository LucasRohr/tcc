import React from 'react'
import { EyeIcon } from 'app-icons'

import './password-visible-toggler.style.scss'

const PasswordVisibleToggler = ({ isVisible, onClick }) => {
  const handleClick = e => {
    onClick(!isVisible)
  }

  const mountIconClass = () => {
    return isVisible ? 'input-password-icon-visible' : 'input-password-icon'
  }

  return (
    <button className="input-password-toggler" onClick={handleClick}>
      <EyeIcon className={mountIconClass()} />
    </button>
  )
}

export { PasswordVisibleToggler }
