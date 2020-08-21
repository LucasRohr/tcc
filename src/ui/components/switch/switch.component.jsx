import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from '../text/text.component'

import './switch.style.scss'

const Switch = ({ firstOption, secondOption, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(firstOption)

  const getOptionClass = option => (selectedOption.key === option ? 'switch-selected-option' : 'switch-option')

  const changeOption = option => {
    setSelectedOption(option)
    onChange(option)
  }

  return (
    <div className="switch-container">
      <div onClick={() => changeOption(firstOption)} className={getOptionClass(firstOption.key)}>
        <Text>{firstOption.label}</Text>
      </div>

      <div onClick={() => changeOption(secondOption)} className={getOptionClass(secondOption.key)}>
        <Text>{secondOption.label}</Text>
      </div>
    </div>
  )
}

Switch.propTypes = {
  firstOption: PropTypes.object,
  secondOption: PropTypes.object,
  onChange: PropTypes.func,
}

export { Switch }
