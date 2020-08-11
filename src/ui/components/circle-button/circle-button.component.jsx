import React from 'react'
import PropTypes from 'prop-types'

import './circle-button.style.scss'

const VARIANTS_CLASSES = {
  primary: 'primary-circle-button',
  secondary: 'secondary-circle-button',
}

const CircleButton = ({ className, icon, children, variant, onClick, disabled, ...props }) => (
  <button className={`${className} ${VARIANTS_CLASSES[variant]}`} onClick={onClick} disabled={disabled} {...props}>
    {icon}
    {children}
  </button>
)

CircleButton.propTypes = {
  icon: PropTypes.element,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

CircleButton.defaultProps = {
  variant: 'primary',
}

export { CircleButton }
