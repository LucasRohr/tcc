import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { noopFunction } from 'app-helpers'
import { useInputCheckbox } from 'app-hooks'
import { Text } from '../text/text.component'

import './checkbox-item.style.scss'

const CheckboxItem = ({ icon: Icon, title, initialIsChecked, item, onChange, index }) => {
  const onCheck = () => {
    onChange(item, checkbox.isChecked)
  }

  const renderLabel = () => (
    <div className="checkbox-item-label-container">
      <Text>{title}</Text>
      <Icon className="checkbox-item-icon" />
    </div>
  )

  const checkbox = useInputCheckbox({
    id: `checkbox_item_${index + 1}`,
    name: `checkbox_item_${index + 1}`,
    additionalClass: 'checkbox-item-checkbox',
    label: renderLabel(),
    defaultValue: initialIsChecked,
    required: false,
  })

  useEffect(() => {
    onCheck(checkbox.isChecked)
  }, [checkbox.isChecked])

  return checkbox.getInputCheckboxComponent()
}

CheckboxItem.defaultProps = {
  onChange: noopFunction,
  initialIsChecked: false,
}

CheckboxItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  item: PropTypes.object.isRequired,
  initialIsChecked: PropTypes.bool,
  onChange: PropTypes.string,
  index: PropTypes.number,
}

export { CheckboxItem }
