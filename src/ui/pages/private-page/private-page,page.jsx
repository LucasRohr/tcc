import React from 'react'
import './private-page.style.scss'

const PrivatePage = ({ children }) => {
  return (
    <div id="privatePage" className="privatePage" dataSelector="privatePage">
      {children}
    </div>
  )
}

export { PrivatePage }
