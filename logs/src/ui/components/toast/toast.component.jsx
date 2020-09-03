import React from 'react'
import PropTypes from 'prop-types'
import { useToastAlert } from 'app-hooks'

import './toast.style.scss'

const Toast = ({ icon }) => {
  const { config, hideToast } = useToastAlert()

  const renderIcon = () => (icon ? <div className="toast-icon" children={icon} /> : null)

  const renderCloseButton = () => <button className="toast-close-button" onClick={hideToast} />

  const renderMessage = () => (config.message ? <div className="toast-message" children={config.message} /> : null)

  return config.isVisible ? (
    <div className={`toast-container ${config.classType}`}>
      {renderIcon()}
      {renderMessage()}
      {renderCloseButton()}
    </div>
  ) : null
}

Toast.propTypes = {
  icon: PropTypes.element,
  message: PropTypes.any.isRequired,
  additionalClass: PropTypes.string,
}

export { Toast }
