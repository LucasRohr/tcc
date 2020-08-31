import React from 'react'
import PropTypes from 'prop-types'

import './counter.style.scss'

const Counter = ({ valueLength, maxLength }) => (
  <div className="input-container">
    {valueLength}/{maxLength}
  </div>
)

Counter.propTypes = {
  valueLength: PropTypes.number.isRequired,
  maxLength: PropTypes.string.isRequired,
}

export { Counter }
