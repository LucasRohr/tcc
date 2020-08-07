import React from 'react'
import PropTypes from 'prop-types'

import './title.style.scss'

const VARIANTS_CLASSES = {
  'san-serif': 'san-serif-title',
  serif: 'serif-title',
}

const Title = ({ className, children, variant }) => {
  return <h1 className={`${VARIANTS_CLASSES[variant]} ${className}`} children={children} />
}

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.string,
}

export { Title }
