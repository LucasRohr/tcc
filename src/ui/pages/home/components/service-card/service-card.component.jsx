import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'app-components'

import './service-card.style.scss'

const ServiceCard = ({ title, description, icon, onClick, disabled }) => {
  const cardContainerClassname = disabled ? 'service-card-container-disabled' : 'service-card-container'

  return (
    <div onClick={onClick} className={cardContainerClassname}>
      <Text variant="sans-serif">{title}</Text>

      <div className="service-card-content">
        <Text variant="serif">{description}</Text>
        <div className="service-card-icon-container">{icon}</div>
      </div>
    </div>
  )
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export { ServiceCard }
