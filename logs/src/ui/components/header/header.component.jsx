import React from 'react'
import { LogoIcon } from 'app-icons'
import { Text } from '../text/text.component'

import './header.style.scss'

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-app-name-container">
        <LogoIcon className="header-logo-icon" />
        <Text variant="serif">Herança Digital | Logs</Text>
      </div>
    </div>
  )
}

export { Header }
