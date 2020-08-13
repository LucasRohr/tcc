import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './dropbox.style.scss'

const Dropbox = ({ children, isOpen, toggleOpen, isCircleButton, clicked, additionalClass }) => {
  const renderOfType = Component =>
    React.Children.map(children, child => {
      const component = <Component />
      if (component.type === child.type) {
        return child
      }
    })

  const renderButton = renderOfType(Dropbox.Button)
  const renderContent = renderOfType(Dropbox.Content)

  const renderMenu = () => {
    if (!isOpen) return

    return (
      <Fragment>
        <div className="dropbox-content">{renderContent}</div>
        <div onClick={toggleOpen} className="dropbox-blocker" />
      </Fragment>
    )
  }

  const circleButtonClasses = () => {
    return clicked ? 'dropbox-selected-circle-button' : 'dropbox-circle-button'
  }

  return (
    <div className={`dropbox-container ${additionalClass}`}>
      <button
        onClick={toggleOpen}
        id="button_dropbox"
        className={isCircleButton ? circleButtonClasses() : 'dropbox-button'}
      >
        {isOpen && <div className="dropbox-invisible-status" />}
        {renderButton}
      </button>
      {renderMenu()}
    </div>
  )
}

Dropbox.Button = ({ children }) => children
Dropbox.Content = ({ children }) => children

Dropbox.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func,
  isCircleButton: PropTypes.bool,
  clicked: PropTypes.bool,
  additionalClass: PropTypes.string,
}

export { Dropbox }
