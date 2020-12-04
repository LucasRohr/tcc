import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './tabs.style.scss'

const Tabs = ({ className, options, currentTab, setCurrentTab }) => {
  const handleTabChange = event => {
    setCurrentTab(event.target.value)
  }

  const renderOptions = () =>
    options.map(({ id, name, value, label }, key) => (
      <Fragment key={key}>
        <input
          className="tab-option-input"
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={currentTab === value}
          onChange={handleTabChange}
        />
        <label htmlFor={id} className="tab-option-label">
          {label}
        </label>
      </Fragment>
    ))

  return <div className={`tabs-container ${className}`}>{renderOptions()}</div>
}

Tabs.propTypes = {
  options: PropTypes.array.isRequired,
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
}

export { Tabs }
