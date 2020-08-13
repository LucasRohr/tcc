import React from 'react'
import './private-page.style.scss'

const PrivatePage = ({ children }) => {
  return (
    <div id="privatePage" className="private-page">
      {children}
    </div>
  )
}

export { PrivatePage }
