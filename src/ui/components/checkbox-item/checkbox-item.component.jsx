import React from 'react'
import PropTypes from 'prop-types'
import { noopFunction } from 'app-helpers'

import './checkbox-item.style.scss'

const CheckboxItem = ({ icon, title, item, onChange }) => {
  return <div>{title}</div>
}

CheckboxItem.defaultProps = {
  onChange: noopFunction,
}

CheckboxItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.string,
}

export { CheckboxItem }
