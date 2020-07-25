import React from 'react'
import PropTypes from 'prop-types'
import './container.style.scss'

const Container = ({ children }) => {
  return <div className="container">{children}</div>
}

Container.propTypes = {
  children: PropTypes.any.isRequired,
}

export { Container }
