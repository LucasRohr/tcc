import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { useWindowSize } from 'app-hooks'

import './dropbox.style.scss'

const MIN_NOTIFICATION_MOBILE_WIDTH = 650

const Dropbox = ({ children, isOpen, toggleOpen, isCircleButton, clicked, additionalClass }) => {
  const { windowSize } = useWindowSize()
  const isMobileSize = windowSize.width <= MIN_NOTIFICATION_MOBILE_WIDTH

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
    if (isOpen) {
      return (
        <Fragment>
          <div className="dropbox-content">{renderContent}</div>
          <div onClick={toggleOpen} className="dropbox-blocker" />
        </Fragment>
      )
    }

    return null
  }

  const circleButtonClasses = () => {
    return clicked ? 'dropbox-selected-circle-button' : 'dropbox-circle-button'
  }

  return (
    <>
      <div className={`dropbox-container ${additionalClass}`}>
        <button
          onClick={toggleOpen}
          id="button_dropbox"
          className={isCircleButton ? circleButtonClasses() : 'dropbox-button'}
        >
          {isOpen && <div className="dropbox-invisible-status" />}
          {renderButton}
        </button>
        {!isMobileSize ? renderMenu() : null}
      </div>

      {isMobileSize ? renderMenu() : null}
    </>
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
