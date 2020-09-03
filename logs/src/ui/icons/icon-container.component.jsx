import React from 'react'
import './icon-container.style.scss'

const IconContainer = Icon => ({ className, ...props }) => {
  return <div className={className || 'default-icon'} children={Icon} {...props} />
}

export { IconContainer }
