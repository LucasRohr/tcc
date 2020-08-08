import React from 'react'
import PropTypes from 'prop-types'

import './button.style.scss'

const VARIANTS_CLASSES = {
  primary: 'primary-button',
  secondary: 'secondary-button',
  light: 'light-button',
}

const Button = ({ className, children, variant, onClick, type, disabled, dataSelector, tabIndex, ...props }) => {
  return (
    <button
      type={type}
      className={`${className} ${VARIANTS_CLASSES[variant]}`}
      onClick={onClick}
      disabled={disabled}
      children={children}
      tabIndex={tabIndex}
      {...props}
    />
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'light']),
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  className: String(),
  variant: 'primary',
  type: 'button',
}

export { Button }
