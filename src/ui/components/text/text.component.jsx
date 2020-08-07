import React from 'react'
import PropTypes from 'prop-types'

import './text.style.scss'

const VARIANTS_CLASSES = {
  'san-serif': 'san-serif-text',
  serif: 'serif-text',
}

const Text = ({ className, children, variant }) => {
  return <span className={`${VARIANTS_CLASSES[variant]} ${className}`} children={children} />
}

Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.string,
}

export { Text }
